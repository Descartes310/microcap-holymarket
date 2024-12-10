import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import { bookingNatures } from 'Helpers/datas';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [nature, setNature] = useState(null);
    const [booking, setBooking] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [useLimit, setUseLimit] = useState(null);
    const [startDate, setStartDate] = useState(null);

    useEffect(() => {
        findDiscount();
    }, [])

    const findDiscount = () => {
        ProductService.findBooking(props.match.params.id).then((response) => {
            setBooking(response);
            setCode(response.code);
            setLabel(response.label);
            setEndDate(response.endDate);
            setUseLimit(response.useLimit);
            setStartDate(response.startDate);
            setNature(bookingNatures().find(bn => response.nature == bn.value));
        }).catch((err) => {
            console.log(err);
            NotificationManager.error('Le code n\'a pas été retrouvé');
            props.history.push(MARKETPLACE.STORE.BOOKING.LIST);
        })
    }

    const onSubmit = () => {

        if(!label || !code || !startDate || !endDate || !useLimit || !nature) {
            NotificationManager.error('Le formulaire n\'est pas bien renseigné');
            return;
        }

        var data: any = {
            startDate, endDate, code,
            label, useLimit, nature: nature.value,
        }

        props.setRequestGlobalAction(true);

        ProductService.updateBooking(props.match.params.id, data).then(() => {
            NotificationManager.success('Le coupon a été édité avec succès');
            props.history.push(MARKETPLACE.BOOKING.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Un coupon avec ce code existe déjà');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
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
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Contexte d'utilisation
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={nature}
                            options={bookingNatures()}
                            onChange={(__, item) => {
                                setNature(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="code">
                            Code
                        </InputLabel>
                        <InputStrap
                            required
                            id="code"
                            type="text"
                            name='code'
                            className="input-lg"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="useLimit">
                            Nombre d'utilisation
                        </InputLabel>
                        <InputStrap
                            required
                            id="useLimit"
                            type="number"
                            name='useLimit'
                            className="input-lg"
                            value={useLimit}
                            onChange={(e) => setUseLimit(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Date de début
                        </InputLabel>
                        <InputStrap
                            required
                            id="startDate"
                            type="date"
                            name='startDate'
                            className="input-lg"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="endDate">
                            Date de fin
                        </InputLabel>
                        <InputStrap
                            required
                            id="endDate"
                            type="date"
                            name='endDate'
                            value={endDate}
                            className="input-lg"
                            onChange={(e) => setEndDate(e.target.value)}
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));