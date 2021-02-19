import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {setRequestGlobalAction, createCatalog, getCatalogsOfOneType} from "Actions";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from "react-redux";
import {NETWORK} from "Url/frontendUrl";

// Material
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';

const CatalogCreate = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { authUser, catalog, loading, intl, onClose, show, setRequestGlobalAction, getCatalogsOfOneType } = props;

    const { register, errors, handleSubmit} = useForm();

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};
        _data.typeCatalogName = catalog.value;
        _data.partnerId = authUser.user.id;
        createCatalog(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success(intl.formatMessage({id: 'catalog.create.successText'}));
                getCatalogsOfOneType(catalog.value, authUser.user.branch.id);
                onClose();
            })
            .catch((error) => {
                console.log("error => ", JSON.stringify(error));
                NotificationManager.error(error.message);
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
                        <IntlMessages id={`catalog.create.text`} />
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
                                <InputLabel className="text-left" htmlFor="typeCatalogName">
                                    Type de Catalogue
                                </InputLabel>
                                <InputStrap
                                    disabled
                                    type="text"
                                    className="input-lg"
                                    id="typeCatalogName"
                                    name="typeCatalogName"
                                    value={catalog.displayName}
                                    // placeholder={intl.formatMessage({id: "common.socialReason"})}
                                />
                                <span className="has-icon"><i className="ti-pencil"/></span>
                            </FormGroup>

                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="designation">
                                    <IntlMessages id="branch.field.designation"/>
                                </InputLabel>
                                <InputComponent
                                    id="designation"
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

const mapStateToProps = ({ requestGlobalLoader, authUser}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data};
};

export default connect(mapStateToProps, {getCatalogsOfOneType, setRequestGlobalAction })(injectIntl(CatalogCreate));
