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
            setValues(response.map(i => { return {reference: i.reference, value: defaultValues.find(v => v.reference == i.reference) ? defaultValues.find(v => v.reference == i.reference)?.value : ''}}))
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(!model) {
            NotificationManager.error("Veuillez bien remplir le formulaire");
            return
        }
        const references = values.map(v => v.reference).join(",");
        const datas = values.map(v => v.value);

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

                { items.map((item, index) => (
                    <FormGroup key={index} className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            {item.label}
                        </InputLabel>
                        <InputStrap
                            required
                            id={"label"}
                            name={'label'}
                            className="input-lg"
                            type={item.type.toLowerCase()}
                            value={values.find(v => v.reference == item.reference)?.value}
                            onChange={(e) => setValues([...values.filter(v => v.reference != item.reference), {reference: item.reference, value: e.target.value}])}
                        />
                    </FormGroup>
                ))}
                
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