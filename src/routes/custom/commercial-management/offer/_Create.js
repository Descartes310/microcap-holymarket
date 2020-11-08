import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {getComOffer, setRequestGlobalAction, getUserPermissions, createOffer} from "Actions";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from "react-redux";

// Material
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, withStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import {getComOperationType, createComOperationType} from "Actions";
import {ERROR_500} from "Constants/errors";

const Create = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { authUser, loading, intl, onClose, show, setRequestGlobalAction, getComOperationType, getComOffer } = props;

    const { register, errors, handleSubmit } = useForm();

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};

        createOffer(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Offre commerciale créée avec succès");
                getComOffer(authUser.user.branch.id);
                onClose();
            })
            .catch((error) => {
                console.log("error => ", JSON.stringify(error));
                NotificationManager.error(ERROR_500);
                // console.log("error => ", error.message);
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
                        Creation d'une catégorie de produit
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
                    <RctCollapsibleCard>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="label">
                                    Désignation
                                </InputLabel>
                                <InputComponent
                                    id="label"
                                    isRequired
                                    errors={errors}
                                    register={register}
                                    name={'label'}
                                    className="input-lg"
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                />
                                <span className="has-icon"><i className="ti-pencil"/></span>
                            </FormGroup>

                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="description">
                                    <IntlMessages id="widgets.description"/>
                                </InputLabel>
                                <InputComponent
                                    id="description"
                                    isRequired
                                    errors={errors}
                                    register={register}
                                    name={'description'}
                                    className="input-lg"
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                />
                                <span className="has-icon"><i className="ti-pencil"/></span>
                            </FormGroup>

                            <FormGroup className="mb-15">
                                <Button
                                    // type="submit"
                                    color="primary"
                                    disabled={loading}
                                    variant="contained"
                                    className="text-white font-weight-bold mr-3"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    <IntlMessages id="button.submit" />
                                </Button>
                            </FormGroup>
                        </Form>
                    </RctCollapsibleCard>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, userPermissions}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, userPermissions: userPermissions};
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


export default connect(mapStateToProps, {getComOffer, getComOperationType, getUserPermissions, setRequestGlobalAction })
(withStyles(useStyles, { withTheme: true })(injectIntl(Create)));
