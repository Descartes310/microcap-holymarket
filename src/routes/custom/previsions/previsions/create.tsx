import { connect } from 'react-redux';
import { MIPRO } from 'Url/frontendUrl';
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

const Create = (props) => {

    const [goals, setGoals] = useState([]);
    const [label, setLabel] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [selectedGoals, setSelectedGoals] = useState([]);

    useEffect(() => {
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

    const onSubmit = () => {

        if(!label || selectedGoals.length <= 0) {
            return;
        }

        var data = {
            label, startDate, endDate, goalIds: selectedGoals.map(g => g.id)
        }

        props.setRequestGlobalAction(true);

        PrevisionService.createPrevision(data).then(() => {
            NotificationManager.success('La prévision a été créé avec succès');
            props.history.push(MIPRO.PREVISION.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues lors de la création de la prévision');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'une prévision"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
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
                    <FormGroup className="has-wrapper">
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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Objectifs
                        </InputLabel>
                        <Autocomplete
                            multiple
                            options={goals}
                            value={selectedGoals}
                            id="combo-box-demo"
                            onChange={(__, items) => {
                                setSelectedGoals(items);
                            }}
                            getOptionLabel={(option) => option.goal.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
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