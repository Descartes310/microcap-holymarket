import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { PROJECT } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import UpdateItemModal from './components/updateItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import AddPersonalItemModal from './components/addPersonalItem';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import ProjectDetails from '../../details/components/ProjectDetails';
import UpdateComplexTableModal from './components/updateComplexTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const Update = (props) => {

    const [units, setUnits] = useState([]);
    const [label, setLabel] = useState('');
    const [unit, setUnit] = useState(null);
    const [budget, setBudget] = useState(null);
    const [project, setProject] = useState(null);
    const [projectItems, setProjectItems] = useState([]);
    const [selectedProjectItem, setSelectedProjectItem] = useState(null);
    const [personalProjectItems, setPersonalProjectItems] = useState([]);
    const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
    const [showUpdateTableModal, setShowUpdateTableModal] = useState(false);
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
            setProjectItems(response.items.map(i => {
                return { ...i,  }
            }));
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
        let remaining = test.filter(pi => pi.id !== item.id);
        if(subItemId) {
            let projectItem = test.find(pi => pi.id === item.id);
            let subValue = projectItem.subValues.find(sv => sv.id === subItemId);
            let subValueRemaining = projectItem.subValues.filter(sv => sv.id !== subItemId);
            subValue.value = value;
            projectItem.subValues = [...subValueRemaining, subValue];
            setProjectItems([...remaining, projectItem]);
        } else {
            item.value = value;
            setProjectItems([...remaining, item]);
        }
    }

    const setProjectItemShowable = (item, value) => {
        let test = projectItems;
        let remaining = test.filter(pi => pi !== item);
        item.showable = value;
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
            item_positions: projectItems.map(pi => pi.position),
            item_showables: projectItems.map(pi => pi.showable),
            item_parents: projectItems.map(pi => pi.projectItem.id),
            item_values: JSON.stringify(projectItems.map(pi => pi.value)),
            item_subvalues: JSON.stringify(projectItems.filter(pi => pi.subValues).flatMap(pi => pi.subValues).map(sv => { return { id: sv.id, value: sv.value } }))
        }

        props.setRequestGlobalAction(true);
        ProjectService.updateProject(props.match.params.id, data, { fileData: ['document'], multipart: true }).then(() => {
            NotificationManager.success("Le projet a été créé avec succès");
            props.history.goBack();
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
            value: '', subValues: null, id: -new Date().getTime(), showable: true })
        setProject({...project, items: ordererdItems});
        setProjectItems(ordererdItems);
        setAddPersonalItemModal(false);
    }

    return (
        <div className='row w-100'>
            <PageTitleBar
                title={"Edition de projet"}
                className='col-12'
            />
            <RctCollapsibleCard colClasses="col-md-7">
                <ProjectDetails project={project} />
            </RctCollapsibleCard>
            <RctCollapsibleCard colClasses="col-md-5">
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
                            onChange={(e) => {
                                setLabel(e.target.value);
                                setProject({...project, label: e.target.value});
                            }}
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
                                onChange={(e) => {
                                    setBudget(e.target.value);
                                    setProject({...project, budget: e.target.value});
                                }}
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
                    <div className='mb-40'>
                        <h2 className='font-weight-bold'>
                            Ouvrages du projet
                        </h2>
                        <span>
                            Faites glisser les ouvrages pour changer leur position
                        </span>
                    </div>

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
                                                    <div className='d-flex justify-content-between' style={{ paddingRight: '10%' }}>
                                                        <FormGroup className="col-sm-12 has-wrapper">
                                                            <FormControlLabel control={
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={item.showable}
                                                                    onChange={() => setProjectItemShowable(item, !item.showable)}
                                                                />
                                                            } label={`${item.projectItem.label}`}
                                                            />
                                                        </FormGroup>
                                                        <p 
                                                            className='cursor-pointer'
                                                            onClick={() => {
                                                                setShowUpdateItemModal(true);
                                                                setSelectedProjectItem(item);
                                                            }}
                                                        >
                                                            Editer
                                                        </p>
                                                    </div>
                                                    

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
                            className="text-white mr-20 w-100 font-weight-bold bg-blue mb-2"
                        >
                            Ajouter une rubrique
                        </Button>
                        { project?.tables?.length > 0 && (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setShowUpdateTableModal(true)}
                                className="text-white w-100 font-weight-bold mb-2"
                            >
                                Editer le plan de financement
                            </Button>
                        )}
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white mr-20 w-100 font-weight-bold"
                        >
                            Sauvegarder les changements
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
            <AddPersonalItemModal 
                show={addPersonalItemModal}
                title={'Ajouter un ouvrage personnalisé'}
                items={personalProjectItems}
                onAdd={(itemData) => {
                    addPersonalItem(itemData)
                }}
                onClose={() => {
                    setAddPersonalItemModal(false);
                }}
            />
            { (showUpdateTableModal && project) && (
                <UpdateComplexTableModal 
                    show={showUpdateTableModal}
                    title={'Edition ouvrage personnalisé'}
                    onClose={() => {
                        setShowUpdateTableModal(false);
                    }}
                    projectId={project?.id}
                    tables={project?.tables ? project?.tables : []}
                />
            )}
            { showUpdateItemModal && selectedProjectItem && (
                <UpdateItemModal 
                    item={selectedProjectItem}
                    title={'Editer un ouvrage'}
                    onClose={() => {
                        setShowUpdateItemModal(false);
                        setSelectedProjectItem(null);
                    }}
                    setProjectItemValue={setProjectItemValue}
                    show={showUpdateItemModal && selectedProjectItem}
                />
            )}
        </div>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));