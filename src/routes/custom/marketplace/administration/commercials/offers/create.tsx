import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import CommercialService from 'Services/commercials';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [description, setDescription] = useState('');
    const [commercialOperation, setCommercialOperation] = useState(null);
    const [commercialOperations, setCommercialOperations] = useState([]);

    useEffect(() => {
        getCommercialOperations();
    }, []);

    const getCommercialOperations = () => {
        props.setRequestGlobalAction(true);
        CommercialService.getCommercialOperations()
            .then((response) => setCommercialOperations(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const onSubmit = () => {
        if (!label || !commercialOperation || !startDate || !endDate)
            return;

        var data = {
            label: label,
            endDate: endDate,
            startDate: startDate,
            description: description,
            commercialOpId: commercialOperation.id,
        }

        props.setRequestGlobalAction(true);

        CommercialService.createCommercialOffer(data).then(() => {
            NotificationManager.success('Offre commerciale créée avec succès');
            props.history.push(MARKETPLACE.COMMERCIAL.OFFER.LIST);
        })
            .catch((err) => {
                console.log(err);
                NotificationManager.success('Une erreur est survenues lors de la création de Offre');
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
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="endDate">
                                Date de fin
                            </InputLabel>
                            <InputStrap
                                required
                                id="endDate"
                                type="date"
                                name='endDate'
                                className="input-lg"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormGroup>
                    </div>
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
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Opération commerciale
                        </InputLabel>
                        <Autocomplete
                            options={commercialOperations}
                            id="combo-box-demo"
                            value={commercialOperation}
                            onChange={(__, item) => {
                                setCommercialOperation(item);
                            }}
                            getOptionLabel={(option) => option.label}
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