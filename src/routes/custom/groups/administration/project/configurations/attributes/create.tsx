import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [parent, setParent] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getAttributes();
    }, []);

    const getAttributes = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getAttributes().then(response => {
            setAttributes(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            label,
            description
        }

        if(parent) {
            data.parent_reference = parent.reference
        }

        props.setRequestGlobalAction(true);
        ProjectService.createAttribute(data)
        .then(() => {
            NotificationManager.success('L\' attribut a été créé avec succès');
            props.history.push(GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.ATTRIBUTE.LIST);
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue lors de l\'attribut');
        }).finally(() => props.setRequestGlobalAction(false))
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
                            Attribut parent
                        </InputLabel>
                        <Autocomplete
                            value={parent}
                            options={attributes}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setParent(item);
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