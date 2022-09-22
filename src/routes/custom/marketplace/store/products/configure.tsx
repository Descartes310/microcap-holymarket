import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import CreateOption from '../components/createOption';
import CreateDetails from '../components/createDetails';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { getProductTypes, getTimeUnits } from 'Helpers/datas';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


const Configure = (props: any) => {

    const [config, setConfig] = useState<any>([]);
    const [configs, setConfigs] = useState([]);
    
    const [units, setUnits] = useState([]);
    const [details, setDetails] = useState([]);
    const [product, setProduct] = useState(null);
    const [priceUnit, setPriceUnit] = useState(null);
    const [placements, setPlacements] = useState([]);
    const [lineGroup, setLineGroup] = useState(null);
    const [cycleTime, setCycleTime] = useState(null);
    const [tirageDates, setTirageDates] = useState([]);
    const [detailsType, setDetailsType] = useState(null);
    const [minimumRate, setMinimumRate] = useState(null);
    const [productType, setProductType] = useState(null);
    const [totalDeposit, setTotalDeposit] = useState(null);
    const [depositPeriod, setDepositPeriod] = useState(null);
    const [depositAmount, setDepositAmount] = useState(null);
    const [advanceOption, setAdvanceOption] = useState(null);
    const [emitLineCount, setEmitLineCount] = useState(null);
    const [showDetailsBox, setShowDetailsBox] = useState(false);
    const [startDepositDate, setStartDepositDate] = useState(null);
    const [availableCapital, setAvailableCapital] = useState(null);
    const [subscriptionFees, setSubscriptionFees] = useState(null);
    const [showAddOption, setShowAddOption] = useState<Boolean>(false);
    const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
    const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);

    useEffect(() => {
        getUnits();
        findProduct();
        getCodevConfigOptions();
        getCodevDetails();
    }, []);

    useEffect(() => {
        let tmp = configs.filter(t => product?.details.find(d => d.type == 'OPTION')?.value.split(',').includes(t.reference));
        if(tmp) {
            setConfig(tmp);
        }

    }, [product, configs])

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
    
    useEffect(() => {
        if(details.length > 0 && product) {
            let refs = product.details.find(d => d.type == 'PLACEMENT')?.value.split(',');
            // setAdvanceType(details.find(t => t.reference == product.details.find(d => d.type == 'ADVANCE_TYPE')?.value));
            setPlacements(details.filter(t => refs?.includes(t.reference)));
        }
    }, [product, details])

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
            .then((response) => setUnits(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const onSubmit = () => {

        if(!config || !depositPeriod || !cycleTime || !lineGroup || placements.length <= 0 || 
            !subscriptionStartDate || !subscriptionEndDate || !startDepositDate || !subscriptionFees || 
            !depositAmount || !minimumRate || tirageDates.length < 0) {
            NotificationManager.success('Le formulaire est mal rempli');
            return;
        }

        if(subscriptionStartDate >= subscriptionEndDate) {
            NotificationManager.success('Les dates ne sont pas correctement renseignées');
            return;
        }

        let data: any = {
            reference: props.match.params.reference,
            productType: productType.value.toString(),
            depositPeriod: depositPeriod.value.toString(), 
            subscriptionFees: subscriptionFees.toString(),
            cycleTime: cycleTime.toString(), 
            depositAmount: depositAmount.toString(),
            minimumRate: minimumRate.toString(), 
            totalDeposit: totalDeposit.toString(), 
            availableCapital: availableCapital.toString(), 
            lineGroup: lineGroup.toString(),
            advanceOption: advanceOption+"",
            subscriptionStartDate: subscriptionStartDate.toString(),
            subscriptionEndDate: subscriptionEndDate.toString(), 
            startDepositDate: startDepositDate.toString(),
            emitLineCount: emitLineCount.toString(), 
            option: config.map(c => c.reference).join(','),
            placement: placements.map(p => p.reference).join(','),
        }

        props.setRequestGlobalAction(true);
        ProductService.updateProductDetails(data).then(() => {
            NotificationManager.success('Le product a été mis à jour avec succès !');
            props.history.push(MARKETPLACE.STORE.PRODUCT.LIST);
        }).catch((err) => {
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    const findProduct = () => {
        props.setRequestGlobalAction(true);
        ProductService.findProduct(props.match.params.reference).then(response => {
            setProduct(response);
            setLineGroup(response.details.find(d => d.type == 'LINE_GROUP')?.value);
            setCycleTime(response.details.find(d => d.type == 'CYCLE_TIME')?.value);
            setMinimumRate(response.details.find(d => d.type == 'MINIMUM_RATE')?.value);
            setProductType(getProductTypes().find(pt => pt.value == 'CODEV'));
            setTotalDeposit(response.details.find(d => d.type == 'TOTAL_DEPOSIT')?.value);
            setDepositAmount(response.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value);
            setAdvanceOption(response.details.find(d => d.type == 'ADVANCE_OPTION')?.value);
            setEmitLineCount(response.details.find(d => d.type == 'EMIT_LINE_COUNT')?.value);
            setStartDepositDate(response.details.find(d => d.type == 'START_DEPOSIT_DATE')?.value);
            setAvailableCapital(response.details.find(d => d.type == 'AVAILABLE_CAPITAL')?.value);
            setSubscriptionFees(response.details.find(d => d.type == 'SUBSCRIPTION_FEES')?.value);
            setSubscriptionEndDate(response.details.find(d => d.type == 'END_DATE')?.value);
            setSubscriptionStartDate(response.details.find(d => d.type == 'START_DATE')?.value);
            setDepositPeriod(getTimeUnits().find(t => t.value == response.details.find(d => d.type == 'DEPOSIT_PERIOD')?.value));
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCodevConfigOptions = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevConfigOptions({product_reference: props.match.params.reference}).then(response => {
            setConfigs(response.map(co => { return {...co, label: co.option.label}}));
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getCodevDetails = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCodevDetails({types: ['ADVANCE_TYPE', 'PLACEMENT']}).then(response => {
            setDetails(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Configuration produit"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>

                    <h2 className='mb-30 mt-10'>Spécifications générales du plan</h2>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-3 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-3 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-3 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-3 col-sm-12 has-wrapper">
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
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Options du plan
                            </InputLabel>
                            <Autocomplete
                                multiple
                                id="combo-box-demo"
                                value={config}
                                options={[{label: 'Ajouter une option', reference: 'add'}, ...configs]}
                                onChange={(__, item) => {
                                    if(item.find(i => i.reference == 'add')) {
                                        setShowAddOption(true);
                                    } else {
                                        setConfig(item);
                                    }
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Placements programmés
                            </InputLabel>
                            <Autocomplete
                                multiple
                                id="combo-box-demo"
                                value={placements}
                                options={[{value: 'Ajouter un placement programmé', ref: 'add'}, ...details.filter(d => d.type === 'PLACEMENT')]}
                                onChange={(__, item) => {
                                    if(item.find(i => i.ref == 'add')) {
                                        setShowDetailsBox(true);
                                        setDetailsType("PLACEMENT")
                                    } else {
                                        setPlacements(item);
                                    }
                                }}
                                getOptionLabel={(option) => option.value}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </div>

                    {
                        config?.map(c => (
                            <>
                                <h2 className='mb-30 mt-10'>Spécification {c.option.label}</h2>
                                
                                <div className="row">
                                    { c.option.optionDetails.map(d => (
                                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left">
                                                {d.label}
                                            </InputLabel>
                                            <InputStrap
                                                disabled
                                                type="text"
                                                value={d.value}
                                                className="input-lg"
                                            />
                                        </FormGroup>
                                    ))}
                                </div>
                            </>    
                        ))
                    }

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Valider
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
            <CreateOption 
                dates={tirageDates}
                show={showAddOption} 
                onClose={() => { setShowAddOption(false); getCodevConfigOptions() }} 
            />
            <CreateDetails 
                type={detailsType} 
                show={showDetailsBox} 
                title={"Ajout d'un nouvel élément"} 
                onClose={() => { setShowDetailsBox(false); setDetailsType(null); getCodevDetails() }} 
            />
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Configure));