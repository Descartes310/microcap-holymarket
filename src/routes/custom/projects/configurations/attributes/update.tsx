import { connect } from 'react-redux';
import { PROJECT } from 'Url/frontendUrl';
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

const Update = (props) => {

    const [label, setLabel] = useState('');
    const [parent, setParent] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [attribute, setAttribute] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        findAttribute();
        getAttributes();
    }, []);

    useEffect(() => {
        if(attribute && attributes.length > 0) {
            setParent(attributes.find(a => a.reference == attribute.parentReference));
        }
    }, [attributes, attribute])

    const getAttributes = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getAttributes().then(response => {
            setAttributes(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const findAttribute = () => {
        props.setRequestGlobalAction(true);
        ProjectService.findAttribute(props.match.params.id)
        .then((response) => {
            setAttribute(response);
            setLabel(response.label);
            setDescription(response.description);
        }).catch(() => {
            props.history.push(PROJECT.CONFIGURATION.ATTRIBUTE.LIST);
            NotificationManager.error('Une erreur est survenue');
        }).finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label)
        return;

        let data: any = {
            label,
            description
        }

        if(parent) {
            data.parent_reference = parent.reference
        }

        props.setRequestGlobalAction(true);
        ProjectService.updateAttribute(props.match.params.id, data)
        .then(() => {
            NotificationManager.success('L\'attribut projet a été édité avec succès');
            props.history.push(PROJECT.CONFIGURATION.ATTRIBUTE.LIST);
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue');
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
                            options={attributes.filter(a => ![attribute?.reference, attribute?.parentReference].includes(a.reference) && a?.parentReference != attribute?.reference)}
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
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));