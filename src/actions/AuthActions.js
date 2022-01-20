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
export const setAuthUser = () => (dispatch) => {
    dispatch({ type: SET_AUTH_USER });

    // Define branch url
    const branchUrl = window.location.host;

    const url = `${PROFILE.INFORMATION}?branch_url=${branchUrl}`;

    return api
        .get(url, {skipError: true})
        .then((response) => {
            dispatch({ type: SET_AUTH_USER_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            console.error(error);
            dispatch({ type: SET_AUTH_USER_FAILURE });
            return Promise.reject();
        });
};

