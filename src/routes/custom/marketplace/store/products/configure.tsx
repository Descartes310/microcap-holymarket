import { connect } from 'react-redux';
import { datediff } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { getProductTypes, getTimeUnits } from 'Helpers/datas';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Configure = (props) => {

    const [endDate, setEndDate] = useState(null);
    const [lineGroup, setLineGroup] = useState(null);
    const [startDate, setStartDate] = useState(null);
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
    const [ticketCaracteristic, setTicketCaracteristic] = useState([]);
    const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
    const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);
    const [periode, setPeriode] = useState(0);

    useEffect(() => {
        if(subscriptionEndDate && subscriptionStartDate && depositPeriod) {
            if(lineGroup) {
                setEmitLineCount(datediff(subscriptionStartDate, subscriptionEndDate, depositPeriod.days) * lineGroup);
            }
            setPeriode(datediff(subscriptionStartDate, subscriptionEndDate, depositPeriod.days));
        }
    }, [subscriptionEndDate, subscriptionStartDate, lineGroup, depositPeriod]);

    useEffect(() => {
        if(depositAmount && periode) {
            setTotalDeposit(depositAmount*periode);
        }

        if(depositAmount && minimumRate) {
            console.log(depositAmount, minimumRate, depositAmount*Math.pow(1+minimumRate, emitLineCount));
            setAvailableCapital(depositAmount*Math.pow(1+minimumRate, emitLineCount));
        }
    }, [depositAmount, periode, minimumRate])

    useEffect(() => {
        if(availableCapital && lineGroup) {
            setInvestmentCapital(availableCapital*lineGroup);
        }
    }, [availableCapital, lineGroup])


    const onSubmit = () => {

        let data: any = {
            firstLot: startDate, lastLot: endDate,
            reference: props.match.params.reference,
            productType: productType.value.toString(),
            subscriptionStartDate: subscriptionStartDate.toString(),
            lineGroup: lineGroup.toString(), minimumRate: minimumRate.toString(), 
            advanceType: advanceType.toString(), totalDeposit: totalDeposit.toString(), 
            advanceOption: advanceOption+"", emitLineCount: emitLineCount.toString(), 
            depositPeriod: depositPeriod.value.toString(), depositAmount: depositAmount.toString(),
            carrencePeriod: carrencePeriod.toString(), advanceInterest: advanceInterest.toString(),
            availableCapital: availableCapital.toString(), subscriptionFees: subscriptionFees.toString(), 
            quotientAvailable: quotientAvailable.toString(), investmentCapital: investmentCapital.toString(),
            subscriptionEndDate: subscriptionEndDate.toString(), ticketCaracteristic: ticketCaracteristic[0].value.toString(), 
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
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Périodicité des versements
                            </InputLabel>
                            <Autocomplete
                                value={depositPeriod}
                                id="combo-box-demo"
                                options={getTimeUnits()}
                                onChange={(__, item) => {
                                    setDepositPeriod(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
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
                                Taux de rémunération minimal garantie (%)
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
                                disabled
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
                                disabled
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
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-0">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={advanceOption}
                                    onChange={() => {
                                        setAdvanceOption(!advanceOption);
                                    }}
                                />
                            } label={"Option d'avance sur capital"}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="quotientAvailable">
                                Quotité disponible sur avance (%)
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
                                disabled="text"
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
                                disabled
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
                                Nombre de période de carrence
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
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
                            <InputLabel className="text-left" htmlFor="startDate">
                                Date du premier tirage
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="startDate"
                                name='startDate'
                                value={startDate}
                                className="input-lg"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="endDate">
                                Date du dernier tirage
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                id="endDate"
                                name='endDate'
                                value={endDate}
                                className="input-lg"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className='row'>
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Caracteristique des coupons d'avance
                            </InputLabel>
                            <Autocomplete
                                multiple
                                id="combo-box-demo"
                                options={[{label: 'Cessible', value: 'CESSIBLE'}, {label: 'Modifiable', value: 'EDITABLE'}]}
                                value={ticketCaracteristic}
                                onChange={(__, item) => {
                                    setTicketCaracteristic(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Type d'avance
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={advanceType}
                                options={getTimeUnits()}
                                onChange={(__, item) => {
                                    setAdvanceType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="advanceInterest">
                                Interet sur avance (%)
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