/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import { NotificationManager } from 'react-notifications';
import {
    SET_AUTH_USER,
    SET_AUTH_USER_SUCCESS,
    SET_AUTH_USER_FAILURE,
} from 'Actions/types';

import api from './../api';

import {PROFILE} from '../services/backendRoute';
import {getAuthToken} from "Helpers/tokens";

/**
 * Redux Action get auth information
 */
export const setAuthUser = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    /*const { accessToken } = getAuthToken();

    if (accessToken) {
        dispatch({ type: SET_AUTH_USER_SUCCESS, payload: {name: 'juns'} });
        return Promise.resolve();
    } else {
        dispatch({ type: SET_AUTH_USER_FAILURE });
        return Promise.reject();
    }*/

    return api
        .get(PROFILE.INFORMATION)
        .then((response) => {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: SET_AUTH_USER_FAILURE });
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};

