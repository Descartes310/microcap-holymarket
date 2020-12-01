import React from 'react';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from "@material-ui/icons/Cancel";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

const DialogComponent = ({show, title, onClose, ...restProps}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            open={show}
            onClose={onClose}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth={'lg'}
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    {title}
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        // onClick={() => this.setState({showCreateBox: false})}>
                        onClick={onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {restProps.children}
            </DialogContent>
        </Dialog>
    );
};

DialogComponent.propTypes = {

};

export default DialogComponent;
