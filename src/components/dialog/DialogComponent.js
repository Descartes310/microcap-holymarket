import React from 'react';
import PropTypes from 'prop-types';
import CancelIcon from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog/Dialog";
import IconButton from "@material-ui/core/IconButton";
import useTheme from "@material-ui/core/styles/useTheme";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const DialogComponent = ({show, title, size = 'lg', onClose, className, ...restProps}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullWidth
            open={show}
            maxWidth={size}
            onClose={onClose}
            disableBackdropClick
            disableEscapeKeyDown
            className={className}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    {title}
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
                {restProps.children}
            </DialogContent>
        </Dialog>
    );
};

DialogComponent.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool.isRequired,
    title: PropTypes.any.isRequired,
};

export default DialogComponent;
