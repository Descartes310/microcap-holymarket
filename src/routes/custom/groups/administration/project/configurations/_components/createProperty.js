import { connect } from 'react-redux';
import { GROUP } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import ProjectService from 'Services/projects';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import UpdateComplexTable from 'Components/UpdateComplexTable';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';
import { projectObjectNatures, propertyTypes } from 'Helpers/helpers';

const CreateProperty = (props) => {

    const {show, onClose} = props;
    const [type, setType] = useState(null);
    const [value, setValue] = useState(null);
    const [label, setLabel] = useState(null);
    const [nature, setNature] = useState(null);
    const [objects, setObjects] = useState([]);
    const [object, setObject] = useState(null);
    const [column, setColumn] = useState(null);
    const [property, setProperty] = useState(null);
    const [properties, setProperties] = useState([]);
    const [objectItems, setObjectItems] = useState([]);
    const [selectedCells, setSelectecCells] = useState([]);
    const [objectItemsParsed, setObjectItemsParsed] = useState([]);
    const [objectItemParsed, setObjectItemParsed] = useState(null);

    useEffect(() => {
        getProperties();
    }, []);

    useEffect(() => {
        if(nature) {
            getObjects();
        }
    }, [nature]);

    useEffect(() => {
        if(object) {
            switch (nature.value) {
                case 'PROJECT':
                    getProjectItems();
                    break;
            
                default:
                    break;
            }
        }
    }, [object]);

    const getObjects = () => {
        switch (nature.value) {
            case 'PROJECT':
                getProjects();
                break;
        
            default:
                break;
        }
    }

    const getProperties = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getAttributeProperties({ attribute_reference: props.match.params.id }).then(response => {
            setProperties(response);
        }).catch((error) => {
            console.log(error);
            props.history.push(GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.ATTRIBUTE.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProjects = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getGroupProjects().then(response => {
            setObjects(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProjectItems = () => {
        props.setRequestGlobalAction(true);
        ProjectService.getProjectById(object.id).then(response => {
            setObjectItems(response.items);
            setObjectItemsParsed([...response.items.map(i => {
                return {
                    label: i.projectItem.label,
                    id: i.id,
                    type: 'SIMPLE'
                }
            }), ...response.tables.map(i => {
                return {
                    label: i.label,
                    id: i.id,
                    type: 'TABLE'
                }
            })]);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!object || !value) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data = {
            value, type: type.value, label,
            attribute_reference: props.attribute.reference
        }

        if(nature.value == 'PROJECT') {
            if(selectedCells.length > 0) {
                data.object_type = 'TABLE_CELL';
                data.object_reference = "";
                selectedCells.forEach(cell => {
                    data.object_reference = data.object_reference + "("+object.reference+", "+cell.type+", "+cell.row+", "+cell.column+", "+cell.position+");";
                });
            } else {
                data.object_type = 'PROJECT_ITEM';
                data.object_reference = objectItemParsed.id+"";
            }
            data.source_reference = object.reference;
        }

        if(property) {
            if(property.value != -1) {
                data.property_reference = property.reference;
            }
        }

        if(column) {
            if(column.value != -1) {
                data.column_reference = column.reference;
            }
        }

        console.log(data);

        props.setRequestGlobalAction(true);
        ProjectService.createProperty(data).then(() => {
            NotificationManager.success('La propriété a été créée avec succès');
        }).catch((error) => {
            console.log(error);
            NotificationManager.error('Une erreur est survenue');
        }).finally(() => {
            props.setRequestGlobalAction(false);
            props.onClose();
        })

    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer une nouvelle propriété ({props.attribute.label})
                </h3>
            )}
        >
            <RctCardContent>
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Propriété parent
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={property}
                        options={[{label: "Aucun parent", value: -1}, ...properties]}
                        onChange={(__, item) => {
                            setProperty(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Propriété colonne
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={column}
                        options={[{label: "Aucune colonne", value: -1}, ...properties]}
                        onChange={(__, item) => {
                            setColumn(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Nature d'objets système
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={nature}
                        options={projectObjectNatures()}
                        onChange={(__, item) => {
                            setNature(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                {
                    nature && (
                        <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                            <InputLabel className="text-left">
                                Objets système
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={object}
                                options={objects}
                                onChange={(__, item) => {
                                    setObject(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )
                }
                {
                    object && (
                        <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                            <InputLabel className="text-left">
                                Sous objets système
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={objectItemParsed}
                                options={objectItemsParsed}
                                onChange={(__, item) => {
                                    setObjectItemParsed(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )
                }
                {
                    objectItemParsed && (
                        objectItemParsed.type == 'TABLE' && (
                            <>
                                <p>NB: Si aucune cellule n'est sélectionnée, le tableau entier va être enregistré</p>
                                <UpdateComplexTable 
                                    projectId={object.id} 
                                    id={objectItemParsed.id} 
                                    editMode={false} 
                                    selectable={true}
                                    selectedCells={selectedCells}
                                    onSelected={(cell) => {
                                        let selected = selectedCells.filter(sc => sc.row == cell.row && sc.column == cell.column && sc.position == cell.position && sc.type == cell.type);
                                        if(selected.length > 0) {
                                            setSelectecCells([...selectedCells.filter(sc => sc.row != selected[0].row || sc.column != selected[0].column || sc.position != selected[0].position || sc.type != selected[0].type)]);
                                        } else {
                                            setSelectecCells([cell]);
                                        }
                                    }}
                                />
                            </>
                        )
                    )
                }
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Type de la propriété
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={type}
                        options={propertyTypes()}
                        onChange={(__, item) => {
                            setType(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Désignation
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
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="value">
                        Valeur
                    </InputLabel>
                    <InputStrap
                        required
                        id="value"
                        type="text"
                        name='value'
                        value={value}
                        className="input-lg"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateProperty));