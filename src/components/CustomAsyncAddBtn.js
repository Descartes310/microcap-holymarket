import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, Form, FormGroup} from "reactstrap";
import {Fab} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {useForm} from "react-hook-form";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import IconButton from "@material-ui/core/IconButton";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import FormControl from "@material-ui/core/FormControl";
import InputComponent from "Components/InputComponent";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorInputComponent from "Components/ErrorInputComponent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from "@material-ui/icons/Cancel";
import InputLabel from "@material-ui/core/InputLabel";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import {createGenericData, setRequestGlobalAction} from "Actions";

const CustomAsyncAddBtn = ({loading, data, component, onRetryClick, errorMessageComponent, type, requestGlobalLoader, setRequestGlobalAction, authUser}) => {
    const [show, setShow] = useState(false);

    const _onRetryClick = (event) => {
        event.preventDefault();
        if(onRetryClick) onRetryClick();
    };

    const onClose = () => {
        setShow(false);
        if(onRetryClick) onRetryClick();
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};
        _data.branchId = authUser.branchId;
        _data.type = type;

        createGenericData(_data)
            .then(() => {
                NotificationManager.success("Nouveau element ajouté avec succès");
                onClose();
            })
            .catch(() => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => setRequestGlobalAction(false));

    };

    return (
        <>
            {loading ? (
                <>
                    <CircularProgress className="progress-primary mr-30 mb-10" />
                </>
            ) : data ? (
                <>
                    <div className="row w-100">
                        <div className="col-10">
                            {component(data)}
                        </div>
                        <div className="col-2">
                            <Fab
                                size="small"
                                variant="round"
                                color="primary"
                                className="text-white mr-15 mb-10"
                                aria-label="add"
                                onClick={() => setShow(true)}
                            >
                                <i className="zmdi zmdi-plus font-2x" />
                            </Fab>
                        </div>
                    </div>
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
                                    onClick={requestGlobalLoader ? null : onClose}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <RctCollapsibleCard>
                                <Form onSubmit={onSubmit}>
                                    <div className="w-100">
                                        <FormGroup className="has-wrapper">
                                            <InputLabel className="text-left" htmlFor="name">
                                                Nom
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                id="name"
                                                name={'label'}
                                                errors={errors}
                                                register={register}
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
                                            disabled={requestGlobalLoader}
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
            ) : (
                <Alert color="danger">
                    {errorMessageComponent ? (
                        <>
                            {errorMessageComponent(_onRetryClick)}
                        </>
                    ) : (
                       <>
                           Une erreur est survenue lors du chargement des données <a href="#" className="alert-link text-decoration-underline" onClick={_onRetryClick}>Veuillez réessayer</a>
                       </>
                    )}
                </Alert>
            )}
        </>
    );
};

CustomAsyncAddBtn.propTypes = {
    type: PropTypes.string.isRequired,

};

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
    return { requestGlobalLoader, authUser: authUser.data }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(injectIntl(CustomAsyncAddBtn));
