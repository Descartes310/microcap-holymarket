import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import { Form, FormGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { count } from 'console';


const List = (props) => {

    const [counter, setCounter] = useState(null);
    const [counters, setCounters] = useState([]);

    useEffect(() => {
        getCounters();
    }, []);

    const getCounters = () => {
        props.setRequestGlobalAction(true),
        BankService.getCounters()
        .then(response => {
            setCounters(response);
            setCounter(response.find(c => c.mmsDefault));
        }).finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        let datas: any = {};

        props.setRequestGlobalAction(true);

        if(counter)
            datas.defaultCounterReference = counter.reference;

        BankService.setMMSSettings(datas)
        .then(() => NotificationManager.success("Les paramètres ont bien été mis à jour!"))
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <Form onSubmit={onSubmit} className="mt-30">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Guichet pour les opérations MMS
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={counter}
                                onChange={(__, item) => {
                                    setCounter(item);
                                }}
                                options={counters}
                                getOptionLabel={(option) => option.commercialName}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={onSubmit}
                                className="text-white font-weight-bold float-right"
                            >
                                Sauvegarder les paramètres
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(List));
