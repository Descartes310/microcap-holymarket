import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { getInitializationTypeLabel } from 'Helpers/helpers';
import { joinUrlWithParams, PROJECT } from 'Url/frontendUrl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [isChildren, setIsChildren] = useState(false);
    const [initialization, setInitialization] = useState(null);
    const [initializations, setInitializations] = useState([]);

    useEffect(() => {
        getInitializations();
    }, []);

    const getInitializations = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectInitializations({ type: getInitializationTypeLabel(props.match.params.type) })
            .then((response) => setInitializations(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const onSubmit = () => {
        if (!label)
            return;

        var data: any = {
            label: label,
            description: description,
            type: getInitializationTypeLabel(props.match.params.type),
        }

        if(initialization) 
            data.parentId = initialization.id;
        
        props.setRequestGlobalAction(true);

        ProjectService.createProjectInitialization(data).then(() => {
            NotificationManager.success('Initalisation créée avec succès');
            props.history.push(joinUrlWithParams(PROJECT.INITIALIZATION.LIST, [{param: 'type', value: props.match.params.type}]));
        })
            .catch((err) => {
                console.log(err);
                NotificationManager.success('Une erreur est survenues lors de la création de initalisation');
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
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={isChildren}
                                onChange={() => setIsChildren(!isChildren)}
                            />
                        } label={"Volet d'une option d'initialisation mère"}
                        />
                    </FormGroup>
                    {isChildren && (
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Options d'initialisation mère
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={initialization}
                                onChange={(__, item) => {
                                    setInitialization(item);
                                }}
                                options={initializations}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    )}
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