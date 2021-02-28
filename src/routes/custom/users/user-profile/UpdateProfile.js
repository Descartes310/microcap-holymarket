import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import {updateUsers, getUsers, getUser, getOrganisationTypes, setAuthUser} from "Actions";
import {NotificationManager} from "react-notifications";
import {Form, FormGroup} from "reactstrap";
import {injectIntl} from 'react-intl';
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {USERS} from "Url/frontendUrl";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import {getUserType} from "Actions/independentActions";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CountryManager from 'Helpers/CountryManager';
import FlagCountry from "Components/FlagCountry";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import {getUserProfiles} from "Actions/GeneralActions";
import {getAllNetworkProfile} from "Actions/NetworkProfileActions";
import InputComponent from "Components/InputComponent";
import {emailValidatorObject, minMaxValidatorObject, passwordValidatorObject} from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import AppConfig from "Constants/AppConfig";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";


const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const  UpdateProfile = props => {

    const { loading, intl, userProfiles, authUser, getUserProfiles, history } = props;

    const [defaultState, setDefaultState] = useState({});

    const { register, errors, handleSubmit, watch, getValues, control, setValue} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : (
            {
                commercialName: authUser.commercialName,
                corporateName: authUser.corporateName,
                firstName:  authUser.firstName,
                lastName: authUser.lastName,
                email: authUser.user.email,
                login: authUser.user.login, 
                phoneNumber: authUser.user.phone,
                profileId: authUser.user.profile.id,
                userType: authUser.user.userType
            
            }
        )
    });

    const acceptLoginWatch = watch('acceptLogin');

    const [userType, setUserType] = useState({
        loading: true,
        data: null
    });

    const [organisationTypes, setOrganisationTypes] = useState({
        loading: true,
        data: null
    });

    const _getAllNetworkProfile = () => {
        getUserProfiles(authUser.branchId, authUser.userType)
            .then(() => null)
            .catch(error => console.log("Error => ", error))
    };

    const _getUserType = () => {
        return new Promise((resolve, reject) => {
            setUserType({loading: true, data: null});
            getUserType()
                .then(result => {
                    setUserType({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setUserType({loading: false, data: null});
                    NotificationManager.error("Une erreur est survenue " + error);
                    reject();
                })
        });
    };

    useEffect(() => {
        _getOrganisationType();
    }, []);

    const _getOrganisationType = () => {
        return new Promise((resolve, reject) => {
            setOrganisationTypes({loading: true, data: null});
            getOrganisationTypes()
                .then(result => {
                    setOrganisationTypes({loading: false, data: result});
                    resolve();
                })
                .catch(error => {
                    setOrganisationTypes({loading: false, data: null});
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    useEffect(() => {
        _getUserType();
        _getAllNetworkProfile();
    }, []);

    


    const onSubmit = (data) => {
        props.setRequestGlobalAction(true);
        
        updateUsers(data, props.authUser.user.id)
            .then(() => {
                getUser(props.authUser.user.id);
                console.log("updated User =>",getUser(props.authUser.user.id));
                props.history.push(USERS.USERS_PROFILE.DISPLAY_PROFILE);
            })
            .catch((error) => {
                NotificationManager.error("Une erreur est survenue")
                console.log(error);
            })
            .finally(() => props.setRequestGlobalAction(false));
    };
        return (
            <>  
                <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
                    {authUser.user.userType === "ORGANISATION" ? 
                        (
                            <div className="row align-items-flex-end">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputComponent
                                        id="commercialName"
                                        type="text"
                                        isRequired
                                        name={'commercialName'}
                                        errors={errors}
                                        register={register}
                                        className="has-input input-lg"
                                        placeholder={intl.formatMessage({id: "components.commercialName"})}
                                    />
                                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputComponent
                                        id="corporateName"
                                        type="text"
                                        isRequired
                                        name={'corporateName'}
                                        errors={errors}
                                        register={register}
                                        className="has-input input-lg"
                                        placeholder={intl.formatMessage({id: "components.corporateName"})}
                                    />
                                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                                </FormGroup>
                            </div>
                        ) :(
                            <div className="row align-items-flex-end">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputComponent
                                        id="firstName"
                                        type="text"
                                        isRequired
                                        name={'firstName'}
                                        errors={errors}
                                        register={register}
                                        className="has-input input-lg"
                                        placeholder={intl.formatMessage({id: "components.firstName"})}
                                    />
                                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputComponent
                                        id="lastName"
                                        type="text"
                                        isRequired
                                        name={'lastName'}
                                        errors={errors}
                                        register={register}
                                        className="has-input input-lg"
                                        placeholder={intl.formatMessage({id: "components.lastName"})}
                                    />
                                    <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                                </FormGroup>
                            </div>
                    )}

                    <FormGroup className="has-wrapper">
                        <InputComponent
                            id="email"
                            type="mail"
                            isRequired
                            name={'email'}
                            errors={errors}
                            register={register}
                            className="has-input input-lg"
                            placeholder={intl.formatMessage({id: "auth.email"})}
                            otherValidator={{pattern: emailValidatorObject.regex}}
                        >
                            {errors.email?.type === 'pattern' && (
                                <ErrorInputComponent text={intl.formatMessage({id: emailValidatorObject.message})} />
                            )}
                        </InputComponent>
                        <span className="has-icon"><i className="zmdi zmdi-email"></i></span>
                    </FormGroup>
                    <FormControl fullWidth>
                        <InputComponent
                            isRequired
                            className="mt-0"
                            errors={errors}
                            id="acceptLogin"
                            control={control}
                            name={'acceptLogin'}
                            register={register}
                            componentType="select"
                            as={<FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={acceptLoginWatch}
                                    value={acceptLoginWatch}
                                    onChange={() => setValue('acceptLogin', !acceptLoginWatch)}
                                />
                            } label={"Se connecter avec le login ?"}
                            />}
                        />
                    </FormControl>

                    {acceptLoginWatch && (
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="login">
                                Login
                            </InputLabel>
                            <InputComponent
                                id="login"
                                name={'login'}
                                errors={errors}
                                register={register}
                                isRequired={acceptLoginWatch}
                                className="has-input input-lg"
                            />
                            <span className="has-icon"><i className="ti-pencil"/></span>
                        </FormGroup>
                    )}

                    <div className="row">
                        {errors.phoneNumber?.type === 'required' && (
                            <div className="col-12">
                                <ErrorInputComponent text={intl.formatMessage({id: errors.phoneNumber?.message})} />
                            </div>
                        )}
                        <FormGroup className="col-2 has-wrapper">
                            <InputComponent
                                errors={errors}
                                control={control}
                                register={register}
                                componentType="select"
                                name={'phoneNumberPrefix'}
                                defaultValue={countryWithNumberAndFlag[0].phonePrefixes[0]}
                                as={<Select>
                                    {countryWithNumberAndFlag.map(item => (
                                        <MenuItem key={item.id} value={item.phonePrefixes[0]} className="center-hor-ver">
                                            <FlagCountry flag={item.flag} label={item.phonePrefixes[0]} />
                                        </MenuItem>
                                    ))}
                                </Select>}

                            />
                        </FormGroup>
                        {authUser.user.userType === "PERSON" ? 
                            (
                                <FormGroup className="col-10 has-wrapper">
                                    <InputComponent
                                        type="text"
                                        isRequired
                                        errors={errors}
                                        id="phoneNumber"
                                        register={register}
                                        name={'phoneNumber'}
                                        customRequiredDisplay={true}
                                        className="has-input input-lg"
                                        placeholder={intl.formatMessage({id: "auth.phoneNumber"})}
                                    />
                                    <span className="has-icon"><i className="zmdi zmdi-phone"></i></span>
                                </FormGroup>
                                ): (
                                    <div className="col-md-10 col-sm-12">
                                     <CustomAsyncComponent
                                        loading={organisationTypes.loading}
                                        data={organisationTypes.data}
                                        onRetryClick={_getOrganisationType}
                                        component={data => (
                                            <div className="form-group text-left">
                                                <FormControl fullWidth>
                                                    <InputLabel className="text-left" htmlFor="organisationTypes-helper"><IntlMessages id="common.organisationType"/></InputLabel>
                                                    <InputComponent
                                                        isRequired
                                                        className="mt-0"
                                                        errors={errors}
                                                        control={control}
                                                        register={register}
                                                        componentType="select"
                                                        name={'organisationType'}
                                                        defaultValue={authUser.legalForm}
                                                        as={<Select input={<Input name="organisationTypes" id="organisationTypes-helper" />}>
                                                            {data.map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item} className="center-hor-ver">
                                                                        {item}
                                                                    </MenuItem>
                                                                )
                                                            })}
                                                        </Select>}
                                                    />
                                                </FormControl>
                                            </div>
                                        )}
                                    />
                                </div>
                                )}
                    </div>
                    {/*<div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputComponent
                                isRequired
                                id="password"
                                type="Password"
                                errors={errors}
                                name={'password'}
                                register={register}
                                className="has-input input-lg"
                                placeholder={intl.formatMessage({id: "auth.password"})}
                                otherValidator={{minLength: AppConfig.minPasswordLength}}
                            >
                                {errors.password?.type === 'minLength' && (
                                    <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                                )}
                            </InputComponent>
                            <span className="has-icon"><i className="zmdi zmdi-lock-outline"></i></span>
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputComponent
                                isRequired
                                type="Password"
                                errors={errors}
                                register={register}
                                id="passwordConfirmation"
                                name={'passwordConfirmation'}
                                className="has-input input-lg"
                                placeholder={intl.formatMessage({id: "auth.passwordConfirmation"})}
                                otherValidator={{validate: value => value === watch('password')}}
                            >
                                {errors.passwordConfirmation && (
                                    <ErrorInputComponent text={intl.formatMessage({id: passwordValidatorObject.passwordConfirmation})} />
                                )}
                            </InputComponent>
                            <span className="has-icon"><i className="zmdi zmdi-lock-outline"></i></span>
                        </FormGroup>
                                </div>*/}

                    {authUser.user.userType === "ORGANISATION" && (<div className="row">
                        <div className="col-md-12 col-sm-12">
                            <CustomAsyncComponent
                                loading={userProfiles.loading}
                                data={userProfiles.data}
                                onRetryClick={_getAllNetworkProfile}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="organisationTypes-helper">
                                                Forme Juridique
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'profileId'}
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="organisationTypes" id="organisationTypes-helper" />}>
                                                    {data.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                                {item.label}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>
                    </div>)}

                    <FormGroup className="mb-15">
                    <Button
                            color="primary"
                            disabled={loading}
                            variant="outlined"
                            className="font-weight-bold mr-2"
                        >
                            {/*<i className="ti-arrow-left font-weight-bold mr-2"></i> <IntlMessages id="button.previous" />*/}
                            Annuler
                        </Button>

                        <Button
                            type="submit"
                            color="primary"
                            disabled={loading}
                            variant="contained"
                            className="text-white font-weight-bold"
                        >
                            {/*<IntlMessages id="auth.signup" />*/}
                            Editer
                        </Button>
                    </FormGroup>
                </Form>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            </>
        );
    
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser,userProfile  }) => {
    return { loading: requestGlobalLoader, authUser: authUser.data, userProfiles: userProfile}
};

export default withRouter(connect(mapStateToProps, {getUserProfiles, getAllNetworkProfile, getUsers, setRequestGlobalAction})(injectIntl(UpdateProfile)));
