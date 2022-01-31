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

const Create = (props) => {

    const [units, setUnits] = useState([]);
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [unit, setUnit] = useState(null);
    const [budget, setBudget] = useState(null);
    const [typeUnits, setTypeUnits] = useState([]);
    const [typeUnit, setTypeUnit] = useState(null);
    const [projectItems, setProjectItems] = useState([]);
    const [projectType, setProjectType] = useState(null);
    const [initializations, setInitializations] = useState([]);
    const [initialization, setInitialization] = useState(null);
    const [initializationItems, setInitializationItems] = useState([]);

    useEffect(() => {
        getUnits();
        getTypeUnits();
    }, []);

    useEffect(() => {
        if(projectType) {
            getInitializations();
        } else {
            setInitializations([]);
            setInitialization(null);
        }
    }, [projectType]);

    useEffect(() => {
        if(initialization)
            getInitializationItems();
        else
            setInitializationItems([]);
    }, [initialization]);

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits()
            .then((response) => setUnits(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const getTypeUnits = () => {
        props.setRequestGlobalAction(true);
        UnitService.getTypeUnits()
            .then((response) => setTypeUnits(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const getInitializations = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectInitializations({ type: projectType.value })
            .then((response) => setInitializations(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }    

    const getInitializationItems = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectInitializationItems(initialization.id)
            .then((response) => {
                setInitializationItems(response);
                setProjectItems(response.map(ii => { return { item: ii, value: null, id: new Date().getTime() } }))
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const addInitializationItem = (item) => {
        const occurences = projectItems.filter(ii => ii.item === item);
        if((occurences.length + 1) > item.maximumOccurence){
            NotificationManager.error('Vous avez atteint le nombre limite d\'occurences');
            return;
        }
        setProjectItems([...projectItems, {item, value: '', id: new Date().getTime()}]);
    }

    const deleteInitializationItem = (item) => {
        const occurences = projectItems.filter(ii => ii.item === item);
        if(occurences.length == 1){
            NotificationManager.error('Vous avez atteint le nombre minimum d\'occurences');
            return;
        }
        setProjectItems([...projectItems.filter(pi => pi !== item)]);
    }

    const getProjectItemValue = (item) => {
       let pi = projectItems.find(pi => pi === item);
       return pi.value;
    }

    const setProjectItemValue = (item, value) => {
        let existingItem = projectItems.find(pi => pi === item);
        existingItem.value = value;
        setProjectItems([...projectItems.filter(pi => pi !== item), existingItem]);
    }

    const checkProjectItemsValidity = () => {
        for (let index = 0; index < initializationItems.length; index++) {
            const initItem = initializationItems[index];
            const occurences = projectItems.filter(pi => pi.item === initItem && (pi.value !== '' || pi.value !== null));
            console.log(occurences);
            if(occurences.length > initItem.maximumOccurence) {
                NotificationManager.error('Les informations du projet ne sont pas correctement renseignées');
                return false;
            }
            if(occurences.length === 0 && initItem.mandatory) {
                NotificationManager.error('Les informations du projet ne sont pas correctement renseignées');
                return false;
            }
        }
        return true;
    }

    const getOccurence = (item) => {
        const occurences = projectItems.filter(ii => ii.item === item);
        return occurences.length;
    }
    
    const onSubmit = () => {
        if(!checkProjectItemsValidity())
            return;

        if(!label || !budget || !unit || projectItems.length <= 0) {
            NotificationManager.error('Les informations du projet ne sont pas correctement renseignées');
            return;
        }

        let data: any = {
            label, budget, unitReference: unit.reference, document: file,
            initializationId: initialization.id,
            initializationItems: projectItems.map(pi => pi.item.id),
            initializationValues: projectItems.map(pi => pi.value)
        }
        console.log(data);
        ProjectService.createProject(data, { fileData: ['document'], multipart: true }).then(() => {
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
                title={"Création de projet"}
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Type devise
                            </InputLabel>
                            <Autocomplete
                                options={typeUnits}
                                value={typeUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setTypeUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
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
                                options={units.filter(u => u.type.id === typeUnit?.id)}
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

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Type
                            </InputLabel>
                            <Autocomplete
                                options={getInitializationTypes()}
                                value={projectType}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setProjectType(item)
                                }}
                                getOptionLabel={(option) => option.text}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Options d'initialisations
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
                    </div>

                    <div className="row">
                        {
                            projectItems.sort((a, b) => a.item.label.localeCompare(b.item.label) || a.id - b.id).map((projectItem) => (
                                <PolymorphComponent
                                    label={projectItem.item.label}
                                    isRequired={projectItem.item.mandatory}
                                    value={getProjectItemValue(projectItem)}
                                    displayDeleteButton={getOccurence(projectItem.item) > 1}
                                    componentType={projectItem.item.inputType.toLowerCase()}
                                    handleOnChange={(data) => setProjectItemValue(projectItem, data)}
                                    addInitializationItem={() => addInitializationItem(projectItem.item)}
                                    deleteInitializationItem={() => deleteInitializationItem(projectItem)}
                                    displayAddButton={projectItem.item.maximumOccurence > 1 && getOccurence(projectItem.item) < projectItem.item.maximumOccurence}
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));