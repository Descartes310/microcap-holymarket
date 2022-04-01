import { connect } from 'react-redux';
import { PROJECT } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProjectService from 'Services/projects';
import { getInputTypes } from 'Helpers/helpers';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [type, setType] = useState(null);
    const [parent, setParent] = useState(null);
    const [description, setDescription] = useState('');
    const [projectItems, setProjectItems] = useState([]);

    useEffect(() => {
        getProjectItems();
    }, []);

    const getProjectItems = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectItems(['SIMPLE'])
            .then((response) => setProjectItems(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const onSubmit = () => {
        if (!label || !type)
            return;

        var data: any = {
            label: label,
            type: 'SIMPLE',
            ownerType: 'GENERAL',
            inputType: type.value,
            description: description
        }

        if (parent)
            data.parentId = parent.id;

        props.setRequestGlobalAction(true);

        ProjectService.createProjectItem(data).then(() => {
            NotificationManager.success('Ouvrage  créé avec succès');
            props.history.push(PROJECT.ITEM.SIMPLE.LIST);
        })
            .catch((err) => {
                console.log(err);
                NotificationManager.success('Une erreur est survenues lors de la création de ouvrage');
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
                            Type de donnée
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            id="combo-box-demo"
                            options={getInputTypes()}
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Ouvrage parent
                        </InputLabel>
                        <Autocomplete
                            value={parent}
                            options={projectItems}
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