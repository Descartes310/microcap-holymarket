import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Input as InputStrap} from "reactstrap";
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
import IconButton from "@material-ui/core/IconButton";
import {getComOperation, createComOperation} from "Actions";
import {ERROR_500} from "Constants/errors";
import ErrorInputComponent from "Components/ErrorInputComponent";
import * as moment from "Routes/session/register/steps/secondStepForPerson";
import _ from "lodash";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {getComOperationType} from "Actions/GeneralActions";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

const Create = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { authUser, loading, intl, onClose, show, setRequestGlobalAction, getComOperation, getComOperationType, comOperationType } = props;

    const [errorMessages, setErrorMessages] = useState({
        startingDate: '',
        endingDate: '',
        birthDate: '',
    });

    const { register, errors, handleSubmit, control, watch } = useForm();

    useEffect(() => {
        getComOperationType(authUser.branchId);
    }, []);

    const validateEndingValidityDate = (endingDate, startingDate) => {
        const _endingDate = moment(endingDate);
        const _startingDate = moment(startingDate);

        if (!_startingDate.isValid()) {
            return true;
        }

        if (_endingDate.diff(_startingDate) < 0) {
            // setErrorMessages({...errorMessages, endingDate: "Start date must not be upper than ending date"});
            setErrorMessages({
                ...errorMessages,
                endingDate: {
                    id: 'form.error.date.maximumDate',
                    value: {
                        currentDate: intl.formatMessage({id: 'date.validity.start'}),
                        maximumDate: _.lowerCase(intl.formatMessage({id: 'date.validity.end'})),
                    }
                }
            });
            return false;
        }

        return true;
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};

        _data.startedAt = _data.startingValidityDate;
        _data.finishedAt = _data.endingValidityDate;

        delete _data.startingValidityDate;
        delete _data.endingValidityDate;

        createComOperation(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Opération commerciale créée avec succès");
                getComOperation(authUser.user.branch.id, authUser.userType);
                onClose();
            })
            .catch(() => null)
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
                        Creation d'une opération commerciale
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

                            <CustomAsyncComponent
                                loading={comOperationType.loading}
                                data={comOperationType.data}
                                onRetryClick={() => getComOperationType(authUser.branchId)}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="operator-helper">
                                                Type d'opérateur
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'commercialOperationTypeId'}
                                                defaultValue={data[0] ? data[0].id : undefined }
                                                as={<Select input={<Input name="operator" id="operator-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />

                            <div className="row align-items-flex-end">
                                <FormGroup className="col-6 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="startingValidityDate">
                                        <IntlMessages id="date.validity.start"/>
                                    </InputLabel>
                                    <InputComponent
                                        id="startingValidityDate"
                                        type="date"
                                        isRequired
                                        errors={errors}
                                        register={register}
                                        name={'startingValidityDate'}
                                        className="has-input input-lg"
                                    />
                                </FormGroup>
                                <FormGroup className="col-6 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="endingValidityDate">
                                        <IntlMessages id="date.validity.end"/>
                                    </InputLabel>
                                    <InputComponent
                                        id="endingValidityDate"
                                        type="date"
                                        isRequired
                                        name={'endingValidityDate'}
                                        errors={errors}
                                        register={register}
                                        className="has-input input-lg"
                                        placeholder={intl.formatMessage({id: "date.validity.end"})}
                                        // otherValidator={{validate: value => validateEndingValidityDate(value, watch('startingValidityDate'))}}
                                    >
                                        {errors.endingValidityDate && errors.endingValidityDate?.type !== 'required' && (
                                            <ErrorInputComponent
                                                text={intl.formatMessage(
                                                    {id: errorMessages.endingDate.id},
                                                    errorMessages.endingDate.value,
                                                )}
                                            />
                                        )}
                                    </InputComponent>
                                </FormGroup>
                            </div>

                            <FormGroup className="mb-15">
                                <Button
                                    // type="submit"
                                    color="primary"
                                    disabled={(comOperationType.data && comOperationType.data.length === 0) && loading}
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

const mapStateToProps = ({ requestGlobalLoader, authUser, comOperationType}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, comOperationType};
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


export default connect(mapStateToProps, {getComOperationType, getComOperation, setRequestGlobalAction })
(withStyles(useStyles, { withTheme: true })(injectIntl(Create)));
