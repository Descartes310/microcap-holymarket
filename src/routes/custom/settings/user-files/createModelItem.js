import { connect } from 'react-redux';
import { useTheme } from "@material-ui/core";
import SystemService from "Services/systems";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import SettingService from "Services/settings";
import {setRequestGlobalAction} from 'Actions';
import React, { useState, useEffect } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form, FormGroup, Input } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from "react-notifications";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const TYPES = [{
        label: "Texte",
        value: 'TEXT'
    },{
        label: "Date",
        value: 'DATE'
    },{
        label: "Numéro",
        value: 'NUMBER'
    }
]
const CreateFileItem = (props) => {

    const theme = useTheme();
    const [input, setInput] = useState(null);
    const [inputs, setInputs] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        getGlobalDataInputs();
    }, []);

    const getGlobalDataInputs = () => {
        props.setRequestGlobalAction(true);
        SystemService.getGlobalDataInputs().then((data) => {
            setInputs(data);
        })
        .catch(() => {
            setInputs([]);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    useEffect(() => {
        if(props.item) {
            setInput(props.item.userDataItem);
            setUpdateData(props.item.updateAssociatedInput);
            setType(TYPES.find(t => t.value == props.item.type));
        }
    }, props.item);

    const onSubmit = () => {
        if (!input) {
            NotificationManager.error("Vous devez correctement remplir le formulaire");
            return;
        }
        props.setRequestGlobalAction(true);
        if(props.item) {
            SettingService.updateFileTranscriptionItem(props.item.reference, {user_data_code: input.code, update_associated_input: updateData})
            .then(() => {
                NotificationManager.success("La donnée a été éditée avec succès");
                props.onClose();
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
        } else {
            SettingService.createFileTranscriptionItem(props.reference, {user_data_code: input.code, update_associated_input: updateData})
            .then(() => {
                NotificationManager.success("La donnée a été créee avec succès");
                props.onClose();
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={props.show}
            disableBackdropClick
            disableEscapeKeyDown
            fullScreen={fullScreen}
            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Ajouter un donnée
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={props.onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit}>
                    <div className="w-100">

                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Type de donnée
                            </InputLabel>
                            <Autocomplete
                                value={input}
                                id="combo-box-demo"
                                options={inputs}
                                onChange={(__, data) => {
                                    setInput(data);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <FormGroup className="col-sm-12 has-wrapper">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={updateData}
                                    onChange={() => setUpdateData(!updateData)}
                                />
                            } label={'Editer la donnée utilisateur'}
                            />
                        </FormGroup>

                        <FormGroup className="mb-15">
                            <Button
                                color="primary"
                                onClick={onSubmit}
                                variant="contained"
                                className="text-white font-weight-bold mr-3"
                            >
                                Enregistrer
                            </Button>
                        </FormGroup>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateFileItem));