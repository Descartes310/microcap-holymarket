import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, withStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import {createUsersAccounts, getUsersAccounts, setRequestGlobalAction} from "Actions";
import {ERROR_500} from "Constants/errors";

const UsersAccountsCreate = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const {authUser, onClose, show, loading, setRequestGlobalAction, getUsersAccounts } = props;

    const { register, errors, handleSubmit } = useForm();

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        data.branchId = authUser.branchId;
        createUsersAccounts(data)
            .then(() => {
                NotificationManager.success("Compte utilisateur créée avec succès");
                getUsersAccounts(authUser.user.branch.id);
                onClose();
            })
            .catch((error) => {
                NotificationManager.error(ERROR_500);
                console.log("error => ", error);
            })
            .finally(() => setRequestGlobalAction(false));
    };

    return (
        <>
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
                        Ajouter nouveau
                        <IconButton
                            color="primary"
                            aria-label="close"
                            className="text-danger"
                            // onClick={() => this.setState({showCreateBox: false})}>
                            onClick={loading ? null : onClose}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <RctCollapsibleCard>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-100">
                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="name">
                                        Nom
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        id="name"
                                        errors={errors}
                                        register={register}
                                        name={'label'}
                                        className="input-lg"
                                    />
                                    <span className="has-icon"><i className="ti-pencil"></i></span>
                                </FormGroup>

                                <FormGroup className="has-wrapper">
                                    <InputLabel className="text-left" htmlFor="description">
                                        Description
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        id="description"
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        name={'description'}
                                    />
                                    <span className="has-icon"><i className="ti-pencil"></i></span>
                                </FormGroup>
                            </div>

                            <FormGroup className="mb-15">
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    variant="contained"
                                    className="text-white font-weight-bold mr-3"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Ajouter
                                </Button>
                            </FormGroup>
                        </Form>
                    </RctCollapsibleCard>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser,}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data};
};


const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    /*menuButton: {
        marginRight: theme.spacing(2),
    },*/
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


export default connect(mapStateToProps, {getUsersAccounts, setRequestGlobalAction })
(withStyles(useStyles, { withTheme: true })(injectIntl(UsersAccountsCreate)));
