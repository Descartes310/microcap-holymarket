import { connect } from 'react-redux';
import React, { Component } from 'react';
import UnitService from 'Services/units';
import { dateDiff } from 'Helpers/helpers';
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
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';
import { initDealMethods, getTimeUnits, getFundingOfferInterventionTypes } from 'Helpers/datas';
import { isNull } from 'util';

class InitSpotModal extends Component {

    state = {
        deal: null,
        amount: null,
        label: null,
        codevs: [],
        line: null,
        offer: null,
        codev: null,
        tickets: [],
        currencies: [],
        currency: null,
        selectedTickets: [],
        periodicity: null,
        unitAmount: null,
        prime: null,
        rate: null,
        totalAmount: null,
        endSubscriptionDate: null,
        placementDate: null,
        firstPaymentDate: null,
        initMethod: null,
        periodNumber: null,
        amountByPeriod: null,
        managementRate: null,
        numberOfManagementPart: null,
        rentByPeriod: null,
        partBenefit: null,
        amortizations: [],


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
        } else {
            this.getUnits();
        }

        // this.getProjects();
    }

    getProjects = () => {
        this.props.setRequestGlobalAction(true);
        ProjectService.getProjects().then(response => {
            this.setState({ projects: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    computePeriod = () => {
        if(this.state.periodStartDate && this.state.periodEndDate && this.state.periodicity) {
            this.setState({ length: dateDiff(this.state.periodStartDate, this.state.periodEndDate, this.state.periodicity.days) })
        }
    }

    getUnits = () => {
        this.props.setRequestGlobalAction(true);
        UnitService.getUnits()
        .then((response) => this.setState({ currencies: response, currency: this.state.deal ? response.find(c => c.code == this.state.deal?.currency) : null }))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
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
                amount: response?.amount,
                senderName: response?.sender,
                label: response?.offer?.label,
                receiverName: response?.receiver,
                selectedTickets: response?.tickets,
                interventionType: getFundingOfferInterventionTypes().find(init => init.value == response.intervention),
                compensations: response?.counterParts?.filter(c => c.fixPart).map(cp => { return {...cp, length: cp.duration }}),
                natureCompensations: response?.counterParts?.filter(c => !c.fixPart).map(cp => { return {...cp, length: cp.duration }}),
                initMethod: response?.intervention == 'CPT' ? initDealMethods().find(init => init.value == 'PERIOD') : initDealMethods().find(init => init.value == 'TICKETS')
            }, () => this.getUnits());
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    addNewAmortizations = () => {
        const {managementRate, numberOfManagementPart, rentByPeriod, partBenefit, periodicity, periodNumber, amountByPeriod} = this.state;

        if(!managementRate || !numberOfManagementPart || !rentByPeriod || !partBenefit || !periodicity || !periodNumber || !amountByPeriod) {
            NotificationManager.error("Remplissez toutes les informations");
            return;
        }

        let amortization = {
            managementRate,
            numberOfManagementPart,
            rentByPeriod,
            partBenefit,
            periodNumber,
            amountByPeriod,
            periodicity: periodicity.value
        }

        this.setState({
            managementRate: '',
            numberOfManagementPart: '',
            rentByPeriod: '',
            partBenefit: '',
            periodNumber: '',
            amountByPeriod: '',
            periodicity: null,
            amortizations: [amortization, ...this.state.amortizations],
        });
    }

    deleteAmortization = (item) => {
        this.setState({ amortizations: this.state.amortizations.filter(c => c != item) });
    }

    onSubmit = () => {

        const {amount, currency, initMethod, amortizations, selectedTickets, unitAmount, prime, rate, totalAmount, endSubscriptionDate,
            placementDate, firstPaymentDate
        } = this.state;

        if(!amount || !currency || (amortizations.length <= 0) || !unitAmount || !prime || !rate || !totalAmount || !endSubscriptionDate || !placementDate || !firstPaymentDate) {
            NotificationManager.error("Remplissez toutes les informations 1");
            return;
        }

        let datas = {currency: currency.code, amount, unitAmount, prime, rate, totalAmount, endSubscriptionDate, placementDate, firstPaymentDate};

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

        if(this.state.label) {
            datas.label = this.state.label;
        }

        if(this.props.notification) {
            datas.notification_id = this.props.notification;
        }

        if(amortizations.length > 0) {
            datas.amortizations = JSON.stringify(amortizations);
        }

        if(this.props.deal) {
            datas.deal_reference = this.props.deal?.reference;
        }

        console.log(datas);

        // this.props.setRequestGlobalAction(true);
        // FundingService.createProposition(datas)
        // .then(response => {
        //     console.log(response);
        //     NotificationManager.success("La proposition a bien été enregistré");
        //     this.props.onClose();
        // })
        // .catch(err => {
        //     NotificationManager.error("Une erreur est survenue");
        // })
        // .finally(() => this.props.setRequestGlobalAction(false))

    }

    render() {

        const { onClose, show, deal, dealType } = this.props;
        const { initMethod, codevs, codev, tickets, selectedTickets, startDate, endDate, label, amount,
         periodicity, senderName, currency, line, receiverName, currencies,offer, amortizations, prime, unitAmount,
         rate, totalAmount, endSubscriptionDate, placementDate, firstPaymentDate, periodNumber, amountByPeriod,
         managementRate, numberOfManagementPart, rentByPeriod, partBenefit} = this.state;

        const natureOfferEnabled = (this.props.dealType == 'NDJANGUI' || deal?.type == 'NDJANGUI');

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Proposition de spot
                    </h3>
                )}
            >
                <RctCardContent>
                    <div>
                        <p>Objet: { natureOfferEnabled ? `Ndjangui ${line?.reference}` : `Offre de cautionnement ${offer?.reference}`}</p>
                        { senderName && (<p>Souscripteur: {senderName}</p> )}
                        <p>Beneficiaire: {receiverName}</p>

                        <FormGroup className="has-wrapper mr-20 mt-20" style={{ flex: 1 }}>
                            <InputLabel className="text-left">
                                Désignation de l'investissement
                            </InputLabel>
                            <InputStrap
                                type="texte"
                                id="label"
                                name='label'
                                value={label}
                                className="input-lg"
                                placeholder="Désignation de l'investissement"
                                onChange={(e) => this.setState({ label: e.target.value })}
                            />
                        </FormGroup>

                        <div className='row'>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Total de l'investissement
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="amount"
                                    name='amount'
                                    value={amount}
                                    className="input-lg"
                                    placeholder="Total de l'investissement"
                                    onChange={(e) => this.setState({ amount: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left">
                                    Devise
                                </InputLabel>
                                <Autocomplete
                                    value={currency}
                                    id="combo-box-demo"
                                    onChange={(__, item) => {
                                        this.setState({ currency: item });
                                    }}
                                    disabled={deal}
                                    getOptionLabel={(option) => option.label}
                                    options={currencies.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                        </div>

                        <div className='row'>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Valeur d'une part
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="unitAmount"
                                    name='unitAmount'
                                    value={unitAmount}
                                    className="input-lg"
                                    placeholder="Valeur d'une part"
                                    onChange={(e) => this.setState({ unitAmount: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Nombre de part total
                                </InputLabel>
                                <InputStrap
                                    value={0}
                                    type="number"
                                    disabled={true}
                                    className="input-lg"
                                    placeholder="Nombre de part total"
                                />
                            </FormGroup>
                        </div>

                        <div className='row'>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Rémunération prime de cession
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="prime"
                                    name='prime'
                                    value={prime}
                                    className="input-lg"
                                    placeholder="Rémunération prime de cession"
                                    onChange={(e) => this.setState({ prime: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Taux
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="rate"
                                    name='rate'
                                    value={rate}
                                    className="input-lg"
                                    placeholder="Taux"
                                    onChange={(e) => this.setState({ rate: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Total
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="totalAmount"
                                    name='totalAmount'
                                    value={totalAmount}
                                    className="input-lg"
                                    placeholder="Total"
                                    onChange={(e) => this.setState({ totalAmount: e.target.value })}
                                />
                            </FormGroup>
                        </div>

                        <div className='row'>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Date cloture des souscriptions
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    id="endSubscriptionDate"
                                    name='endSubscriptionDate'
                                    value={endSubscriptionDate}
                                    className="input-lg"
                                    placeholder="Date cloture des souscriptions"
                                    onChange={(e) => this.setState({ endSubscriptionDate: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Date du placement
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    id="placementDate"
                                    name='placementDate'
                                    value={placementDate}
                                    className="input-lg"
                                    placeholder="Date du placement"
                                    onChange={(e) => this.setState({ placementDate: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Date du premier loyer
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    id="firstPaymentDate"
                                    name='firstPaymentDate'
                                    value={firstPaymentDate}
                                    className="input-lg"
                                    placeholder="Date du premier loyer"
                                    onChange={(e) => this.setState({ firstPaymentDate: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        
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
                                        getOptionLabel={(option) => `Code: ${option.code}, Montant: ${option.amount} ${option.currency}, Date d'échéance: ${option.date}`}
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
                                        value={`${selectedTickets.reduce((amount, ticket) => amount + Number(ticket.amount), 0)} ${line?.tickets[0]?.currency}`}
                                    />
                                </FormGroup>
                            </div>
                        )}

                        <h2 className='mb-20'>Amortissements</h2>
                        <div className='row'>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Périodicité
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={periodicity}
                                    options={getTimeUnits()}
                                    onChange={(__, item) => {
                                        this.setState({ periodicity: item }, () => this.computePeriod());
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Nombre de période
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="periodNumber"
                                    name='periodNumber'
                                    value={periodNumber}
                                    className="input-lg"
                                    placeholder="Nombre de période"
                                    onChange={(e) => this.setState({ periodNumber: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Montant par période
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="amountByPeriod"
                                    name='amountByPeriod'
                                    value={amountByPeriod}
                                    className="input-lg"
                                    placeholder="Montant par période"
                                    onChange={(e) => this.setState({ amountByPeriod: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='row'>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Taux de gestion (TTC)
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="managementRate"
                                    name='managementRate'
                                    value={managementRate}
                                    className="input-lg"
                                    placeholder="Taux de gestion (TTC)"
                                    onChange={(e) => this.setState({ managementRate: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Nombre de part équivalent
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="numberOfManagementPart"
                                    name='numberOfManagementPart'
                                    value={numberOfManagementPart}
                                    className="input-lg"
                                    placeholder="Nombre de part équivalent"
                                    onChange={(e) => this.setState({ numberOfManagementPart: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Loyer par période
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="rentByPeriod"
                                    name='rentByPeriod'
                                    value={rentByPeriod}
                                    className="input-lg"
                                    placeholder="Loyer par période"
                                    onChange={(e) => this.setState({ rentByPeriod: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='row d-flex direction-column align-items-end'>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Total de rémunération d'une part
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="partBenefit"
                                    name='partBenefit'
                                    value={partBenefit}
                                    className="input-lg"
                                    placeholder="Total de rémunération d'une part"
                                    onChange={(e) => this.setState({ partBenefit: e.target.value })}
                                />
                            </FormGroup>
                            
                            <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.addNewAmortizations();
                                    }}
                                    className="text-white font-weight-bold w-100"
                                >
                                    Ajouter l'amortissement
                                </Button>
                            </FormGroup>
                        </div>

                        { amortizations.length > 0 && (
                            <CustomList
                                loading={false}
                                list={amortizations}
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
                                                            <th className="fw-bold">Périodicité</th>
                                                            <th className="fw-bold">Nombre période</th>
                                                            <th className="fw-bold">Montant</th>
                                                            <th className="fw-bold">Taux gestion</th>
                                                            <th className="fw-bold">Nombre part</th>
                                                            <th className="fw-bold">Loyer</th>
                                                            <th className="fw-bold">Renumération part</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list && list.map((item, key) => (
                                                            <tr key={key} className="cursor-pointer">
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
                                                                            <h4 className="m-0 fw-bold text-dark">{item.periodNumber}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.amountByPeriod}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.managementRate} %</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.rentByPeriod}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media">
                                                                        <div className="media-body pt-10">
                                                                            <h4 className="m-0 fw-bold text-dark">{item.partBenefit}</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td onClick={() => this.deleteAmortization(item)}>
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(InitSpotModal));