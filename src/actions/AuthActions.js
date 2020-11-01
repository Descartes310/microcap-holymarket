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

import {PROFILE} from 'Url/backendUrl';
import {getAuthToken} from "Helpers/tokens";

/**
 * Redux Action get auth information
 */
export const setAuthUser = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    // Define branch url
    const branchUrl = window.location.host;
    return api
        .get(`${PROFILE.INFORMATION}?branch_url=${branchUrl}`)
        .then((response) => {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: SET_AUTH_USER_FAILURE });
            // NotificationManager.error(error.message);
            return Promise.reject();
        });
};

