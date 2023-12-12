import { connect } from 'react-redux';
import React, { Component } from 'react';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { initDealMethods, getTimeUnits } from 'Helpers/datas';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

class InitDealModal extends Component {

    state = {
        deal: null,
        line: null,
        codevs: [],
        offer: null,
        codev: null,
        tickets: [],
        endDate: null,
        startDate: null,
        initMethod: null,
        selectedTickets: [],
        periodStartDate: null,
        periodEndDate: null,
        periodicity: null,
        length: null,
        fixPart: null,
        variablePart: null,
        compensations: [],

        naturePeriodStartDate: null,
        naturePeriodEndDate: null,
        naturePeriodicity: null,
        natureLength: null,
        source: null,
        offer: null,
        product: null,
        unit: null,
        natureCompensations: [],

        projects: [],
        products: [],

        senderName: '',
        receiverName: ''
    }

    constructor(props) {
        super(props);
        this.findMyCodevs();

        if((this.props.dealType == 'NDJANGUI' && this.props.lineReference) || this.props.deal?.type == 'NDJANGUI') {
            this.findLine();
        } else {
            if(this.props.reference) {
                this.findOffer();
            }
        }

        if(this.props.deal) {
            this.findDeal();
        }

        this.getProjects();
    }

    getProjects = () => {
        this.props.setRequestGlobalAction(true);
        ProjectService.getProjects().then(response => {
            this.setState({ projects: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getProducts = () => {
        this.props.setRequestGlobalAction(true);
        ProjectService.getProducts({ project_reference: this.state.source.reference }).then(response => {
            this.setState({ products: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findMyCodevs = () => {
        this.props.setRequestGlobalAction(false);
        ProductService.findMyCodevs()
        .then((response) => {
            this.setState({ codevs: response });
        })
        .catch((err) => {
            NotificationManager.error("Le numéro du ticket est innexistant");
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    findTickets = () => {
        
        if(!this.state.codev) {
            this.setState({ tickets: [], selectedTickets: [] })
            return;
        }

        this.props.setRequestGlobalAction(false);
        ProductService.findTicketsFromProduct({ product_reference: this.state.codev?.reference })
        .then((response) => {
            this.setState({ tickets: response, selectedTickets: [] });
        })
        .catch((err) => {
            NotificationManager.error("Le numéro du ticket est innexistant");
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    findOffer = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.findFundingOffer(this.props.reference)
        .then(response => {
            this.setState({
                offer: response, 
                initMethod: response?.intervention == 'CPT' ? initDealMethods().find(init => init.value == 'PERIOD') : initDealMethods().find(init => init.value == 'TICKETS'),
                senderName: response?.sender,
                receiverName: response?.receiver
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findLine = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getLineGlobalInfo({line_reference: this.props.lineReference ? this.props.lineReference : this.props.deal?.entityReference, withTickets: true})
        .then(response => {
            this.setState({
                line: response
            });
            if(!this.props.deal) {
                this.setState({
                    senderName: this.props.subscriber?.userName,
                    receiverName: this.props.authUser?.userName
                });
            }
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findDeal = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.findDeal(this.props.deal?.reference)
        .then(response => {
            this.setState({
                deal: response, 
                offer: response?.offer,
                senderName: response?.sender,
                receiverName: response?.receiver,
                selectedTickets: response?.tickets,
                compensations: response?.counterParts?.filter(c => c.fixPart).map(cp => { return {...cp, length: cp.duration }}),
                natureCompensations: response?.counterParts?.filter(c => !c.fixPart).map(cp => { return {...cp, length: cp.duration }}),
                initMethod: response?.offer?.intervention == 'CPT' ? initDealMethods().find(init => init.value == 'PERIOD') : initDealMethods().find(init => init.value == 'TICKETS')
            });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    addNewCompensations = () => {
        const {periodStartDate, periodEndDate, periodicity, length, fixPart, variablePart} = this.state;

        if(!periodStartDate || !periodEndDate || !periodicity || !length || !fixPart || !variablePart) {
            NotificationManager.error("Remplissez toutes les informations");
            return;
        }

        let compensation = {
            length,
            fixPart,
            variablePart,
            endDate: periodEndDate,
            startDate: periodStartDate,
            periodicity: periodicity.value
        }

        this.setState({ 
            length: null,
            fixPart: null,
            periodicity: null,
            variablePart: null,
            periodEndDate: null,
            periodStartDate: null,
            compensations: [compensation, ...this.state.compensations],
        });
    }

    deleteCompensation = (item) => {
        this.setState({ compensations: this.state.compensations.filter(c => c != item) });
    }

    addNewNatureCompensations = () => {
        const {naturePeriodStartDate, naturePeriodEndDate, naturePeriodicity, natureLength, source, product, offer, unit} = this.state;

        if(!naturePeriodStartDate || !naturePeriodEndDate || !naturePeriodicity || !natureLength || !offer || !source || !product || !unit) {
            NotificationManager.error("Remplissez toutes les informations");
            return;
        }

        let compensation = {
            unit,
            offer,
            source: source,
            product: product,
            length: natureLength,
            endDate: naturePeriodEndDate,
            startDate: naturePeriodStartDate,
            periodicity: naturePeriodicity.value
        }

        this.setState({ 
            unit: null,
            offer: null,
            source: null,
            product: null,
            natureLength: null,
            naturePeriodicity: null,
            naturePeriodEndDate: null,
            naturePeriodStartDate: null,
            natureCompensations: [compensation, ...this.state.natureCompensations],
        });
    }

    deleteNatureCompensation = (item) => {
        this.setState({ natureCompensations: this.state.natureCompensations.filter(c => c != item) });
    }

    onSubmit = () => {

        const {initMethod, compensations, natureCompensations, selectedTickets, startDate, endDate} = this.state;

        if(compensations.length <= 0 && natureCompensations.length <= 0) {
            NotificationManager.error("Remplissez toutes les informations 1");
            return;
        }

        let datas = {};

        if(this.state.offer) {
            datas.offer_reference = this.state.offer.reference;
        } else {
            if(this.state.line) {
                datas.line_reference = this.state.line.reference;
                if(this.props.subscriber) {
                    datas.subscriber_reference = this.props.subscriber?.referralCode;
                }
                datas.init_method = 'TICKETS';
            } else {
                NotificationManager.error("Remplissez toutes les informations 1.5");
                return;
            }
        }

        if(!this.props.deal && this.props.dealType !== 'NDJANGUI') {
            if(selectedTickets.length <= 0 && (!startDate && !endDate)) {
                NotificationManager.error("Remplissez toutes les informations 2");
                return;
            }
            datas.init_method = initMethod?.value;
            if(initMethod?.value == 'TICKETS') {
                datas.tickets = selectedTickets.map(t => t.reference);
            } else {
                datas.end_date = endDate;
                datas.start_date = startDate;
            }
        }

        if(this.state.line && selectedTickets.length > 0) {
            datas.tickets = selectedTickets.map(t => t.reference);
            datas.init_method = 'TICKETS';
        }

        if(this.props.notification) {
            datas.notification_id = this.props.notification;
        }

        if(compensations.length > 0) {
            datas.compensations = JSON.stringify(compensations);
        }

        if(this.props.deal) {
            datas.deal_reference = this.props.deal?.reference;
        }

        if(natureCompensations.length > 0) {
            datas.nature_compensations = JSON.stringify(natureCompensations.map(c => { return {...c, source: c.source.reference, product: c.product.reference } }));
        }

        console.log(datas);

        this.props.setRequestGlobalAction(true);
        FundingService.createProposition(datas)
        .then(response => {
            console.log(response);
            NotificationManager.success("La proposition a bien été enregistré");
            this.props.onClose();
        })
        .catch(err => {
            NotificationManager.error("Une erreure est survenue");
        })
        .finally(() => this.props.setRequestGlobalAction(false))

    }

    render() {

        const { onClose, show, deal, dealType } = this.props;
        const { initMethod, codevs, codev, tickets, selectedTickets, startDate, endDate,
        periodStartDate, periodEndDate, periodicity, length, fixPart, variablePart, senderName,
        naturePeriodStartDate, naturePeriodEndDate, naturePeriodicity, natureLength, line, receiverName,
        source, offer, product, unit, compensations, natureCompensations, projects, products } = this.state;

        const natureOfferEnabled = (this.props.dealType == 'NDJANGUI' || deal?.type == 'NDJANGUI');

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Proposition de deal
                    </h3>
                )}
            >
                <RctCardContent>
                    <div>
                        <p>Objet: { natureOfferEnabled ? `Ndjangui ${line?.reference}` : `Offre de cautionnement ${offer?.reference}`}</p>
                        <p>Souscripteur: {senderName}</p>
                        <p>Beneficiaire: {receiverName}</p>
                        {!deal && dealType !== 'NDJANGUI' && (
                            <>
                                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Methode de reglement
                                    </InputLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        value={initMethod}
                                        options={initDealMethods()}
                                        onChange={(__, item) => {
                                            this.setState({ initMethod: item });
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                                { initMethod?.value == 'TICKETS' && (
                                    <div>
                                        <div className="col-md-12 col-sm-12 mb-30 d-flex">
                                            <div className="col-md-6 col-sm-12">
                                                <InputLabel className="text-left">
                                                    Mes codevs
                                                </InputLabel>
                                                <Autocomplete
                                                    value={codev}
                                                    options={codevs}
                                                    id="combo-box-demo"
                                                    onChange={(__, item) => {
                                                        this.setState({ codev: item }, () => {
                                                            this.findTickets();
                                                        });
                                                    }}
                                                    getOptionLabel={(option) => option.label}
                                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                />
                                            </div>

                                            <div className="col-md-6 col-sm-12">
                                                <InputLabel className="text-left">
                                                    Mes tickets
                                                </InputLabel>
                                                <Autocomplete
                                                    multiple
                                                    options={tickets}
                                                    id="combo-box-demo"
                                                    value={selectedTickets}
                                                    onChange={(__, items) => {
                                                        this.setState({ selectedTickets: items });
                                                    }}
                                                    getOptionLabel={(option) => `Code: ${option.code}, Montant: ${getPriceWithCurrency(option.amount, option.currency)}, Date d'échéance: ${option.dueDate}`}
                                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                />
                                            </div>
                                        </div>
                                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mr-20">
                                            <InputLabel className="text-left">
                                                Montant
                                            </InputLabel>
                                            <InputStrap
                                                type="text"
                                                disabled={true}
                                                className="input-lg"
                                                value={getPriceWithCurrency(selectedTickets.reduce((amount, ticket) => amount + Number(ticket.amount), 0), selectedTickets[0]?.currency)}
                                            />
                                        </FormGroup>
                                    </div>
                                )}
                                
                                { initMethod?.value == 'PERIOD' && (
                                    <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                                        <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                            <InputLabel className="text-left">
                                                Du
                                            </InputLabel>
                                            <InputStrap
                                                type="date"
                                                id="startDate"
                                                name='startDate'
                                                value={startDate}
                                                className="input-lg"
                                                placeholder="Date de début"
                                                onChange={(e) => this.setState({ startDate: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                            <InputLabel className="text-left">
                                                Au
                                            </InputLabel>
                                            <InputStrap
                                                type="date"
                                                id="endDate"
                                                name='endDate'
                                                value={endDate}
                                                className="input-lg"
                                                placeholder="Date de fin"
                                                onChange={(e) => this.setState({ endDate: e.target.value })}
                                            />
                                        </FormGroup>
                                    </div>
                                )}
                            </>
                        )}
                        { line?.tickets.length > 0 && deal && (
                            <div>
                                <div className="col-md-12 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left">
                                        Tickets
                                    </InputLabel>
                                    <Autocomplete
                                        multiple
                                        options={line?.tickets}
                                        id="combo-box-demo"
                                        value={selectedTickets}
                                        onChange={(__, items) => {
                                            this.setState({ selectedTickets: items });
                                        }}
                                        getOptionLabel={(option) => `Code: ${option.code}, Montant: ${getPriceWithCurrency(option.amount, option.currency)}, Date d'échéance: ${option.date}`}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                                <FormGroup className="col-md-12 col-sm-12 has-wrapper mr-20 mt-20">
                                    <InputLabel className="text-left">
                                        Montant
                                    </InputLabel>
                                    <InputStrap
                                        type="text"
                                        disabled={true}
                                        className="input-lg"
                                        value={getPriceWithCurrency(selectedTickets.reduce((amount, ticket) => amount + Number(ticket.amount), 0), selectedTickets[0]?.currency)}
                                    />
                                </FormGroup>
                            </div>
                        )}
                        <h2 className='mb-20'>Contrepartie en numeraire</h2>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Date début période
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    id="periodStartDate"
                                    className="input-lg"
                                    name='periodStartDate'
                                    value={periodStartDate}
                                    placeholder="Date de début"
                                    onChange={(e) => this.setState({ periodStartDate: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Date fin période
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    id="periodEndDate"
                                    name='periodEndDate'
                                    value={periodEndDate}
                                    className="input-lg"
                                    placeholder="Date de fin"
                                    onChange={(e) => this.setState({ periodEndDate: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Périodicité
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={periodicity}
                                    options={getTimeUnits()}
                                    onChange={(__, item) => {
                                        this.setState({ periodicity: item });
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Durée
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="length"
                                    name='length'
                                    value={length}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ length: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='d-flex direction-column align-items-end' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Part fixe
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="fixPart"
                                    name='fixPart'
                                    value={fixPart}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ fixPart: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Taux part variable
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="variablePart"
                                    name='variablePart'
                                    value={variablePart}
                                    className="input-lg"
                                    onChange={(e) => this.setState({ variablePart: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.addNewCompensations();
                                    }}
                                    className="text-white font-weight-bold w-100"
                                >
                                    Ajouter
                                </Button>
                            </FormGroup>
                        </div>

                        { compensations.length > 0 && (
                            <CustomList
                                loading={false}
                                list={compensations}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucune compensation trouvée
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="fw-bold">Début</th>
                                                            <th className="fw-bold">Fin</th>
                                                            <th className="fw-bold">Périodicité</th>
                                                            <th className="fw-bold">Durée</th>
                                                            <th className="fw-bold">Fix</th>
                                                            <th className="fw-bold">Taux variable</th>
                                                            <th className="fw-bold">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.startDate}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.endDate}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{getTimeUnits().find(t => t.value == item.periodicity).label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.length}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.fixPart}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.variablePart}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td onClick={() => this.deleteCompensation(item)}>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold" style={{ color: 'red' }}>Rétirer</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        )}

                        <h2 className='mb-20'>Contrepartie en nature</h2>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Date début période
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    className="input-lg"
                                    id="naturePeriodStartDate"
                                    name='naturePeriodStartDate'
                                    value={naturePeriodStartDate}
                                    disabled={natureOfferEnabled}
                                    onChange={(e) => this.setState({ naturePeriodStartDate: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Date fin période
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    className="input-lg"
                                    id="naturePeriodEndDate"
                                    name='naturePeriodEndDate'
                                    value={naturePeriodEndDate}
                                    disabled={natureOfferEnabled}
                                    onChange={(e) => this.setState({ naturePeriodEndDate: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Périodicité
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={naturePeriodicity}
                                    options={getTimeUnits()}
                                    disabled={natureOfferEnabled}
                                    onChange={(__, item) => {
                                        this.setState({ naturePeriodicity: item });
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Durée
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="natureLength"
                                    name='natureLength'
                                    value={natureLength}
                                    className="input-lg"
                                    disabled={natureOfferEnabled}
                                    onChange={(e) => this.setState({ natureLength: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Source
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={source}
                                    options={projects}
                                    disabled={natureOfferEnabled}
                                    onChange={(__, item) => {
                                        this.setState({ source: item }, () => {
                                            if(item) {
                                                this.getProducts();
                                            } else {
                                                this.setState({ products: [], product: null })
                                            }
                                        });
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Offre
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="offer"
                                    name='offer'
                                    value={offer}
                                    className="input-lg"
                                    disabled={natureOfferEnabled}
                                    onChange={(e) => this.setState({ offer: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='d-flex direction-column  align-items-end' style={{ flex: 1 }}>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Produit
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={product}
                                    options={products}
                                    disabled={natureOfferEnabled}
                                    onChange={(__, item) => {
                                        this.setState({ product: item, unit: item?.currency });
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <InputLabel className="text-left">
                                    Unité
                                </InputLabel>
                                <InputStrap
                                    id="unit"
                                    name='unit'
                                    type="text"
                                    value={unit}
                                    disabled={true}
                                    className="input-lg"
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={natureOfferEnabled}
                                    onClick={() => {
                                        this.addNewNatureCompensations();
                                    }}
                                    className="text-white font-weight-bold w-100"
                                >
                                    Ajouter
                                </Button>
                            </FormGroup>
                        </div>
                        { (natureCompensations.length > 0 && !natureOfferEnabled) && (
                            <CustomList
                                loading={false}
                                list={natureCompensations}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucune compensation trouvée
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="fw-bold">Début</th>
                                                            <th className="fw-bold">Fin</th>
                                                            <th className="fw-bold">Périodicité</th>
                                                            <th className="fw-bold">Durée</th>
                                                            <th className="fw-bold">source</th>
                                                            <th className="fw-bold">Offre</th>
                                                            <th className="fw-bold">Produit</th>
                                                            <th className="fw-bold">Unité</th>
                                                            <th className="fw-bold">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.startDate}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.endDate}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{getTimeUnits().find(t => t.value == item.periodicity).label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.length}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.source?.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.offer}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.product?.label}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.unit}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td onClick={() => this.deleteNatureCompensation(item)}>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold" style={{ color: 'red' }}>Rétirer</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        )}
                        <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    this.onSubmit();
                                }}
                                className="text-white font-weight-bold w-100"
                            >
                                Enregistrer
                            </Button>
                        </FormGroup>
                    </div>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(InitDealModal));