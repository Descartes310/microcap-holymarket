import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ConfirmBox from "Components/dialog/ConfirmBox";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getProductTypes, getConvertableTimeUnits } from 'Helpers/datas';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


const Configure = (props: any) => {
    
    const [units, setUnits] = useState([]);
    const [quotient, setQuotient] = useState(null);
    const [lineFees, setLineFees] = useState(null);
    const [priceUnit, setPriceUnit] = useState(null);
    const [lineGroup, setLineGroup] = useState(null);
    const [cycleTime, setCycleTime] = useState(null);
    const [minimumRate, setMinimumRate] = useState(null);
    const [productType, setProductType] = useState(null);
    const [totalDeposit, setTotalDeposit] = useState(null);
    const [depositPeriod, setDepositPeriod] = useState(null);
    const [depositAmount, setDepositAmount] = useState(null);
    const [emitLineCount, setEmitLineCount] = useState(null);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [startDepositDate, setStartDepositDate] = useState(null);
    const [availableCapital, setAvailableCapital] = useState(null);
    // const [subscriptionFees, setSubscriptionFees] = useState(null);
    const [lineManagementFees, setLineManagementFees] = useState(null);
    const [ticketDemountingFees, setTicketDemountingFees] = useState(null);
    const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
    const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);

    useEffect(() => {
        getUnits();
    }, []);

    useEffect(() => {
        if(units.length > 0) {
            findProductModel();
        }
    }, [units])

    useEffect(() => {
        if(lineGroup && cycleTime) {
            setEmitLineCount(cycleTime * lineGroup);
        }
    }, [lineGroup, cycleTime]);

    useEffect(() => {
        if(depositAmount && cycleTime) {
            setTotalDeposit(depositAmount*cycleTime);
        }

        if(depositAmount && minimumRate) {
            setAvailableCapital((depositAmount*Math.pow(1+minimumRate, emitLineCount)).toFixed(2));
        }
    }, [depositAmount, cycleTime, minimumRate])

    useEffect(() => {
        if(minimumRate && depositPeriod && cycleTime && depositAmount) {
            computeCapital();
        }
    }, [minimumRate, depositPeriod, cycleTime, depositAmount])    

    const computeCapital = () => {
        let t1 = minimumRate;
        let j = depositPeriod.days * cycleTime;
        let t1Rate = t1/360;
        let capital = (depositAmount * (Math.pow(1+t1Rate, j)-1))/t1Rate;
        setAvailableCapital(capital);
    }

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits()
            .then((response) => {
                setUnits(response);
            }).catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const onSubmit = () => {

        if(!depositPeriod || !cycleTime || !lineGroup || !lineFees || !lineManagementFees || !ticketDemountingFees ||
            !subscriptionStartDate || !subscriptionEndDate || !startDepositDate || 
            !depositAmount || !minimumRate || !priceUnit || !quotient) {
            NotificationManager.error('Le formulaire est mal rempli');
            return;
        }

        if(subscriptionStartDate >= subscriptionEndDate) {
            NotificationManager.error('Les dates ne sont pas correctement renseignées');
            return;
        }

        let data: any = {
            reference: props.match.params.reference,
            productType: productType.value.toString(),
            depositPeriod: depositPeriod.value.toString(), 
            // subscriptionFees: subscriptionFees.toString(),
            lineFees: lineFees.toString(),
            lineManagementFees: lineManagementFees.toString(),
            ticketDemountingFees: ticketDemountingFees.toString(),
            cycleTime: cycleTime.toString(), 
            depositAmount: depositAmount.toString(),
            quotient: quotient.toString(),
            minimumRate: minimumRate.toString(), 
            totalDeposit: totalDeposit.toString(), 
            availableCapital: availableCapital.toString(), 
            lineGroup: lineGroup.toString(),
            subscriptionStartDate: subscriptionStartDate.toString(),
            subscriptionEndDate: subscriptionEndDate.toString(), 
            startDepositDate: startDepositDate.toString(),
            emitLineCount: emitLineCount.toString(),
            priceUnit: priceUnit.code
        }

        props.setRequestGlobalAction(true);
        ProductService.updateProductModelDetails(data).then(() => {
            NotificationManager.success('Le product a été mis à jour avec succès !');
            props.history.push(MARKETPLACE.MODEL.PRODUCT.LIST);
        }).catch((err) => {
            NotificationManager.error('Les tirages ont déjà été générés');
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const generateProductTirages = () => {

        if(!depositPeriod || !cycleTime || !lineGroup || !lineFees || !lineManagementFees || !ticketDemountingFees ||
            !subscriptionStartDate || !subscriptionEndDate || !startDepositDate || 
            !depositAmount || !minimumRate || !priceUnit || !quotient) {
            NotificationManager.error('Le formulaire est mal rempli');
            return;
        }

        if(subscriptionStartDate >= subscriptionEndDate) {
            NotificationManager.error('Les dates ne sont pas correctement renseignées');
            return;
        }

        let data: any = {
            reference: props.match.params.reference
        }

        props.setRequestGlobalAction(true);
        ProductService.generateProductTirages(data).then(() => {
            NotificationManager.success('Les tirages ont été enregistrés avec succès !');
            props.history.push(MARKETPLACE.MODEL.PRODUCT.LIST);
        }).catch((err) => {
            NotificationManager.error('Les tirages ont déjà été générés');
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const findProductModel = () => {
        props.setRequestGlobalAction(true);
        ProductService.findProductModel(props.match.params.reference).then(response => {
            setProductType(getProductTypes().find(pt => pt.value == 'CODEV'));
            setQuotient(response.details.find(d => d.type == 'QUOTIENT')?.value);
            setLineGroup(response.details.find(d => d.type == 'LINE_GROUP')?.value);
            setCycleTime(response.details.find(d => d.type == 'CYCLE_TIME')?.value);
            setMinimumRate(response.details.find(d => d.type == 'MINIMUM_RATE')?.value);
            setTotalDeposit(response.details.find(d => d.type == 'TOTAL_DEPOSIT')?.value);
            setDepositAmount(response.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value);
            setLineFees(response.details.find(d => d.type == 'LINE_FEES')?.value);
            setLineManagementFees(response.details.find(d => d.type == 'LINE_MANAGEMENT_FEES')?.value);
            setTicketDemountingFees(response.details.find(d => d.type == 'TICKET_DEMOUNTING_FEES')?.value);
            setSubscriptionEndDate(response.details.find(d => d.type == 'END_DATE')?.value);
            setEmitLineCount(response.details.find(d => d.type == 'EMIT_LINE_COUNT')?.value);
            setSubscriptionStartDate(response.details.find(d => d.type == 'START_DATE')?.value);
            setAvailableCapital(response.details.find(d => d.type == 'AVAILABLE_CAPITAL')?.value);
            // setSubscriptionFees(response.details.find(d => d.type == 'SUBSCRIPTION_FEES')?.value);
            setStartDepositDate(response.details.find(d => d.type == 'START_DEPOSIT_DATE')?.value);
            setPriceUnit(units.find(t => t.code == response.details.find(d => d.type == 'PRICE_CURRENCY')?.value));
            setDepositPeriod(getConvertableTimeUnits().find(t => t.value == response.details.find(d => d.type == 'DEPOSIT_PERIOD')?.value));
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <h2 className='mb-30 mt-10'>Spécifications des lignes</h2>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Périodicité des versements
                            </InputLabel>
                            <Autocomplete
                                value={depositPeriod}
                                id="combo-box-demo"
                                options={getConvertableTimeUnits()}
                                onChange={(__, item) => {
                                    setDepositPeriod(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left" htmlFor="cycleTime">
                                Durée du cycle
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="cycleTime"
                                name='cycleTime'
                                value={cycleTime}
                                className="input-lg"
                                onChange={(e) => setCycleTime(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="lineGroup">
                                Groupage (nombre de ligne par tirage)
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
                            <InputLabel className="text-left" htmlFor="emitLineCount">
                                Nombre total de ligne
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
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Devise
                            </InputLabel>
                            <Autocomplete
                                value={priceUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setPriceUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="lineFees">
                                Frais de souscription d'une ligne
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                className="input-lg"
                                id="lineFees"
                                name='lineFees'
                                value={lineFees}
                                onChange={(e) => setLineFees(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="lineManagementFees">
                                Frais de gestion d'une ligne
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="lineManagementFees"
                                name='lineManagementFees'
                                className="input-lg"
                                value={lineManagementFees}
                                onChange={(e) => setLineManagementFees(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="ticketDemountingFees">
                                Frais de démembrement d'un bond
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="ticketDemountingFees"
                                name='ticketDemountingFees'
                                className="input-lg"
                                value={ticketDemountingFees}
                                onChange={(e) => setTicketDemountingFees(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <h2 className='mb-30 mt-10'>Spécifications financières du plan</h2>

                    <div className="row">
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="depositStartDate">
                                Date de début des versements
                            </InputLabel>
                            <InputStrap
                                required
                                type="date"
                                className="input-lg"
                                id="depositStartDate"
                                name='depositStartDate'
                                value={startDepositDate}
                                onChange={(e) => setStartDepositDate(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        {/* <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                        </FormGroup> */}
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
                                Total des versements à terme par ligne
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
                                Capital disponible à terme par ligne
                            </InputLabel>
                            <InputStrap
                                disabled
                                type="number"
                                className="input-lg"
                                id="availableCapital"
                                name='availableCapital'
                                value={Number(availableCapital)?.toFixed(2)}
                                onChange={(e) => setAvailableCapital(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className='row'>
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left" htmlFor="quotient">
                                Quotité
                            </InputLabel>
                            <InputStrap
                                type="number"
                                className="input-lg"
                                id="quotient"
                                name='quotient'
                                value={quotient}
                                onChange={(e) => setQuotient(e.target.value)}
                            />
                        </div>
                    </div>

                    <FormGroup className="d-flex justify-content-between">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setShowConfirmBox(true)}
                            className="text-white font-weight-bold"
                        >
                            Générer les tirages
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
            { showConfirmBox && (
                <ConfirmBox
                    show={showConfirmBox}
                    rightButtonOnClick={() => generateProductTirages()}
                    leftButtonOnClick={() => {
                        setShowConfirmBox(false);
                    }}
                    message={'Etes vous sure de génerer les tirages ?'}
                />
            )}
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Configure));