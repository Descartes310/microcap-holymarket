import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {setRequestGlobalAction, getUserPermissions} from "Actions";
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
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import {createCommunityNonConventionated, getUserCommunities} from "Actions";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

const CommunityCreate = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { classes, getUserCommunities, authUser, loading, intl, onClose, show, setRequestGlobalAction } = props;

    const { control, register, errors, handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            isPrivate: false,
            isVisible: false,
            isActive: false,
        }
    });

    const isPrivateWatch = watch('isPrivate');
    const isVisibleWatch = watch('iVisible');
    const isActiveWatch = watch('iActive');

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);
        
        console.log('Create Group', authUser.user.id)

        createCommunityNonConventionated(data, authUser.branchId, authUser.user.id)
            .then(() => {
                NotificationManager.success("Communauté créée avec succès");
                getUserCommunities();
                onClose();
            })
            .catch((error) => {
                console.log("error => ", JSON.stringify(error));
                NotificationManager.error("Une erreur est survenue");
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
                        Creation d'une communauté
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
                                <InputLabel className="text-left" htmlFor="name">
                                    Nom de la communauté
                                </InputLabel>
                                <InputComponent
                                    id="name"
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
                                    Description
                                </InputLabel>
                                <InputComponent
                                    id="description"
                                    errors={errors}
                                    register={register}
                                    name={'description'}
                                    className="input-lg"
                                    // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                />
                                <span className="has-icon"><i className="ti-pencil"/></span>
                            </FormGroup>

                            <div className="row">
                                <div className="col-md-4 col-sm-12">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="isPrivate"
                                        name={'isPrivate'}
                                        // defaultValue={data[0]}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={isPrivateWatch}
                                                onChange={() => setValue('isPrivate', !isPrivateWatch)}
                                            />
                                        } label={"Communauté privée ?"}
                                        />}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="isVisible"
                                        name={'isVisible'}
                                        // defaultValue={data[0]}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={isVisibleWatch}
                                                onChange={() => setValue('isVisible', !isVisibleWatch)}
                                            />
                                        } label={"Communauté visible ?"}
                                        />}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        id="isActive"
                                        name={'isActive'}
                                        // defaultValue={data[0]}
                                        as={<FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                checked={isActiveWatch}
                                                onChange={() => setValue('isActive', !isActiveWatch)}
                                            />
                                        } label={"Communauté active ?"}
                                        />}
                                    />
                                </div>
                            </div>

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

export default connect(mapStateToProps, {getUserCommunities, setRequestGlobalAction })
(withStyles(useStyles, { withTheme: true })(injectIntl(CommunityCreate)));
