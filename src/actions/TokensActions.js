/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import { NotificationManager } from 'react-notifications';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE, CLEAR_AUTH_USER
} from 'Actions/types';

import api from './../api';
import AppConfig from 'Constants/AppConfig';
import {AUTH} from '../urls/backendUrl';
import {removeAuthToken, saveAuthToken} from "Helpers/tokens";
import {setAuthUser} from "Actions/AuthActions";
import {getFullAuthorisationRequestConfig} from "Helpers/helpers";

const errorDisplay = (error) => {
   if (error && (error.message.includes('code 400') || error.message.includes('code 401'))) {
      NotificationManager.error("Bad email and/or password");
      return;
   }

   NotificationManager.error(error.message);
};

/**
 * Redux Action To Sigin User with email and password
 */
export const loginUserWithEmailAndPassword = (data) => (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const config = getFullAuthorisationRequestConfig();

    const _data = {...data};
    _data.username = data.email;
    _data.grantType = AppConfig.oauth.grantType;
    _data.clientId = AppConfig.oauth.clientId;

    delete _data.email;

    const url = _data.gotServiceNumber ? AUTH.LOGIN_WITH_SERVICE_NUMBER : AUTH.LOGIN;

    return api
        .post(url, _data, config)
        .then((response) => {
            const token = _data.gotServiceNumber ? response.data.token : response.data;
            const access = _data.gotServiceNumber ? response.data.access : {};

            localStorage.setItem("access", JSON.stringify(access));

            const data = {
                accessToken: token.accessToken,
                tokenType: token.tokenType,
                expiresIn: token.expiresIn,
                refreshToken: token.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(data.accessToken, data.tokenType, data.expiresIn, data.refreshToken);

            // Fetch user data
            dispatch(setAuthUser(_data.gotServiceNumber ? _data.serviceNumber : null ));

            // Persist data into store
            dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
            // history.push('/');
            // NotificationManager.success('User Login Successfully!');
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: LOGIN_USER_FAILURE, payload: error });
            errorDisplay(error);
            return Promise.reject();
        });
};

export const loginIntoStore = (data) => (dispatch) => {
    // Persist data into store
    dispatch({ type: LOGIN_USER });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
};

/**
 * Redux Action To Sigin User with email and password
 */
export const registerPersonUser = (data) => (dispatch) => {
    dispatch({ type: SIGNUP_USER });
    return api.post(AUTH.REGISTER.PERSON, data)
        .then((response) => {
            dispatch({ type: SIGNUP_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: SIGNUP_USER_FAILURE, payload: error });
            // errorDisplay(error);
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};

/**
 * Redux Action To Sigin User with email and password
 */
export const registerOrganisation = (data) => (dispatch) => {
    dispatch({ type: SIGNUP_USER });
    return api.post(AUTH.REGISTER.ORGANISATION, data)
        .then((response) => {
            dispatch({ type: SIGNUP_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: SIGNUP_USER_FAILURE, payload: error });
            // errorDisplay(error);
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};


/**
 * Redux Action To Signout User From  Firebase
 */
export const logout = () => (dispatch) => {
    removeAuthToken();
    dispatch({ type: LOGOUT_USER, payload: null });
    dispatch({ type: CLEAR_AUTH_USER, payload: null });
};
