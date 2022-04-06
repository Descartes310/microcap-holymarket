import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { PROJECT } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getInitializationTypes } from 'Helpers/helpers';
import { NotificationManager } from 'react-notifications';
import PolymorphComponent from 'Components/PolymorphComponent';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Update = (props) => {

    const [units, setUnits] = useState([]);
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [unit, setUnit] = useState(null);
    const [budget, setBudget] = useState(null);
    const [project, setProject] = useState(null);
    const [projectItems, setProjectItems] = useState([]);
    const [projectType, setProjectType] = useState(null);
    const [initializations, setInitializations] = useState([]);
    const [initialization, setInitialization] = useState(null);
    const [initializationItems, setInitializationItems] = useState([]);

    useEffect(() => {
        getUnits();
        getProject();
    }, []);

    const getProject = () => {
        props.setRequestGlobalAction(true)
        ProjectService.getProjectById(props.match.params.id)
        .then(response => {
            setProject(response);
            setLabel(response.label);
            setBudget(response.budget);
            setProjectItems(response.items);
        })
        .catch((error) => {
            console.log(error);
            setProject(null);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits()
            .then((response) => {
                setUnits(response);
                setUnit(response[0]);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }  

    const setProjectItemValue = (item, value, subItemId) => {
        let test = projectItems;
        let remaining = test.filter(pi => pi !== item);
        item.value = value;
        setProjectItems([...remaining, item]);
    }
    
    const onSubmit = () => {

        if(!label || !budget || !unit || projectItems.length <= 0) {
            NotificationManager.error('Les informations du projet ne sont pas correctement renseignées');
            return;
        }

        let data: any = {
            label, budget, unitReference: unit.reference,
            item_ids: projectItems.map(pi => pi.id),
            item_values: projectItems.map(pi => pi.value),
            item_positions: projectItems.map(pi => pi.position)
        }

        ProjectService.updateProject(props.match.params.id, data, { fileData: ['document'], multipart: true }).then(() => {
            NotificationManager.success("Le projet a été créé avec succès");
            props.history.push(PROJECT.MINE.FOLDER.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la mise a jour du projet");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })

    }

    return (
        <>
            <PageTitleBar
                title={"Edition de projet"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Titre du projet
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            value={label}
                            className="input-lg"
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </FormGroup>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Besoin estimé
                            </InputLabel>
                            <InputStrap
                                required
                                id="price"
                                type="number"
                                name='price'
                                className="input-lg"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Devise
                            </InputLabel>
                            <Autocomplete
                                value={unit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Document projet
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner le document de votre projet ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>

                    <div className="row mt-5">
                        {
                            project?.items.map((item) => (
                                <PolymorphComponent
                                    isRequired={true}
                                    projectItem={item}
                                    displayAddButton={false}
                                    displayDeleteButton={false}
                                    label={item.projectItem.label}
                                    value={projectItems.find(pi => pi === item)?.value}
                                    componentType={item.projectItem.inputType.toLowerCase()}
                                    handleOnChange={(currentItem, data, subItem) => setProjectItemValue(currentItem, data, subItem)}
                                />
                            ))
                        }
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));