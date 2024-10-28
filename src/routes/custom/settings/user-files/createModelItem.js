import { connect } from 'react-redux';
import { useTheme } from "@material-ui/core";
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
    const [label, setLabel] = useState('');
    const [type, setType] = useState(null);
    const [unique, setUnique] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if(props.item) {
            setLabel(props.item.label);
            setUnique(props.item.unique);
            setType(TYPES.find(t => t.value == props.item.type));
        }
    }, props.item);

    const onSubmit = () => {
        if (!type || !label) {
            NotificationManager.error("Vous devez correctement remplir le formulaire");
            return;
        }
        props.setRequestGlobalAction(true);
        if(props.item) {
            SettingService.updateFileTranscriptionItem(props.item.reference, {label, type: type.value, unique})
            .then(() => {
                NotificationManager.success("La donnée a été éditée avec succès");
                props.onClose();
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
        } else {
            SettingService.createFileTranscriptionItem(props.reference, {label, type: type.value, unique})
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
                                value={type}
                                id="combo-box-demo"
                                options={TYPES}
                                onChange={(__, data) => {
                                    setType(data);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Désignation
                            </InputLabel>
                            <Input
                                required
                                id="label"
                                type="text"
                                name='label'
                                className="input-lg"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-sm-12 has-wrapper">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={unique}
                                    onChange={() => setUnique(!unique)}
                                />
                            } label={'Donnée unique'}
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