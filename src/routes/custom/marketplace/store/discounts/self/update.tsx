import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {

    const [code, setCode] = useState('');
    const [label, setLabel] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [percentage, setPercentage] = useState(null);

    useEffect(() => {
        findDiscount();
    }, [])

    const findDiscount = () => {
        ProductService.findDiscount(props.match.params.id).then((response) => {
            setCode(response.code);
            setLabel(response.label);
            setEndDate(response.endDate);
            setStartDate(response.startDate);
            setPercentage(response.percentage);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error('Le coupon n\'a pas été retrouvé');
            props.history.push(MARKETPLACE.STORE.DISCOUNT.LIST);
        })
    }

    const onSubmit = () => {
        if(!label || !code || !percentage || !startDate || !endDate)
            return;

        var data = {
            label, percentage,
            startDate, endDate, code
        }

        props.setRequestGlobalAction(true);

        ProductService.updateDiscount(props.match.params.id, data).then(() => {
            NotificationManager.success('Le coupon a été édité avec succès');
            props.history.push(MARKETPLACE.STORE.DISCOUNT.LIST);
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="code">
                            Code de réduction
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
                        <InputLabel className="text-left" htmlFor="percentage">
                            Réduction (en %)
                        </InputLabel>
                        <InputStrap
                            required
                            id="percentage"
                            type="number"
                            name='percentage'
                            className="input-lg"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
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