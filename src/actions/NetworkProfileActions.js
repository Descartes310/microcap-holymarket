/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import { NotificationManager } from 'react-notifications';
import {
    NETWORK_PROFILE,
    NETWORK_PROFILE_SUCCESS,
    NETWORK_PROFILE_FAILURE,
} from 'Actions/types';

import api from './../api';

import {NETWORK_PROFILE as NETWORK_PROFILE_API} from 'Url/backendUrl';

/**
 * Redux Action get auth information
 */
export const getAllNetworkProfile = () => (dispatch) => {
    dispatch({ type: NETWORK_PROFILE });
    return api
        .get(NETWORK_PROFILE_API.GET_ALL)
        .then((response) => {
            dispatch({ type: NETWORK_PROFILE_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: NETWORK_PROFILE_FAILURE, error: error });
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};

