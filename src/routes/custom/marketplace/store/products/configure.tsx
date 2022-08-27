import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import {setRequestGlobalAction} from 'Actions';
import { getProductTypes } from 'Helpers/datas';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Configure = (props) => {

    const [lineGroup, setLineGroup] = useState(null);
    const [minimumRate, setMinimumRate] = useState(null);
    const [productType, setProductType] = useState(null);
    const [advanceType, setAdvanceType] = useState(null);
    const [totalDeposit, setTotalDeposit] = useState(null);
    const [depositPeriod, setDepositPeriod] = useState(null);
    const [depositAmount, setDepositAmount] = useState(null);
    const [advanceOption, setAdvanceOption] = useState(null);
    const [emitLineCount, setEmitLineCount] = useState(null);
    const [carrencePeriod, setCarrencePeriod] = useState(null);
    const [advanceInterest, setAdvanceInterest] = useState(null);
    const [availableCapital, setAvailableCapital] = useState(null);
    const [subscriptionFees, setSubscriptionFees] = useState(null);
    const [quotientAvailable, setQuotientAvailable] = useState(null);
    const [investmentCapital, setInvestmentCapital] = useState(null);
    const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
    const [ticketCaracteristic, setTicketCaracteristic] = useState(null);
    const [advanceOptionVoteDate, setAdvanceOptionVoteDate] = useState(null);
    const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);

    useEffect(() => {
    }, []);

    const onSubmit = () => {

        let data: any = {
            reference: props.match.params.reference,
            lineGroup, minimumRate, productType: productType.value,
            advanceType, totalDeposit, depositPeriod, depositAmount,
            advanceOption, emitLineCount, carrencePeriod, advanceInterest,
            availableCapital, subscriptionFees, quotientAvailable, investmentCapital,
            subscriptionEndDate, ticketCaracteristic, advanceOptionVoteDate, subscriptionStartDate
        }

        props.setRequestGlobalAction(true);
        ProductService.updateProductDetails(data).then(() => {
            console.log(data);
            NotificationManager.success('Le product a été mis à jour avec succès !');
            props.history.push(MARKETPLACE.STORE.PRODUCT.LIST);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <PageTitleBar
                title={"Configuration produit"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type du modèle
                        </InputLabel>
                        <Autocomplete
                            value={productType}
                            options={getProductTypes()}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setProductType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="subscriptionFees">
                                Frais de souscription
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                className="input-lg"
                                id="subscriptionFees"
                                name='subscriptionFees'
                                value={subscriptionFees}
                                onChange={(e) => setSubscriptionFees(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="depositPeriod">
                                Période de versement
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="depositPeriod"
                                name='depositPeriod'
                                className="input-lg"
                                value={depositPeriod}
                                onChange={(e) => setDepositPeriod(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="depositAmount">
                                Montant périodique
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="depositAmount"
                                name='depositAmount'
                                className="input-lg"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="minimumRate">
                                Taux minimal grarantie
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="minimumRate"
                                name='minimumRate'
                                className="input-lg"
                                value={minimumRate}
                                onChange={(e) => setMinimumRate(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="totalDeposit">
                                Total des versements
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="totalDeposit"
                                name='totalDeposit'
                                className="input-lg"
                                value={totalDeposit}
                                onChange={(e) => setTotalDeposit(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="availableCapital">
                                Capital disponible à terme
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                className="input-lg"
                                id="availableCapital"
                                name='availableCapital'
                                value={availableCapital}
                                onChange={(e) => setAvailableCapital(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="lineGroup">
                                Groupage de ligne
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="lineGroup"
                                name='lineGroup'
                                value={lineGroup}
                                className="input-lg"
                                onChange={(e) => setLineGroup(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="advanceOption">
                                Option d'avance sur capital
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="advanceOption"
                                name='advanceOption'
                                className="input-lg"
                                value={advanceOption}
                                onChange={(e) => setAdvanceOption(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="quotientAvailable">
                                Quotité disponible sur avance
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                className="input-lg"
                                id="quotientAvailable"
                                name='quotientAvailable'
                                value={quotientAvailable}
                                onChange={(e) => setQuotientAvailable(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="investmentCapital">
                                Capital à investir par groupe de ligne
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                className="input-lg"
                                id="investmentCapital"
                                name='investmentCapital'
                                value={investmentCapital}
                                onChange={(e) => setInvestmentCapital(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="subscriptionStartDate">
                                Date de début des souscriptions
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                className="input-lg"
                                id="subscriptionStartDate"
                                name='subscriptionStartDate'
                                value={subscriptionStartDate}
                                onChange={(e) => setSubscriptionStartDate(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="subscriptionEndDate">
                                Date de fin des souscriptions
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                className="input-lg"
                                id="subscriptionEndDate"
                                name='subscriptionEndDate'
                                value={subscriptionEndDate}
                                onChange={(e) => setSubscriptionEndDate(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="emitLineCount">
                                Nombre de ligne emises
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="emitLineCount"
                                name='emitLineCount'
                                className="input-lg"
                                value={emitLineCount}
                                onChange={(e) => setEmitLineCount(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="carrencePeriod">
                                Période de carrence
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="carrencePeriod"
                                name='carrencePeriod'
                                className="input-lg"
                                value={carrencePeriod}
                                onChange={(e) => setCarrencePeriod(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="advanceOptionVoteDate">
                                Date de tirage pour l'option d'avance
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                className="input-lg"
                                id="advanceOptionVoteDate"
                                name='advanceOptionVoteDate'
                                value={advanceOptionVoteDate}
                                onChange={(e) => setAdvanceOptionVoteDate(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="ticketCaracteristic">
                                Caracteristique des coupons d'avance
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                className="input-lg"
                                id="ticketCaracteristic"
                                name='ticketCaracteristic'
                                value={ticketCaracteristic}
                                onChange={(e) => setTicketCaracteristic(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="advanceType">
                                Type d'avance
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="advanceType"
                                name="advanceType"
                                value={advanceType}
                                className="input-lg"
                                onChange={(e) => setAdvanceType(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="advanceInterest">
                                Interet sur avance
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                className="input-lg"
                                id="advanceInterest"
                                name="advanceInterest"
                                value={advanceInterest}
                                onChange={(e) => setAdvanceInterest(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Configure));