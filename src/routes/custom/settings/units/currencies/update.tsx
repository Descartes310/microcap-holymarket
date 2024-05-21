import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { SETTING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [rate, setRate] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        findCurrency();
    }, []);
    
    const findCurrency = () => {
        props.setRequestGlobalAction(true);
        UnitService.findCurrency(props.match.params.id).then((response) => {
            setCurrency(response);
            setLabel(response.label);
            setRate(response.rate);
            setDescription(response.description);
            setCode(response.code);
        })
        .catch((err) => {
            console.log(err);
            props.history.goBack();
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }


    const onSubmit = () => {
        if(!label || !code || !rate)
            return;

        var data = {
            label: label,
            code: code,
            rate: rate,
            description: description,
        }

        props.setRequestGlobalAction(true);

        UnitService.updateCurrency(props.match.params.id, data).then(() => {
            NotificationManager.success('Unité a été éditée avec succès');
            props.history.goBack();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues lors d\'édition de unité');
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
                        <InputLabel className="text-left" htmlFor="rate">
                            Taux de change (par rapport à la référence)
                        </InputLabel>
                        <InputStrap
                            required
                            id="rate"
                            type="number"
                            name='rate'
                            className="input-lg"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="description"
                            type="text"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
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
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));