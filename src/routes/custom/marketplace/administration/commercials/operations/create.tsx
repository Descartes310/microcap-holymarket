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
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [commercialOperationType, setCommercialOperationType] = useState(null);
    const [commercialOperationTypes, setCommercialOperationTypes] = useState([]);

    useEffect(() => {
        getCommercialOperationTypes();
    }, []);

    const getCommercialOperationTypes = () => {
        props.setRequestGlobalAction(true);
        CommercialService.getCommercialOperationTypes()
        .then((response) => setCommercialOperationTypes(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {
        if(!label || !commercialOperationType)
            return;

        var data = {
            label: label,
            description: description,
            commercialOpTypeId: commercialOperationType.id,
        }

        props.setRequestGlobalAction(true);

        CommercialService.createCommercialOperation(data).then(() => {
            NotificationManager.success('Opération commerciale créée avec succès');
            props.history.push(MARKETPLACE.COMMERCIAL.OPERATION.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.success('Une erreur est survenues lors de la création de opération');
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
                            Type d'opération commerciale
                        </InputLabel>
                        <Autocomplete
                            options={commercialOperationTypes}
                            id="combo-box-demo"
                            value={commercialOperationType}
                            onChange={(__, item) => {
                                setCommercialOperationType(item);
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