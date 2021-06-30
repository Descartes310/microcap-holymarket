import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlMessages from "Util/IntlMessages";
import Step from "@material-ui/core/Step/Step";
import { updateUsers, getUsers, getUser, getOrganisationTypes } from "Actions";
import { NotificationManager } from "react-notifications";
import { injectIntl } from 'react-intl';
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { USERS } from "Url/frontendUrl";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import { getUserType } from "Actions/independentActions";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CountryManager from 'Helpers/CountryManager';
import FlagCountry from "Components/FlagCountry";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
//import div from "@material-ui/core/div/div";
import Input from "@material-ui/core/Input/Input";
import { getUserProfiles } from "Actions/GeneralActions";
import { getAllNetworkProfile } from "Actions/NetworkProfileActions";
import InputComponent from "Components/InputComponent";
import { emailValidatorObject, minMaxValidatorObject, passwordValidatorObject } from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import AppConfig from "Constants/AppConfig";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";


const countryWithNumberAndFlag = CountryManager.countryWithNumberAndFlag();

const UpdateProfileDisplay = props => {

    const { loading, intl, userProfiles, authUser, getUserProfiles, history } = props;

    const [defaultState, setDefaultState] = useState({});

    const { register, errors, handleSubmit, watch, getValues, control, setValue } = useForm({
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

    const [organisationTypes, setOrganisationTypes] = useState({
        loading: true,
        data: null
    });

    const _getAllNetworkProfile = () => {
        getUserProfiles(authUser.branchId, authUser.userType)
            .then(() => null)
            .catch(error => console.log("Error => ", error))
    };


    useEffect(() => {
        _getOrganisationType();
    }, []);

    const _getOrganisationType = () => {
        return new Promise((resolve, reject) => {
            setOrganisationTypes({ loading: true, data: null });
            getOrganisationTypes()
                .then(result => {
                    setOrganisationTypes({ loading: false, data: result });
                    resolve();
                })
                .catch(error => {
                    setOrganisationTypes({ loading: false, data: null });
                    NotificationManager.error("An error occur " + error);
                    reject();
                });
        });
    };

    const goToEdition = () => {
        props.history.push(USERS.USERS_PROFILE.PROFILE);
    }

    const onSubmit = (data) => {
        props.setRequestGlobalAction(true);

        updateUsers(data, props.authUser.user.id)
            .then(() => {
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
            <div onSubmit={handleSubmit(onSubmit)} className={"center-holder"}>
                {authUser.user.userType === "ORGANISATION" ?
                    ( authUser.commercialName  ? (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3> Nom commercial : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{authUser.commercialName}</span>
                            </div>

                            <div className="col-md-4 user-profile-item">
                                <h3> Nom de l'organisattion : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{authUser.corporateName}</span>
                            </div>
                        </div>) : null
                    ) : (
                        authUser.firstName ? (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Nom : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{authUser.firstName}</span>
                            </div>

                            <div className="col-md-4 user-profile-item">
                                <h3> Prénom :  </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{authUser.lastName}</span>
                            </div>
                        </div> ) : null
                    )}

                {authUser.user.email ?
                (<div className="row align-items-flex-end">
                    <div className="col-md-4 user-profile-item">
                        <h3>Email :</h3>
                    </div>
                    <div className="col-md-8 user-profile-item-value">
                        <span>{authUser.user.email}</span>
                    </div>
                </div>) : null}

                {authUser.user.reference ? (<div className="row align-items-flex-end">
                    <div className="col-md-4 user-profile-item">
                        <h3>Numéro de l'utilisateur :</h3>
                    </div>
                    <div className="col-md-8 user-profile-item-value">
                        <span>{authUser.user.reference}</span>
                    </div>
                </div>) : null }

                {
                    authUser.user.membershipNumber ?
                    <div className="row align-items-flex-end">
                        <div className="col-md-4 user-profile-item">
                            <h3>Numéro d'adhésion :</h3>
                        </div>
                        <div className="col-md-8 user-profile-item-value">
                            <span>{authUser.user.membershipNumber}</span>
                        </div>
                    </div> : null}


                {authUser.user.userType === "ORGANISATION" ?
                    (
                        authUser.legalForm ? (<div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Type d'organisation : </h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{authUser.legalForm}</span>
                            </div>
                        </div>) :null 

                    ) : (

                        authUser.user.phone ? (
                        <div className="row align-items-flex-end">
                            <div className="col-md-4 user-profile-item">
                                <h3>Numéro de téléphone :</h3>
                            </div>
                            <div className="col-md-8 user-profile-item-value">
                                <span>{authUser.user.phone}</span>
                            </div>
                        </div>) : null
                    )}



                {authUser.user.userType === "ORGANISATION" && (<div className="row">
                    {/*<div className="col-md-12 col-sm-12">
                                <CustomAsyncComponent
                                    loading={userProfiles.loading}
                                    data={userProfiles.data}
                                    onRetryClick={_getAllNetworkProfile}
                                    component={data => (
                                        <div className="form-group text-left">
                                            <FormControl fullWidth>
                                                <div className="text-left" htmlFor="organisationTypes-helper">
                                                    Forme Juridique
                                                </div>
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
                        </div>*/}
                </div>)}

                <div className=" row mb-15 mt-15">

                    <Button
                        type="submit"
                        color="primary"
                        disabled={loading}
                        variant="contained"
                        onClick={goToEdition}
                        className="text-white font-weight-bold"
                    >
                        {/*<IntlMessages id="auth.signup" />*/}
                            Modifier
                        </Button>
                </div>
            </div>
        </>
    );

}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, userProfile }) => {
    return { loading: requestGlobalLoader, authUser: authUser.data, userProfiles: userProfile }
};

export default withRouter(connect(mapStateToProps, { getUserProfiles, getAllNetworkProfile, getUsers, setRequestGlobalAction })(injectIntl(UpdateProfileDisplay)));
