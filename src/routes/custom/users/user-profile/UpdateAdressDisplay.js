import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from "Util/IntlMessages";
import {updateUsers, getUsers,getRegistrationType} from "Actions";
import {NotificationManager} from "react-notifications";
import SecondStep from "./secondStep";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {USERS} from "Url/frontendUrl";
import {getUserProfiles} from "Actions/GeneralActions";
import PropTypes from 'prop-types';
import {Alert, Form, FormGroup} from "reactstrap";
import FormControl from '@material-ui/core/FormControl';
import InputComponent from "Components/InputComponent";
import {emailValidatorObject, minMaxValidatorObject, passwordValidatorObject} from "Helpers/validator";
import ErrorInputComponent from "Components/ErrorInputComponent";
import AppConfig from "Constants/AppConfig";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {injectIntl} from 'react-intl';
import CountryManager from 'Helpers/CountryManager';
import FlagCountry from "Components/FlagCountry";
import {getResidenceCountries, getOperators} from "Actions";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as moment from "moment";
import _ from 'lodash';
import {getIdentificationType} from "Actions/independentActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getAllNetworkProfile} from "Actions/NetworkProfileActions";

//const steps = [1, 2];



const UpdateAdressDisplay = props => {
    
    const { loading, authUser, userAdressInformations } = props;

    const [defaultState, setDefaultState] = useState({});

    const goToEdition = () => {
        props.history.push(USERS.USERS_PROFILE.PROFILE);
   }
 
   console.log("userAdressInformations =>", userAdressInformations);

        //const { loading, history } = this.props;
        return (
            <>
                <div className={"center-holder"}>
                   
                    <div className="row align-items-flex-end">
                        <div className="col-md-3 user-profile-item">
                            <h3><IntlMessages id="common.nationality"/> : </h3> 
                        </div>
                        <div className="col-md-9 user-profile-item-value">
                            <span>{userAdressInformations.user.nationality}</span>
                        </div>
                    </div>

                    <div className="row align-items-flex-end">
                        <div className="col-md-3 user-profile-item">
                            <h3> <IntlMessages id="common.residenceCountry"/> : </h3> 
                        </div>
                        <div className="col-md-9 user-profile-item-value">
                            <span>{userAdressInformations.user.hostCountry}</span>
                        </div>
                    </div>

                    <div className="row align-items-flex-end">
                        <div className="col-md-3 user-profile-item">
                            <h3> <IntlMessages id="components.city"/> : </h3> 
                        </div>
                        <div className="col-md-9 user-profile-item-value">
                            <span>{userAdressInformations.user.city}</span>
                        </div>
                    </div>
                    {authUser.identificationType ? (
                        <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3> <IntlMessages id="common.identificationType"/> : </h3> 
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{authUser.identificationType}</span>
                            </div>
                        </div>
                        ): (
                        
                        <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3> <IntlMessages id="common.registrationType" /> : </h3> 
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{authUser.identificationType}</span>
                            </div>
                        </div>
                    )}


                    {authUser.immatriculationValue ? (
                       <div className="row align-items-flex-end">
                            <div className="col-md-3 user-profile-item">
                                <h3> Numero d'identification : </h3> 
                            </div>
                            <div className="col-md-9 user-profile-item-value">
                                <span>{authUser.identificationNumber}</span>
                            </div>
                        </div>
                   ) : (
                    <div className="row align-items-flex-end">
                        <div className="col-md-3 user-profile-item">
                            <h3> Numero d'immatriculation : </h3> 
                        </div>
                        <div className="col-md-9 user-profile-item-value">
                            <span>{authUser.immatriculationValue}</span>
                        </div>
                    </div>

                        )}

                    <div className="row align-items-flex-end">
                        <div className="col-md-3 user-profile-item">
                            <h3><IntlMessages id="date.validity.start"/> : </h3> 
                        </div>
                        <div className="col-md-9 user-profile-item-value">
                            <span>{authUser.beginingPieceValidity}</span>
                        </div>
                    </div>

                    <div className="row align-items-flex-end">
                        <div className="col-md-3 user-profile-item">
                            <h3><IntlMessages id="date.validity.end"/> : </h3> 
                        </div>
                        <div className="col-md-9 user-profile-item-value">
                            <span>{authUser.endPieceValidity}</span>
                        </div>
                    </div>

                    <div className="row align-items-flex-end">
                        <div className="col-md-3 user-profile-item">
                            <h3><IntlMessages id="date.birth"/> : </h3> 
                        </div>
                        <div className="col-md-9 user-profile-item-value">
                            <span>{authUser.dateBirth}</span>
                        </div>
                    </div>

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

export default  withRouter(connect(mapStateToProps, {getUsers, setRequestGlobalAction,getUserProfiles, getAllNetworkProfile })(injectIntl(UpdateAdressDisplay)));
