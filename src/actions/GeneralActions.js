import { NotificationManager } from 'react-notifications';
import {
    CATALOG,
    CATALOG_SUCCESS,
    CATALOG_FAILURE,
    CATALOG_TYPE,
    CATALOG_TYPE_SUCCESS,
    CATALOG_TYPE_FAILURE,
    CATEGORY_PRODUCTS,
    CATEGORY_PRODUCTS_SUCCESS,
    CATEGORY_PRODUCTS_FAILURE,
    BRANCH_PRODUCT, BRANCH_PRODUCT_SUCCESS, BRANCH_PRODUCT_FAILURE, CATALOG_PRODUCTS,
} from 'Actions/types';

import api from './../api';

import {
    CATALOGS_TYPE,
    CATALOGS as CATALOGS_API,
    CATEGORY_PRODUCTS as CATEGORY_PRODUCTS_API,
    joinBaseUrlWithParams,
    BRANCH} from 'Url/backendUrl';

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

export const getCatalogsOfOneType = (name, branchId) => (dispatch) => {
    dispatch({ type: CATALOG_TYPE });

    const url = `${CATALOGS_TYPE.GET_ALL}?name=${name}&branch_id=${branchId}`;

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

export const getBranchProducts = (branchId) => (dispatch) => {
    dispatch({ type: BRANCH_PRODUCT });

    const url = `${BRANCH.PRODUCTS.GET_ALL}?branch_id=${branchId}`;
    return api
        .get(url)
        .then((response) => {
            dispatch({ type: BRANCH_PRODUCT_SUCCESS, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: BRANCH_PRODUCT_FAILURE });
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};

export const makeActionRequest = (verb, url, typeBase, dispatch, data = null, config = {} ) => {
    dispatch({ type: typeBase });
    return api[verb](url, data)
        .then((response) => {
            console.log("response => ", response);
            dispatch({ type: `${typeBase}_SUCCESS`, payload: response.data });
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({ type: `${typeBase}_FAILURE` });
            NotificationManager.error(error.message);
            return Promise.reject();
        });
};

export const getCatalogProducts = (catalogId) => (dispatch) => {
    const url = joinBaseUrlWithParams(CATALOGS_API.TYPE_PRODUCTS.GET, [{
        param: 'id',
        value: catalogId,
    }]);
    return makeActionRequest('get', url, CATALOG_PRODUCTS, dispatch);
};

export const getCategoryProducts = (branchId) => (dispatch) => {
    const url = `${CATEGORY_PRODUCTS_API.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, CATEGORY_PRODUCTS, dispatch);
};

