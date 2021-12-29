import React, { useState } from 'react';
import { withStyles } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Form, FormGroup, Input as InputStrap } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import ProfileService from 'Services/profileService';
import { setRequestGlobalAction } from "Actions";
import {NotificationManager} from "react-notifications";
import { useSelector, useDispatch } from 'react-redux';

type Props = {
    show: boolean,
    onClose: () => void
}

const AddProfileBox = ({show, onClose}: Props) => {

    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [permissions, setPermissions] = useState([1]);

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(setRequestGlobalAction(true));
        const formData = new FormData();
        ProfileService.postProfile({ label, description, permissions })
        .then(() => NotificationManager.success('Profile créé avec succès !'))
        .catch(() => NotificationManager.error("Une erreur est survenue lors de l'opération !"))
        .finally(() => {
            dispatch(setRequestGlobalAction(false))
            onClose();
        });
    }

    return (
        <Dialog
            open={show}
            onClose={() => onClose()}
            aria-labelledby="responsive-dialog-title"
            maxWidth={'md'}
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Ajouter un profile
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={() => onClose()}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="row">
                    <div className="col-md-12">
                        <Form onSubmit={onSubmit}>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="label">
                                    Label
                                </InputLabel>
                                <InputStrap
                                    required
                                    id="label"
                                    type="text"
                                    name='label'
                                    className="input-lg"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="description">
                                    Description
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="textarea"
                                    id="description"
                                    name="description"
                                    className="input-lg"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="primary"
                                    disabled={!label || !description}
                                    variant="contained"
                                    onClick={onSubmit}
                                    className="text-white font-weight-bold"
                                >
                                    Ajouter
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};


const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});


export default withStyles(styles, { withTheme: true }) (AddProfileBox);
