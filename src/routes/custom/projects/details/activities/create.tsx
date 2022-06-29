import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { getActivitypes } from 'Helpers/helpers';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { joinUrlWithParamsId, PROJECT } from 'Url/frontendUrl';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Create = (props) => {

    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [project, setProject] = useState(null);
    const [description, setDescription] = useState('');    
    const [projectItem, setProjectItem] = useState(null);    
    const [activityType, setActivityType] = useState(null);

    useEffect(() => {
        getProject();
    }, []);

    const getProject = () => {
        props.setRequestGlobalAction(true)
        ProjectService.getProjectById(props.match.params.id)
        .then(response => {
            setProject(response)
        })
        .catch((error) => {
            console.log(error);
            setProject(null);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!label || !projectItem || !activityType || !description)
        return;

        let data: any = {
            label,
            message: description,
            type: activityType.value,
            project_item_id: projectItem.id
        }

        if(file)
            data.file = file;

        props.setRequestGlobalAction(true);
        ProjectService.createProjectActivity(props.match.params.id, data, { fileData: ['file'], multipart: true })
        .then(() => {
            NotificationManager.success('Le activité a été créé avec succès');
            props.history.push(joinUrlWithParamsId(PROJECT.DETAILS.ACTIVITY.LIST, props.match.params.id));
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue lors de la création de activité');
        }).finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'une activité"}
            />
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

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Type d'activité
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={activityType}
                            onChange={(__, item) => {
                                setActivityType(item);
                            }}
                            options={getActivitypes()}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Ouvrage
                        </InputLabel>
                        <Autocomplete
                            value={projectItem}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setProjectItem(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={project ? project.items.map(i => i.projectItem) : []}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>

                    {
                        activityType?.value === 'ILLUSTRATION' && (
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="title">
                                    Illustration
                                </InputLabel>
                                <FileUploader
                                    classes="mw-100"
                                    label="Sélectionner le document de votre projet ici"
                                    handleChange={(file) => {
                                        setFile(file);    }} name="file" types={fileTypes} />
                            </FormGroup>
                        ) 
                    }

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