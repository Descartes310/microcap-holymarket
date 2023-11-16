import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = () => {
        setRequestGlobalAction(true),
        GroupService.getFundingOptionTypes()
        .then(response => setTypes(response))
        .finally(() => setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!type || !label || !description) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label: label,
            description: description,
            type_reference: type?.reference
        }
        
        props.setRequestGlobalAction(true);
        GroupService.createFundingOption(data).then(() => {
            NotificationManager.success("L'option de financement a été créée avec succès");
            props.history.push(GROUP.FUNDING_OPTION.OPTION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
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
                    <InputLabel className="text-left" htmlFor="label">
                        Description
                    </InputLabel>
                    <InputStrap
                        required
                        id="label"
                        type="text"
                        name='label'
                        className="input-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Type d'option
                    </InputLabel>
                    <Autocomplete
                        value={type}
                        id="combo-box-demo"
                        options={types}
                        onChange={(__, item) => {
                            setType(item);
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
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));