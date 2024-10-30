import _ from 'lodash';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useTheme } from "@material-ui/core";
import { Form, FormGroup } from 'reactstrap';
import Button from "@material-ui/core/Button";
import UserSelect from 'Components/UserSelect';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { NotificationManager } from "react-notifications";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const AddProductToDiscount = ({ show, onSave, onClose }) => {

    const theme = useTheme();
    const [member, setMember] = useState(null);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { handleSubmit } = useForm();

    const onSubmit = () => {
        if (!member) {
            NotificationManager.error("Vous devez choisir un participant");
            return;
        }
        onSave(member);
        setMember(null);
    };

    return (
        <Dialog
            fullWidth
            open={show}
            maxWidth={'md'}
            onClose={onClose}
            disableBackdropClick
            disableEscapeKeyDown
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Ajouter des participants
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Form onSubmit={onSubmit}>
                    <div className="w-100">
                        <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                            setMember(user)
                        }}/>
                    </div>

                    <FormGroup className="mb-15">
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold mr-3"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductToDiscount;