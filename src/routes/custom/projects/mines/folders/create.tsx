import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { PROJECT } from 'Url/frontendUrl';
import GroupService from 'Services/groups';
import { projectTypes } from 'Helpers/datas';
import TerritoryType from "Enums/Territories";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import IconButton from "@material-ui/core/IconButton";
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
    const [type, setType] = useState(null);
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [unit, setUnit] = useState(null);
    const [budget, setBudget] = useState(null);
    const [country, setCountry] = useState(null);
    const [countries, setCountries] = useState([]);
    const [juridicForms, setJuridicForms] = useState([]);
    const [juridicForm, setJuridicForm] = useState(null);
    const [projectItems, setProjectItems] = useState([]);
    const [projectType, setProjectType] = useState(null);
    const [initializations, setInitializations] = useState([]);
    const [initialization, setInitialization] = useState(null);
    const [initializationItems, setInitializationItems] = useState([]);

    useEffect(() => {
        getUnits();
        getCountries();
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

    useEffect(() => {
        if(country) {
            getJuridicForms();;
        }
    }, [country]);

    const getJuridicForms = () => {
        GroupService.getJuridicTypes({territory: country.reference})
        .then(response => setJuridicForms(response))
    }

    const getCountries = () => {
        TerritoryService.getTerritories(TerritoryType.COUNTRY)
        .then(countries => {
            setCountries(countries);
        })
        .catch(error => {
            setCountries([]);
            NotificationManager.error("An error occur " + error);
        });
    };

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
                setProjectItems(response.filter(pi => pi.complexType !== 'TABLE').map(ii => { return { item: ii, value: null, id: new Date().getTime()+'-'+ii.inputType+'-'+ii.id, projectItemId: null } }))
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
        setProjectItems([...projectItems, {item, value: '', id: new Date().getTime()+'-'+item.inputType+'-'+item.id, projectItemId: null}]);
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

    const setProjectItemValue = (item, value, subItemId) => {
        let test = projectItems;
        let existingItem = test.find(pi => pi.id === item.id && pi.projectItemId === subItemId);
        if(!existingItem) {
            existingItem = {};
            existingItem.item = item.item;
            existingItem.id = item.id;
        }
        if(item.id.includes('COMPLEX'))
            existingItem.projectItemId = subItemId;
        existingItem.value = value;
        let currentItems = test.filter(pi => pi.id !== item.id || pi.projectItemId !== subItemId );
        //.filter(pi => (pi.id !== item.id || pi.id !== item.id ) && pi.projectItemId !== null))
        if(item.item.inputType === 'COMPLEX') {
            setProjectItems([...currentItems, existingItem]);
        } else {
            setProjectItems([...currentItems, existingItem]);
        }
    }

    const checkProjectItemsValidity = () => {
        let initItems = initializationItems.filter(ii => ii.complexType !== 'TABLE');
        for (let index = 0; index < initItems.length; index++) {
            const initItem = initItems[index];
            const occurences = projectItems.filter(pi => pi.item === initItem && pi.value != null);
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
        const occurences = projectItems.filter(ii => ii.item === item && item.inputType !== 'COMPLEX');
        return occurences.length;
    }
    
    const onSubmit = () => {

        let items = projectItems.filter(pi => pi.value != null);
        
        if(!label || !budget || !unit || items.length <= 0) {
            NotificationManager.error('Les informations du projet ne sont pas correctement renseignées');
            return;
        }

        let data: any = {
            initializationId: initialization.id,
            label, budget, unitReference: unit.reference, document: file,
            initializationParents: JSON.stringify(items.filter(pi => pi.item.complexType !== 'TABLE').map(pi => pi.id)),
            initializationValues: JSON.stringify(items.filter(pi => pi.item.complexType !== 'TABLE').map(pi => pi.value)),
            initializationItems: items.map(pi => pi.projectItemId ? pi.projectItemId : pi.item.id)
        }

        props.setRequestGlobalAction(true);
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
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Financement estimé
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

                    <div className="row">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Type de projet
                            </InputLabel>
                            <Autocomplete
                                value={type}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={projectTypes()}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                        <InputLabel className="text-left">
                            Lieu d'implantantion
                        </InputLabel>
                        <Autocomplete
                            value={country}
                            options={countries}
                            id="combo-box-demo"
                            classes={{ paper: 'custom-input' }}
                            getOptionLabel={(option) => option.label}
                            onChange={(__, items) => { setCountry(items) }}
                            renderTags={options => {
                                return (
                                    options.map(option =>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                            <IconButton color="primary">
                                                <img src={option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }}/>
                                            </IconButton>
                                            {option.label}
                                        </div>
                                    )
                                )
                        
                            }}
                            renderOption={option => {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'  }}>
                                        <IconButton color="primary">
                                            <img src={option.details.find(d => d.code === 'FLAG')?.value} style={{ width: 25, height: 15 }} />
                                        </IconButton>
                                        {option.label}
                                    </div>
                                );
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Forme juridique
                            </InputLabel>
                            <Autocomplete
                                value={juridicForm}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setJuridicForm(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={juridicForms}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

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
                            Array.from(new Set(projectItems.map(a => a.id))).map(id => {
                              return projectItems.find(a => a.id === id)
                            }).sort((a, b) => a.item.label.localeCompare(b.item.label) || a.id - b.id).map((projectItem) => (
                                <PolymorphComponent
                                    projectItem={projectItem}
                                    label={projectItem.item.label}
                                    isRequired={projectItem.item.mandatory}
                                    value={getProjectItemValue(projectItem)}
                                    displayDeleteButton={getOccurence(projectItem.item) > 1}
                                    componentType={projectItem.item.inputType.toLowerCase()}
                                    addInitializationItem={() => addInitializationItem(projectItem.item)}
                                    deleteInitializationItem={() => deleteInitializationItem(projectItem)}
                                    handleOnChange={(currentItem, data, subItem) => setProjectItemValue(currentItem, data, subItem)}
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