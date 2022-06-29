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
    const [date, setDate] = useState(null);
    const [goal, setGoal] = useState(null);

    useEffect(() => {
        getGoals();
    }, []);

    const getGoals = () => {
        props.setRequestGlobalAction(true);
        PrevisionService.getGoals()
        .then((response) => setGoals(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {

        if(!goal || !date) {
            return;
        }

        var data = {
            goalId: goal.id,
            date: date
        }

        props.setRequestGlobalAction(true);

        PrevisionService.createUserGoal(data).then(() => {
            NotificationManager.success('L\'objectif a été créé avec succès');
            props.history.push(MIPRO.GOAL.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues lors de la création de l\'objectif');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'un objectif"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Objectif
                        </InputLabel>
                        <Autocomplete
                            value={goal}
                            options={goals}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setGoal(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="date">
                            Date prévue
                        </InputLabel>
                        <InputStrap
                            required
                            id="date"
                            type="date"
                            name='date'
                            className="input-lg"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </FormGroup>
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