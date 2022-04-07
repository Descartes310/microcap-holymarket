import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { PROJECT } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import AddPersonalItemModal from './addPersonalItem';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PolymorphComponent from 'Components/PolymorphComponent';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const Update = (props) => {

    const [units, setUnits] = useState([]);
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [unit, setUnit] = useState(null);
    const [budget, setBudget] = useState(null);
    const [project, setProject] = useState(null);
    const [projectItems, setProjectItems] = useState([]);
    const [personalProjectItems, setPersonalProjectItems] = useState([]);
    const [addPersonalItemModal, setAddPersonalItemModal] = useState(false);

    useEffect(() => {
        getUnits();
        getProject();
        getProjectItems();
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

    const getProjectItems = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectMyItems()
            .then((response) => setPersonalProjectItems(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
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
            item_ids: projectItems.map(pi => pi.id),
            label, budget, unitReference: unit.reference,
            item_values: projectItems.map(pi => pi.value),
            item_positions: projectItems.map(pi => pi.position),
            item_parents: projectItems.map(pi => pi.projectItem.id)
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

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            projectItems.sort((a, b) => a.position < b.position ? 1 : 0),
            result.source.index,
            result.destination.index
        );

        let ordererdItems = [];

        for (let index = 0; index < items.length; index++) {
            const element: any = items[index];
            element.position = index+1;
            ordererdItems.push(element);
        }
            
        setProjectItems(ordererdItems);
        setProject({...project, items: ordererdItems});
    }

    const addPersonalItem = (itemData) => {
        let ordererdItems = projectItems;
        ordererdItems.push({projectItem: itemData.item, position: projectItems.length+1, 
            value: '', subValues: null, id: -new Date().getTime() })
        setProject({...project, items: ordererdItems});
        setAddPersonalItemModal(false);
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

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div provided={provided} ref={provided.innerRef} {...provided.droppableProps}>
                                    { project?.items.sort((a, b) => a.position < b.position).map((item, index) => (
                                        <Draggable key={item.id+"-id"} draggableId={item.id+"-id"} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    provided={provided}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
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
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setAddPersonalItemModal(true)}
                            className="text-white mr-20 font-weight-bold bg-blue"
                        >
                            Ajouter une idée personnelle
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Editer le projet
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
            <AddPersonalItemModal 
                show={addPersonalItemModal}
                title={'Ajouter un ouvrage personnalisé'}
                items={personalProjectItems}
                onAdd={(itemData) => addPersonalItem(itemData)}
                onClose={() => {
                    setAddPersonalItemModal(false);
                }}
            />
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));