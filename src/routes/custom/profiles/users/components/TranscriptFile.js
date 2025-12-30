import { connect } from 'react-redux';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const TranscriptFile = (props) => {

    const {show, onClose, file} = props;
    const [items, setItems] = useState([]);
    const [values, setValues] = useState([]);
    const [models, setModels] = useState([]);
    const [model, setModel] = useState(null);
    const [defaultValues, setDefaultValues] = useState([]);

    useEffect(() => {
        if(file) {
            getFileTranscriotions();
        }
    }, [file]);

    const getFileModels = () => {
        props.setRequestGlobalAction(true),
        SettingService.getFileModels(file.source)
        .then(response => setModels(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getFileTranscriotions = () => {
        props.setRequestGlobalAction(true),
        UserService.getFileTranscription(file.reference)
        .then(response => {
            setDefaultValues(response.map(i => { return {reference: i.fileTranscriptionItem.reference, value: i.value}}));
            getFileModels();
        })
        .catch(() => {
            NotificationManager.error("La pièce n'a pas été retrouvée");
            onClose();
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    useEffect(() => {
        if(model) {
            getFileModelItems();
        }
    }, [model]);

    const getFileModelItems = () => {
        props.setRequestGlobalAction(true),
        SettingService.getFileItems(model.reference)
        .then(response => {
            setItems(response);
            setValues(response.map(i => {
                const existingValue = defaultValues.find(v => v.reference == i.reference);
                const valueArray = existingValue && existingValue.value 
                    ? existingValue.value.split('::').filter(v => v !== '')
                    : [''];
                
                return {
                    reference: i.reference,
                    values: valueArray.length > 0 ? valueArray : ['']
                }
            }))
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const updateItemValue = (itemReference, index, newValue) => {
        setValues(prevValues => {
            return prevValues.map(v => {
                if (v.reference === itemReference) {
                    const newValues = [...v.values];
                    newValues[index] = newValue;
                    return { ...v, values: newValues };
                }
                return v;
            });
        });
    }

    const addItemValue = (itemReference) => {
        setValues(prevValues => {
            return prevValues.map(v => {
                if (v.reference === itemReference) {
                    return { ...v, values: [...v.values, ''] };
                }
                return v;
            });
        });
    }

    const removeItemValue = (itemReference, index) => {
        setValues(prevValues => {
            return prevValues.map(v => {
                if (v.reference === itemReference) {
                    if (v.values.length > 1) {
                        const newValues = v.values.filter((_, i) => i !== index);
                        return { ...v, values: newValues };
                    }
                }
                return v;
            });
        });
    }

    const onSubmit = () => {
        if(!model) {
            NotificationManager.error("Veuillez bien remplir le formulaire");
            return
        }
        const references = values.map(v => v.reference).join(",");
        const datas = values.map(v => v.values.join("::"));

        props.setRequestGlobalAction(true),
        UserService.createFileTranscription(file.reference, {item_values: datas, item_references: references})
        .then(() => {
            NotificationManager.success("La transcription a été enregistrée avec succès");
            onClose();
        })
        .catch(() => {
            NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={() => onClose(false)}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Transcrire la pièce
                </h3>
            )}
        >
            <RctCardContent>
                <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                    <InputLabel className="text-left">
                        Sélectionner le modèle
                    </InputLabel>
                    <Autocomplete
                        value={model}
                        options={models}
                        id="combo-box-demo"
                        classes={{ paper: 'custom-input' }}
                        getOptionLabel={(option) => option.label}
                        onChange={(__, item) => { setModel(item) }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>

                { items.map((item, itemIndex) => {
                    const itemValues = values.find(v => v.reference == item.reference)?.values || [''];
                    const isUnique = item.userDataItem.unique;

                    return (
                        <div key={itemIndex} className="mb-20">
                            <InputLabel className="text-left">
                                {item.userDataItem.label}
                            </InputLabel>
                            
                            {itemValues.map((value, valueIndex) => (
                                <FormGroup key={valueIndex} className="has-wrapper d-flex align-items-center">
                                    <div style={{ flex: 1 }}>
                                        <InputStrap
                                            required
                                            id={`${item.reference}-${valueIndex}`}
                                            name={`${item.reference}-${valueIndex}`}
                                            className="input-lg"
                                            type={item.userDataItem.type.toLowerCase()}
                                            value={value}
                                            onChange={(e) => updateItemValue(item.reference, valueIndex, e.target.value)}
                                        />
                                    </div>
                                    
                                    {!isUnique && (
                                        <div className="ml-2 d-flex">
                                            {itemValues.length > 1 && (
                                                <IconButton
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => removeItemValue(item.reference, valueIndex)}
                                                    title="Supprimer"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                            {valueIndex === itemValues.length - 1 && (
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => addItemValue(item.reference)}
                                                    title="Ajouter"
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            )}
                                        </div>
                                    )}
                                </FormGroup>
                            ))}
                        </div>
                    );
                })}
                
                <Button
                    color="primary"
                    disabled={!model}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(TranscriptFile));