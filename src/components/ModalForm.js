import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalForm = ({header, body, footer, open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {header()}
            </DialogTitle>
            <DialogContent>
                {body()}
            </DialogContent>
            <DialogActions>
                {footer()}
            </DialogActions>
        </Dialog>
    );
};

ModalForm.propTypes = {

};

export default ModalForm;
