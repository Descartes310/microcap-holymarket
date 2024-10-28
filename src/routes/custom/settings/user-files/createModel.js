import { connect } from 'react-redux';
import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import SettingService from "Services/settings";
import {setRequestGlobalAction} from 'Actions';
import React, { useEffect, useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form, FormGroup, Input } from 'reactstrap';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const CreateFileModel = (props) => {

    const theme = useTheme();
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if(props.model) {
            setLabel(props.model.label);
            setDescription(props.model.description);
        }
    }, props.model);

    const onSubmit = () => {
        if (!label) {
            NotificationManager.error("Vous devez correctement remplir le formulaire");
            return;
        }

        let data = {label};
        if(description) data.description = description;

        props.setRequestGlobalAction(true);
        if(props.model) {
            SettingService.updateFileTranscriptionModel(props.model.reference, data)
            .then(() => {
                NotificationManager.success("Le modèle a été édité avec succès");
                props.onClose();
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue, veuillez reessayer plus tard");
            })
            .finally(() => props.setRequestGlobalAction(false))
        } else {
            SettingService.createFileTranscriptionModel(props.reference, {label})
            .then(() => {
                NotificationManager.success("Le modèle a été crée avec succès");
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
                    Ajouter un modèle
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
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Désignation
                            </InputLabel>
                            <Input
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
                            <InputLabel className="text-left" htmlFor="description">
                                Description
                            </InputLabel>
                            <Input
                                id="description"
                                type="text"
                                name='description'
                                className="input-lg"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateFileModel));