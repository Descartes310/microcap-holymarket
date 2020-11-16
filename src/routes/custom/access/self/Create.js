import {connect} from "react-redux";
import React, {useEffect, useState} from 'react';
import {Form, FormGroup} from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {NotificationManager} from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, withStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import {createAccess, getBranchUsers, getMandate, getMandateOfUser, getUsersByOrganisation, setRequestGlobalAction} from "Actions";
import {ERROR_500} from "Constants/errors";
import ObjectSwitcher from "Components/ObjectSwitcher";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import AppConfig from "Constants/AppConfig";
import ErrorInputComponent from "Components/ErrorInputComponent";
import {minMaxValidatorObject, passwordValidatorObject} from "Helpers/validator";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import FetchFailedComponent from "Components/FetchFailedComponent";
import UserType from "Enums/UserType";
import SingleTitleText from "Components/SingleTitleText";

const Create = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { mandate, getMandate, authUser, loading, intl, onClose, show, getBranchUsers, getMandateOfUser, getUsersByOrganisation, setRequestGlobalAction } = props;

    const userDoesNotHaveRight = authUser.user.userType === UserType.ORGANISATION;

    const [branchUsers, setBranchUsers] = useState({
        data: null,
        loading: false,
    });
    const [mandateSelected, setMandateSelected] = useState(null);
    const [permissionsSelected, setPermissionsSelected] = useState([]);

    const { control, register, errors, handleSubmit, setValue, watch} = useForm();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        loadUsers().catch(() => {});
        loadMandate().catch(() => {});
    };

    const loadUsers = async () => {
        setBranchUsers({
            data: branchUsers.data,
            loading: true
        });
        let result = branchUsers.data;

        try {
            if (userDoesNotHaveRight) {
                result = await getUsersByOrganisation(authUser.id);
            } else {
                result = await getBranchUsers(authUser.branchId);
            }
        } catch (e) {

        }

        setBranchUsers({
            data: result,
            loading: false
        });
    };

    const loadMandate = async () => {
        getBranchUsers(authUser.branchId);
        let result;
        try {
            if (userDoesNotHaveRight) {
                result = await getMandateOfUser(authUser.user.id);
            } else {
                result = await getMandate(authUser.branchId);
            }
        } catch (e) {

        }

        if (result && result.length > 0) setMandateSelected(result[0].id);
    };

    /**
     * On submit
     */
    const onSubmit = (data) => {
        setRequestGlobalAction(true);

        const _data = {...data};

        _data.mandateId = mandateSelected;
        _data.permissions = JSON.stringify(permissionsSelected.map(i => i.id));

        createAccess(_data, authUser.user.branch.id)
            .then(() => {
                NotificationManager.success("Accès créée avec succès");
                onClose();
            })
            .catch((error) => {
                NotificationManager.error(ERROR_500);
                // console.log("error => ", error.message);
            })
            .finally(() => setRequestGlobalAction(false));
    };

    const getMandateFromId = id => mandate.data.find(m => m.id === id);

    const onMandateChange = (newValue) => {
        if (mandateSelected !== newValue) {
            setMandateSelected(newValue);
        }
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
                        Creation d'un accès
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
                        {(mandate.loading || branchUsers.loading) ? (
                            <RctSectionLoader />
                        ) : (!mandate.data || !branchUsers.data) ? (
                            <FetchFailedComponent _onRetryClick={loadData} />
                        ) : branchUsers.data.length === 0 ? (
                            <SingleTitleText
                                text={"Aucun utilisateurs trouvés dans l'organisation"}
                            />
                        ) : mandate.data.length === 0 ? (
                            <SingleTitleText
                                text={"Aucun mandats trouvés dans l'organisation"}
                            />
                        ) : (
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <CustomAsyncComponent
                                    data={branchUsers.data}
                                    loading={branchUsers.loading}
                                    onRetryClick={loadUsers}
                                    component={data => (
                                        <div className="form-group text-left my-3">
                                            <FormControl fullWidth>
                                                <InputLabel className="text-left" htmlFor="userId-helper">
                                                    Utilisateur
                                                </InputLabel>
                                                <InputComponent
                                                    isRequired
                                                    errors={errors}
                                                    className="mt-0"
                                                    control={control}
                                                    register={register}
                                                    name={'userId'}
                                                    componentType="select"
                                                    defaultValue={data[0] ? data[0].id : undefined}
                                                    as={<Select input={<Input name="userId" id="userId-helper" />}>
                                                        {data.map((item, index) => {
                                                            return (
                                                                <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                                    {item.name}
                                                                </MenuItem>
                                                            )
                                                        })}
                                                    </Select>}
                                                />
                                            </FormControl>
                                        </div>
                                    )}
                                />

                                <CustomAsyncComponent
                                    data={mandate.data}
                                    loading={mandate.loading}
                                    onRetryClick={loadMandate}
                                    component={data => (
                                        <div className="form-group text-left my-3">
                                            <FormControl fullWidth>
                                                <InputLabel className="text-left" htmlFor="operator-helper">
                                                    Mandat
                                                </InputLabel>
                                                <Select
                                                    value={mandateSelected}
                                                    onChange={event => onMandateChange(event.target.value)}
                                                    input={<Input name="operator" id="operator-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                            {item.user.email} / {item.mandateModel.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )}
                                />

                                {mandateSelected !== null && (
                                    <ObjectSwitcher
                                        loading={false}
                                        data={getMandateFromId(mandateSelected).mandateModel.permissions}
                                        label={"Permissions"}
                                        onRetryClick={loadData}
                                        onItemsChanged={items => setPermissionsSelected(items)}
                                    />
                                )}

                                <FormGroup className="has-wrapper my-3">
                                    <InputLabel className="text-left" htmlFor="login">
                                        Login
                                    </InputLabel>
                                    <InputComponent
                                        id="login"
                                        isRequired
                                        name={'login'}
                                        errors={errors}
                                        register={register}
                                        className="input-lg"
                                        // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                    />
                                    <span className="has-icon"><i className="ti-pencil"/></span>
                                </FormGroup>

                                <FormGroup className="has-wrapper my-2">
                                    <InputLabel className="text-left" htmlFor="password">
                                        Mot de passe
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        id="password"
                                        type="Password"
                                        errors={errors}
                                        name={'password'}
                                        register={register}
                                        className="has-input input-lg"
                                        otherValidator={{minLength: AppConfig.minPasswordLength}}
                                    >
                                        {errors.password?.type === 'minLength' && (
                                            <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                                        )}
                                    </InputComponent>
                                    <span className="has-icon"><i className="zmdi zmdi-lock-outline"/></span>
                                </FormGroup>
                                <FormGroup className="has-wrapper my-2">
                                    <InputLabel className="text-left" htmlFor="passwordConfirmation">
                                        Confirmation du mot de passe
                                    </InputLabel>
                                    <InputComponent
                                        isRequired
                                        type="Password"
                                        errors={errors}
                                        register={register}
                                        id="passwordConfirmation"
                                        name={'passwordConfirmation'}
                                        className="has-input input-lg"
                                        otherValidator={{validate: value => value === watch('password')}}
                                    >
                                        {errors.passwordConfirmation && (
                                            <ErrorInputComponent text={intl.formatMessage({id: passwordValidatorObject.passwordConfirmation})} />
                                        )}
                                    </InputComponent>
                                    <span className="has-icon"><i className="zmdi zmdi-lock-outline"/></span>
                                </FormGroup>

                                <FormGroup className="my-15">
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
                        )}
                    </RctCollapsibleCard>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, mandate, branchUsers}) => {
    return {loading: requestGlobalLoader, authUser: authUser.data, mandate, branchUsers};
};

export default connect(mapStateToProps, {getMandate, getBranchUsers, getMandateOfUser, getUsersByOrganisation, setRequestGlobalAction })(injectIntl(Create));
