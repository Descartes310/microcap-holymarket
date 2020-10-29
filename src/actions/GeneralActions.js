import { NotificationManager } from 'react-notifications';
import {
    CATALOG,
    CATALOG_SUCCESS,
    CATALOG_FAILURE,
    CATALOG_TYPE,
    CATALOG_TYPE_SUCCESS,
    CATALOG_TYPE_FAILURE,
} from 'Actions/types';

import api from './../api';

import {CATALOGS_TYPE, CATALOGS as CATALOGS_API} from 'Url/backendUrl';

export const getCatalogs = () => (dispatch) => {
    dispatch({ type: CATALOG });
    return api
        .get(CATALOGS_API.GET_ALL)
        .then((response) => {
            dispatch({ type: CATALOG_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: CATALOG_FAILURE });
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};

export const getCatalogsOfOneType = (name) => (dispatch) => {
    dispatch({ type: CATALOG_TYPE });

    const url = `${CATALOGS_TYPE.GET_ALL}?name=${name}`;

    return api
        .get(url)
        .then((response) => {
            dispatch({ type: CATALOG_TYPE_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: CATALOG_TYPE_FAILURE });
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};

