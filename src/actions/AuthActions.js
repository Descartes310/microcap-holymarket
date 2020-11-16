/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    SET_AUTH_USER,
    SET_AUTH_USER_SUCCESS,
    SET_AUTH_USER_FAILURE,
} from 'Actions/types';

import api from './../api';

import {PROFILE} from 'Url/backendUrl';

/**
 * Redux Action get auth information
 */
export const setAuthUser = (serviceNumber = null) => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    // Define branch url
    const branchUrl = window.location.host;

    const url = serviceNumber === null
        ?  `${PROFILE.INFORMATION}?branch_url=${branchUrl}`
        : `${PROFILE.INFORMATION_WITH_SERVICE_NUMBER}?service_number=${serviceNumber}&branch_url=${branchUrl}`;

    return api
        .get(url)
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

