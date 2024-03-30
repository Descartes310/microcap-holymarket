import { connect } from 'react-redux';
import { joinUrlWithParamsId, MIPRO } from 'Url/frontendUrl';
import { getTimeUnits } from 'Helpers/datas';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import PrevisionService from 'Services/previsions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const affectations = [
    "Acquisition des titres d'une entreprise",
    "Epargne bancaire",
    "Préventes",
    "Sureté de cautionnement",
];

const Create = (props) => {

    const [goals, setGoals] = useState([]);
    const [amounts, setAmounts] = useState([
        { percent: null, value: null }, 
        { percent: null, value: null }, 
        { percent: null, value: null }, 
        { percent: null, value: null }
    ]);
    const [amount, setAmount] = useState(0);
    const [endDate, setEndDate] = useState(null);
    const [timeUnit, setTimeUnit] = useState(null);
    const [prevision, setPrevision] = useState(null);
    const [startDate, setStartDate] = useState(null);

    useEffect(() => {
        getPrevision();
        getGoals();
    }, []);

    const getGoals = () => {
        props.setRequestGlobalAction(true);
        PrevisionService.getUserGoals()
        .then((response) => setGoals(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getPrevision = () => {
        props.setRequestGlobalAction(true);
        PrevisionService.getPrevision(props.match.params.id)
        .then((response) => setPrevision(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {

        if (!startDate || !endDate || !timeUnit) {
            NotificationManager.error('Le formulaire est mal rempli');
            return;
        }

        if (startDate >= endDate) {
            NotificationManager.error('La date de début est mals renseignée');
            return
        }

        if (sum('percent') != 100 || sum('value') != amount) {
            NotificationManager.error('Les affectations sont mals renseignées');
            return
        }

        var data = {
            amount, 
            endDate, 
            startDate, 
            timeUnit: timeUnit.value,
            caution: amounts[3].value,
            preSale: amounts[2].value,
            bankSaving: amounts[1].value,
            acquisition: amounts[0].value
        }

        props.setRequestGlobalAction(true);

        PrevisionService.createPeriod(props.match.params.id, data).then(() => {
            NotificationManager.success('La période a été créée avec succès');
            props.history.push(joinUrlWithParamsId(MIPRO.PERIOD.LIST, props.match.params.id));
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues lors de la création de la période');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const updateAmount = (value, index, type) => {
        if (type !== "percent") {
            let amountData = { value: Number(value), percent: Number((value / amount) * 100) };
            let amountTmps = amounts;
            amountTmps[index] = amountData;
            setAmounts([...amountTmps]);
        } else {
            let amountData = { value: Number((value * amount) / 100), percent: Number(value) };
            let amountTmps = amounts;
            amountTmps[index] = amountData;
            setAmounts([...amountTmps]);
        }
    }

    const sum = (type) => {
        if (type === "percent") {
            return amounts.reduce((a, b) => a + (b['percent'] || 0), 0)
        } else {
            return amounts.reduce((a, b) => a + (b['value'] || 0), 0)
        }
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'une période"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Prévision
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="text"
                            name='label'
                            className="input-lg"
                            value={prevision?.label}
                        />
                    </FormGroup>
                    <div className='row'>
                        <FormGroup className="has-wrapper col-md-6">
                            <InputLabel className="text-left" htmlFor="startdate">
                                Date de début
                            </InputLabel>
                            <InputStrap
                                required
                                id="startdate"
                                type="date"
                                name='startdate'
                                className="input-lg"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper col-md-6">
                            <InputLabel className="text-left" htmlFor="enddate">
                                Date de fin
                            </InputLabel>
                            <InputStrap
                                required
                                id="enddate"
                                type="date"
                                name='enddate'
                                className="input-lg"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Rythme des abondements
                        </InputLabel>
                        <Autocomplete
                            value={timeUnit}
                            id="combo-box-demo"
                            options={getTimeUnits()}
                            onChange={(__, item) => {
                                setTimeUnit(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Montant
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            name='label'
                            type="number"
                            value={amount}
                            className="input-lg"
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </FormGroup>

                    <h2>Affectation prévisionnelle des abondements de la période</h2>

                    <div className="table-responsive mt-15">
                        <table className="table table-hover table-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Prévision</th>
                                    <th>Pourcentage (%)</th>
                                    <th>Montant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {affectations.map((value, index) => (
                                    <tr
                                        className="cursor-pointer"
                                    >
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">{value}</h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        <InputStrap
                                                            required
                                                            id="amount"
                                                            type="number"
                                                            name={'amount'}
                                                            value={amounts[index].percent}
                                                            className="has-input input-lg input-border"
                                                            onChange={(e) => updateAmount(e.target.value, index, 'percent')}
                                                        />
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="media">
                                                <div className="media-body pt-10">
                                                    <h4 className="m-0 fw-bold text-dark">
                                                        <InputStrap
                                                            required
                                                            id="amount"
                                                            type="number"
                                                            name={'amount'}
                                                            value={amounts[index].value}
                                                            onChange={(e) => updateAmount(e.target.value, index, 'value')}
                                                            className="has-input input-lg input-border"
                                                        />
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr
                                    className="cursor-pointer"
                                >
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">Total</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">{sum('percent')}</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media">
                                            <div className="media-body pt-10">
                                                <h4 className="m-0 fw-bold text-dark">{sum('value')}</h4>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));