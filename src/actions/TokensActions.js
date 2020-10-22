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
import {AUTH} from '../services/backendRoute';
import {removeAuthToken, saveAuthToken} from "Helpers/tokens";
import {setAuthUser} from "Actions/AuthActions";

const login = (email, password) => {
   const body = new FormData();
   body.append('username', email);
   body.append('password', password);
   body.append('grant_type', AppConfig.oauth.grantType);
   body.append('client_id', AppConfig.oauth.clientId);

   const headers = {
      'Content-type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(AppConfig.oauth.clientId + ":" + AppConfig.oauth.clientSecret)
   };

   return api.post(AUTH.LOGIN, body, { headers, shouldSkip: true, shouldSkipToken: true, withCredentials: true });
};


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
export const loginUserWithEmailAndPassword = (user) => (dispatch) => {
    dispatch({ type: LOGIN_USER });
    return login(user.email, user.password)
        .then((response) => {
            const data = {
                accessToken: response.data.accessToken,
                tokenType: response.data.tokenType,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
            };

            // Persist data into localstorage
            saveAuthToken(data.accessToken, data.tokenType, data.expiresIn, data.refreshToken);

            // Fetch user data
            dispatch(setAuthUser());

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
    return api.post(AUTH.REGISTER.PERSON, data, {shouldSkip: true})
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
    return api.post(AUTH.REGISTER.ORGANISATION, data, {shouldSkip: true})
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
