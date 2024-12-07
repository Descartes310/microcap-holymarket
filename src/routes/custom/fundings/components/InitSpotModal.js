import { connect } from 'react-redux';
import React, { Component } from 'react';
import UnitService from 'Services/units';
import { getTimeUnits } from 'Helpers/datas';
import FundingService from 'Services/funding';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import { NDJANGUI_BUSINESS_NOMINAL_AMOUNT } from 'Helpers/datas';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

class InitSpotModal extends Component {

    state = {
        deal: null,
        amount: null,
        line: null,
        offer: null,
        label: null,
        codev: null,
        currencies: [],
        currency: null,
        initMethod: null,
        investment: null,
        periodicity: null,
        endSubscriptionDate: null,
        rate: null,
        rent: null,
        numberOfPart: null,
        managementRate: null,
        managementAmount: null,
        periodicityLength: null,
        benefitByPeriod: null,
        paymentStartDate: null,
        prime: null,

        senderName: '',
        receiverName: ''
    }

    constructor(props) {
        super(props);

        if(this.props.deal) {
            this.findDeal();
        } else {
            this.getUnits();
        }
        this.findLine()
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

    findLine = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getLineGlobalInfo({account_reference: this.props.accountReference ?? this.props.deal.entityReference, withTickets: false})
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
                label: response?.label,
                receiverName: response?.receiver,
                investment: response?.projectInvestment,
                rate: response?.lastProposition?.rate,
                rent: response?.lastProposition?.rent,
                endSubscriptionDate: response?.lastProposition?.endSubscriptionDate,
                periodicity: getTimeUnits().find(p => p.value == response?.lastProposition?.periodicity),
                periodicityLength: response?.lastProposition?.periodicityLength,
                numberOfPart: response?.lastProposition?.numberOfPart,
                managementRate: response?.lastProposition?.numberOfPart,
                managementAmount: response?.lastProposition?.managementAmount,
                paymentStartDate: response?.lastProposition?.paymentStartDate,
                benefitByPeriod: response?.lastProposition?.benefitByPeriod,
                prime: response?.lastProposition?.prime,

            }, () => this.getUnits());
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onSubmit = () => {

        const {label, amount, currency, endSubscriptionDate, rate, rent, periodicity, periodicityLength,
            numberOfPart, managementAmount, managementRate, benefitByPeriod, paymentStartDate, prime
        } = this.state;

        if(!label || !amount || !currency || !endSubscriptionDate || !rate || !rent || !periodicity || !periodicityLength || !numberOfPart
            || !managementAmount || !managementRate || !benefitByPeriod || !paymentStartDate || !prime
        ) {
            NotificationManager.error("Remplissez toutes les informations 1");
            return;
        }

        let datas = {label, currency: currency.code, amount, endSubscriptionDate, rate, rent, periodicity: periodicity.value,
            periodicityLength, numberOfPart, managementAmount, managementRate, benefitByPeriod, paymentStartDate, prime, type: 'SPOT'
        };

        if(!this.props.deal) {
            if(this.state.offer) {
                datas.offer_reference = this.state.offer.reference;
            } else {
                if(this.props.accountReference) {
                    datas.account_reference = this.props.accountReference;
                    if(this.props.subscriber) {
                        datas.subscriber_reference = this.props.subscriber?.referralCode;
                    }
                    datas.init_method = 'TICKETS';
                } else {
                    NotificationManager.error("Remplissez toutes les informations 1.5");
                    return;
                }
            }
        }

        if(this.props.notification) {
            datas.notification_id = this.props.notification;
        }

        if(this.props.deal) {
            datas.deal_reference = this.props.deal?.reference;
        }

        this.props.setRequestGlobalAction(true);
        FundingService.createProposition(datas)
        .then(() => {
            NotificationManager.success("La proposition a bien été enregistré");
            this.props.onClose();
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        })
        .finally(() => this.props.setRequestGlobalAction(false))

    }

    render() {

        const { onClose, show, deal } = this.props;
        const { rate, rent, periodicityLength, numberOfPart, label, amount,
            managementRate, managementAmount, periodicity, paymentStartDate, prime, senderName, currency,
        line, receiverName, currencies, benefitByPeriod, investment, investments, endSubscriptionDate } = this.state;

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
                        <p>Objet: { natureOfferEnabled ? `Ndjangui spots` : `Offre de cautionnement`}</p>
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
                                onChange={(e) => this.setState({ label: e.target.value })}
                            />
                        </FormGroup>

                        <div className='row'>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputLabel className="text-left">
                                    Placement
                                </InputLabel>
                                <InputStrap
                                    type="text"
                                    disabled={true}
                                    id="investment"
                                    name='investment'
                                    className="input-lg"
                                    placeholder="Placement"
                                    value={investment ? investment.label : line?.investment ? line?.investment?.label : 'Non défini'}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputLabel className="text-left">
                                    Montant total
                                </InputLabel>
                                <InputStrap
                                    type="text"
                                    disabled={true}
                                    id="investment"
                                    name='investment'
                                    className="input-lg"
                                    placeholder="Placement"
                                    value={investment ? getPriceWithCurrency(investment.totalCost, investment.currency) : line?.investment ? getPriceWithCurrency(line?.investment?.totalCost, line?.investment?.currency) : 'Non défini'}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputLabel className="text-left">
                                    Nombre de Ndjangui du multi-spot
                                </InputLabel>
                                <InputStrap
                                    type="text"
                                    disabled={true}
                                    className="input-lg"
                                    id="ndjanguiCount"
                                    name='ndjanguiCount'
                                    placeholder="Nombre de Ndjangui"
                                    value={line ? line?.line+'/'+(Math.ceil(line?.investment.totalCost/NDJANGUI_BUSINESS_NOMINAL_AMOUNT)) : 'Non défini'}
                                />
                            </FormGroup>
                        </div>

                        <div className='row'>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left">
                                    Montant de spot disponible
                                </InputLabel>
                                <InputStrap
                                    type="text"
                                    disabled={true}
                                    className="input-lg"
                                    id="emittedAmount"
                                    name='emittedAmount'
                                    placeholder="Montant de spot déjà émis"
                                    value={line ? getPriceWithCurrency(Math.max(line.amountTotal-line.amountEmitted, 0), line?.currency) : 'Non défini'}
                                />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left">
                                    Montant de spot déjà émis
                                </InputLabel>
                                <InputStrap
                                    type="text"
                                    disabled={true}
                                    className="input-lg"
                                    id="emittedAmount"
                                    name='emittedAmount'
                                    placeholder="Montant de spot déjà émis"
                                    value={line ? getPriceWithCurrency(line?.amountEmitted, line?.currency) : 'Non défini'}
                                />
                            </FormGroup>
                        </div>

                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Date de cloture des souscriptions
                            </InputLabel>
                            <InputStrap
                                type="date"
                                disabled={deal}
                                id="endSubscriptionDate"
                                name='endSubscriptionDate'
                                value={endSubscriptionDate}
                                className="input-lg"
                                placeholder="Montant du spot"
                                onChange={(e) => this.setState({ endSubscriptionDate: e.target.value })}
                            />
                        </FormGroup>

                        <div className='row'>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Montant du spot
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="amount"
                                    name='amount'
                                    value={amount}
                                    className="input-lg"
                                    placeholder="Montant du spot"
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
                                    Taux de placement (%)
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="rate"
                                    name='rate'
                                    value={rate}
                                    disabled={deal}
                                    className="input-lg"
                                    placeholder="Taux de placement"
                                    onChange={(e) => this.setState({ rate: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Loyer
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="rent"
                                    name='rent'
                                    value={rent}
                                    disabled={deal}
                                    className="input-lg"
                                    placeholder="Loyer"
                                    onChange={(e) => this.setState({ rent: e.target.value })}
                                />
                            </FormGroup>
                        </div>

                        <div className='row'>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Périodicité du loyer
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={periodicity}
                                    disabled={deal}
                                    options={getTimeUnits()}
                                    onChange={(__, item) => {
                                        this.setState({ periodicity: item });
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Durée du spot (nombre de période)
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    disabled={deal}
                                    id="periodicityLength"
                                    name='periodicityLength'
                                    value={periodicityLength}
                                    className="input-lg"
                                    placeholder="Durée du spot"
                                    onChange={(e) => this.setState({ periodicityLength: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        
                        <h2 className='mb-20'>Valeur d'une part du spot</h2>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Nombre de part du spot
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    disabled={deal}
                                    id="numberOfPart"
                                    name='numberOfPart'
                                    value={numberOfPart}
                                    className="input-lg"
                                    placeholder="Nombre de part du spot"
                                    onChange={(e) => this.setState({ numberOfPart: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Taux de gestion par période de loyer (%)
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    disabled={deal}
                                    id="managementRate"
                                    name='managementRate'
                                    value={managementRate}
                                    className="input-lg"
                                    placeholder="Taux de gestion"
                                    onChange={(e) => this.setState({ managementRate: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Frais de gestion par période
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    disabled={deal}
                                    id="managementAmount"
                                    name='managementAmount'
                                    value={managementAmount}
                                    className="input-lg"
                                    placeholder="Frais de gestion par période"
                                    onChange={(e) => this.setState({ managementAmount: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Rénumération périodique du spot
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    disabled={deal}
                                    id="benefitByPeriod"
                                    name='benefitByPeriod'
                                    value={benefitByPeriod}
                                    className="input-lg"
                                    placeholder="Rénumération périodique du spot"
                                    onChange={(e) => this.setState({ benefitByPeriod: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        <h2 className='mb-20'>Loyer d'une part par période</h2>
                        <div className='d-flex direction-column align-items-stretch' style={{ flex: 1 }}>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Date de premier loyer
                                </InputLabel>
                                <InputStrap
                                    type="date"
                                    disabled={deal}
                                    id="paymentStartDate"
                                    name='paymentStartDate'
                                    value={paymentStartDate}
                                    className="input-lg"
                                    placeholder="Date de premier loyer"
                                    onChange={(e) => this.setState({ paymentStartDate: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Prime de liquidation anticipée
                                </InputLabel>
                                <InputStrap
                                    type="number"
                                    id="prime"
                                    name='prime'
                                    disabled={deal}
                                    value={prime}
                                    className="input-lg"
                                    placeholder="Prime de liquidation anticipée"
                                    onChange={(e) => this.setState({ prime: e.target.value })}
                                />
                            </FormGroup>
                        </div>
                        
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