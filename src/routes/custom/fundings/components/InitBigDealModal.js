import { connect } from 'react-redux';
import UnitService from 'Services/units';
import React, { Component } from 'react';
import { dateDiff } from 'Helpers/helpers';
import { getTimeUnits } from 'Helpers/datas';
import FundingService from 'Services/funding';
import AccounService from 'Services/accounts';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

class InitBigDealModal extends Component {

    state = {
        deal: null,
        amount: null,
        programs: [],
        accounts: [],
        currencies: [],
        currency: null,
        program: null,
        account: null,
        label: '',
        periodStartDate: null,
        periodEndDate: null,
        periodicity: null,
        length: null,
        fixPart: null,
        variablePart: null,
        compensations: [],

        projects: [],

        senderName: '',
        receiverName: ''
    }

    constructor(props) {
        super(props);
        if(this.props.deal) {
            this.findDeal();
        } else {
            this.getUnits();
            this.getPrograms();
            this.getAccounts();
        }
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

    getPrograms = () => {
        this.props.setRequestGlobalAction(true),
        FundingService.getFundingPrograms()
        .then(response => this.setState({ programs: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getAccounts = () => {
        this.props.setRequestGlobalAction(true),
        AccounService.getBigDealAccounts()
        .then(response => this.setState({ accounts: response }))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findDeal = () => {
        this.props.setRequestGlobalAction(true);
        FundingService.findDeal(this.props.deal?.reference)
        .then(response => {
            this.setState({
                deal: response,
                label: response?.label,
                amount: response?.amount,
                senderName: response?.sender,
                receiverName: response?.receiver,
                compensations: response?.counterParts?.filter(c => c.fixPart).map(cp => { return {...cp, length: cp.duration }})
            }, () => this.getUnits());
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
            fixPart: '',
            variablePart: '',
            compensations: [compensation, ...this.state.compensations],
        });
    }

    deleteCompensation = (item) => {
        this.setState({ compensations: this.state.compensations.filter(c => c != item) });
    }

    onSubmit = () => {

        const {compensations, program, account, amount, currency} = this.state;

        if(!this.props.deal) {
            if(!program || !account || compensations.length <= 0) {
                NotificationManager.error("Remplissez toutes les informations ");
                return;
            }
        } else {
            if(!amount) {
                NotificationManager.error("Remplissez toutes les informations ");
                return;
            }
        }

        let datas = {type: 'BIGDEAL'};

        if(this.state.label) {
            datas.label = this.state.label;
        }

        if(program) {
            datas.program_reference = program.reference;
            datas.amount = program.amount;
            datas.currency = program.currency;
        } else {
            datas.amount = amount;
            datas.currency = currency.code
        }

        if(account) {
            datas.account_reference = account.reference;
        }

        if(compensations.length > 0) {
            datas.compensations = JSON.stringify(compensations);
        }

        if(this.props.deal) {
            datas.deal_reference = this.props.deal?.reference;
        }

        this.props.setRequestGlobalAction(true);
        FundingService.createProposition(datas)
        .then(response => {
            console.log(response);
            NotificationManager.success("La proposition a bien été enregistré");
            this.props.onClose();
        })
        .catch(err => {
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => this.props.setRequestGlobalAction(false))

    }

    render() {

        const { onClose, show, deal } = this.props;
        const { label, amount, periodStartDate, periodEndDate, periodicity, length, fixPart, variablePart, senderName, currency,
            program, programs, receiverName, currencies, compensations, account, accounts } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Proposition de deal
                    </h3>
                )}
            >
                <RctCardContent>
                    <div>
                        <p>Objet: { `Proposition de big deal`}</p>
                        { senderName && (<p>Souscripteur: {senderName}</p> )}
                        <p>Beneficiaire: {receiverName}</p>

                        <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                            <InputLabel className="text-left">
                                Désignation
                            </InputLabel>
                            <InputStrap
                                type="texte"
                                id="label"
                                name='label'
                                value={label}
                                className="input-lg"
                                placeholder="Désignation"
                                disabled={deal}
                                onChange={(e) => this.setState({ label: e.target.value })}
                            />
                        </FormGroup>

                        { deal ?
                            <div className='row'>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        {deal ? 'Montant proposé' : 'Montant sollicité'}
                                    </InputLabel>
                                    <InputStrap
                                        type="number"
                                        id="amount"
                                        name='amount'
                                        value={amount}
                                        className="input-lg"
                                        placeholder={deal ? 'Montant proposé' : 'Montant sollicité'}
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
                            </div> : (
                            <>
                                <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                    <InputLabel className="text-left">
                                        Compte Ndjangui Big deals
                                    </InputLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        value={account}
                                        options={accounts}
                                        onChange={(__, item) => {
                                            this.setState({ account: item });
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </FormGroup>   
                                <FormGroup className="has-wrapper mr-20" style={{ flex: 1 }}>
                                    <InputLabel className="text-left">
                                        Programmes
                                    </InputLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        value={program}
                                        options={programs}
                                        onChange={(__, item) => {
                                            this.setState({ program: item });
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </FormGroup>
                            </>
                        )}
                        
                        { !deal && (
                            <>
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
                                            onChange={(e) => this.setState({ periodStartDate: e.target.value }, () => this.computePeriod())}
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
                                            onChange={(e) => this.setState({ periodEndDate: e.target.value }, () => this.computePeriod())}
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
                                                this.setState({ periodicity: item }, () => this.computePeriod());
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
                                            disabled={true}
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
                                            Taux part variable (%)
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
                            </>
                        )}

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
                                                            <th className="fw-bold">Part Fixe</th>
                                                            <th className="fw-bold">Taux variable</th>
                                                            { !deal && (
                                                                <th className="fw-bold">Action</th>
                                                            )}
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
                                                                            <h4 className="m-0 fw-bold text-dark">{item.variablePart} %</h4>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                { !deal && (
                                                                    <td onClick={() => this.deleteCompensation(item)}>
                                                                        <div className="media">
                                                                            <div className="media-body pt-10">
                                                                                <h4 className="m-0 fw-bold" style={{ color: 'red' }}>Rétirer</h4>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                )}
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

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(InitBigDealModal));