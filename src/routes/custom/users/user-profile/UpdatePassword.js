import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import {updateUsers, getUsers, setAuthUser} from "Actions";
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
import { useDispatch } from 'react-redux';

//const steps = [1, 2];
const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const  UpdatePassword = props => {

    const { loading, intl, userProfiles, authUser, getUserProfiles, history } = props;

    const [defaultState, setDefaultState] = useState({});

    const { register, errors, handleSubmit, watch, getValues, control, setValue} = useForm({
        defaultValues: !_.isEqual(defaultState, {}) ? defaultState : (
            {
               
               
            
            }
        )
    });

    const acceptLoginWatch = watch('acceptLogin');

    const [userType, setUserType] = useState({
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
        _getUserType();
        _getAllNetworkProfile();
    }, []);

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        props.setRequestGlobalAction(true);
        updateUsers(data)
            .then(() => {
                props.getUsers(props.authUser.user.branch.id, props.authUser.userType);
                props.history.push(USERS.USERS_PROFILE.DISPLAY_PROFILE);
                dispatch(setAuthUser());
            })
            .catch(() => {
                NotificationManager.error("Une erreur est survenue")
            })
            .finally(() => props.setRequestGlobalAction(false));
    };

    const cancelEdition = () => {
        props.history.push(USERS.USERS_PROFILE.DISPLAY_PROFILE)
    };
        return (
            <>
                
                <Form onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
                    <div className="row">
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputComponent
                                isRequired
                                id="oldPassword"
                                type="Password"
                                errors={errors}
                                name={'oldPassword'}
                                register={register}
                                className="has-input input-lg"
                                placeholder={"Ancien mot de passe"}
                                otherValidator={{minLength: AppConfig.minPasswordLength}}
                            >
                                {/*errors.password?.type === 'minLength' && (
                                    <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                                )*/}
                            </InputComponent>
                            <span className="has-icon"><i className="zmdi zmdi-lock-outline"></i></span>
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputComponent
                                isRequired
                                id="newPassword"
                                type="Password"
                                errors={errors}
                                name={'newPassword'}
                                register={register}
                                className="has-input input-lg"
                                placeholder={"Nouveau mot de passe"}
                                otherValidator={{minLength: AppConfig.minPasswordLength}}
                            >
                                {errors.password?.type === 'minLength' && (
                                    <ErrorInputComponent text={intl.formatMessage({id: minMaxValidatorObject.minMessage}, {min: AppConfig.minPasswordLength})} />
                                )}
                            </InputComponent>
                            <span className="has-icon"><i className="zmdi zmdi-lock-outline"></i></span>
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
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
                    </div>

                    
                    <FormGroup className="mb-15">
                    <Button
                            color="primary"
                            disabled={loading}
                            variant="outlined"
                            className="font-weight-bold mr-2"
                            onClick={cancelEdition}
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

export default  withRouter(connect(mapStateToProps, {getUserProfiles, getAllNetworkProfile, getUsers, setRequestGlobalAction})(injectIntl(UpdatePassword)));
