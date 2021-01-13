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
    BRANCH_PRODUCT,
    BRANCH_PRODUCT_SUCCESS,
    BRANCH_PRODUCT_FAILURE,
    CATALOG_PRODUCTS,
    PRODUCT_TYPE,
    USER_PROFILE,
    USER_PERMISSIONS,
    NETWORK_PROFILE_TYPE,
    USERS,
    USER_COMMUNITIES,
    USER_COMMUNITIES_ADMIN,
    USER_COMMUNITIES_NOT_IN,
    COM_INVITATIONS_PENDING,
    SET_CURRENT_COMMUNITY,
    SET_CURRENT_COMMUNITY_SUCCESS,
    SET_CURRENT_COMMUNITY_FAILURE,
    PACKAGES,
    COMMERCIAL_OPERATION_TYPE,
    COMMERCIAL_OPERATION,
    COMMERCIAL_OFFER,
    PRODUCT,
    MANDATE_TYPE,
    MANDATE_MODEL,
    MANDATE,
    BRANCH_USERS,
    NOTIFICATION_MODEL,
    NOTIFICATION,
    NOTIFICATION_SERVICE,
    USERS_ACCOUNTS,
    SAMPLE_BRANCHES,
    PROJECT_WORKS,
    PROJECT_STANDARD,
    INITIALISATION_IDEA,
    INITIALISATION_PROGRAM,
    INITIALISATION_PROJECTS_CALL,
    PROJECT_STANDARD_PRESENTATION, PROJECTS, FOLDERS,
} from 'Actions/types';

import api from './../api';

import {
    CATALOGS_TYPE,
    CATALOGS as CATALOGS_API,
    CATEGORY_PRODUCTS as CATEGORY_PRODUCTS_API,
    PRODUCT_TYPE as PRODUCT_TYPE_API,
    USER_PROFILE as USER_PROFILE_API,
    NETWORK_PROFILE_TYPE as NETWORK_PROFILE_TYPE_API,
    USERS as USERS_API,
    COMMUNITY_MEMBER as COMMUNITY_API,
    PACKAGES as PACKAGES_API,
    COMMERCIAL_MANAGEMENT as COMMERCIAL_MANAGEMENT_API,
    ACCESS as ACCESS_API,
    NOTIFICATIONS as NOTIFICATIONS_API,
    PROJECTS as PROJECTS_API,
    joinBaseUrlWithParams,
    BRANCH, joinBaseUrlWithParamsId,
} from 'Url/backendUrl';

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
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            dispatch({ type: CATALOG_TYPE_FAILURE });
            // NotificationManager.error(error.message);
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
            dispatch({ type: `${typeBase}_SUCCESS`, payload: response.data });
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            dispatch({ type: `${typeBase}_FAILURE` });
            NotificationManager.error(error.message);
            return Promise.reject(error);
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

export const getProductTypes = (branchId) => (dispatch) => {
    const url = `${PRODUCT_TYPE_API.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, PRODUCT_TYPE, dispatch);
};

export const getUserProfiles = (branchId, type) => (dispatch) => {
    const url = `${USER_PROFILE_API.GET_ALL}?branch_id=${branchId}&type=${type}`;
    return makeActionRequest('get', url, USER_PROFILE, dispatch);
};

export const getUserPermissions = (branchId, type) => (dispatch) => {
    const url = `${USER_PROFILE_API.PERMISSIONS.GET_ALL}?branch_id=${branchId}&type=${type}`;
    return makeActionRequest('get', url, USER_PERMISSIONS, dispatch);
};

export const getNetworkProfileTypes = (branchId) => (dispatch) => {
    const url = `${NETWORK_PROFILE_TYPE_API.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, NETWORK_PROFILE_TYPE, dispatch);
};

export const getUsers = (branchId, type) => (dispatch) => {
    const url = `${USERS_API.GET_ALL}?branch_id=${branchId}&type=${type}`;
    return makeActionRequest('get', url, USERS, dispatch);
};

export const getUsersByOrganisation = (organisationId) => (dispatch) => {
    const url = `${USERS_API.GET_ALL_BY_ORGANISATION}?organisation_id=${organisationId}`;
    return makeActionRequest('get', url, USERS, dispatch);
};

export const getUserCommunities = (userId) => (dispatch) => {// we should normally user GROUPS.GET_ALL
    const url = joinBaseUrlWithParamsId(COMMUNITY_API.USER.GROUPS.GET_COMMUNITIES, userId);
    return makeActionRequest('get', url, USER_COMMUNITIES, dispatch);
};

export const getUserCommunitiesAdmin = () => (dispatch) => {
    const url = `${COMMUNITY_API.USER.GROUPS.ADMIN}`;
    return makeActionRequest('get', url, USER_COMMUNITIES_ADMIN, dispatch);
};

export const getUserCommunitiesNotIn = (userId) => (dispatch) => {
    const url = joinBaseUrlWithParamsId(COMMUNITY_API.USER.GROUPS.NOT_IN, userId);
    return makeActionRequest('get', url, USER_COMMUNITIES_NOT_IN, dispatch);
};

export const getInvitationsPending = () => (dispatch) => {
    const url = `${COMMUNITY_API.INVITATIONS.GET_ALL}`;
    return makeActionRequest('get', url, COM_INVITATIONS_PENDING, dispatch);
};

export const setCurrentCommunity = (community) => (dispatch) => {
    dispatch({type: SET_CURRENT_COMMUNITY_SUCCESS, payload: community});
};

export const getMembersOfOneGroup = (group) => (dispatch) => {
    dispatch({ type: SET_CURRENT_COMMUNITY });

    const url = joinBaseUrlWithParams(COMMUNITY_API.USER.GROUPS.GET_MEMBERS, [{
        param: 'id',
        value: group,
    }]);
    return api
        .get(url)
        .then((response) => {
            dispatch({ type: SET_CURRENT_COMMUNITY_SUCCESS, payload: {...group, members: response.data} });
            return Promise.resolve();
        })
        .catch(() => {
            dispatch({ type: SET_CURRENT_COMMUNITY_FAILURE });
            return Promise.reject();
        });
};

export const getPackages = (userId, branchId) => (dispatch) => {
    // const url = `${PACKAGES_API.LIST}?branch_id=${branchId}`;
    const url = `${PACKAGES_API.LIST}?partner_id=${userId}`;
    return makeActionRequest('get', url, PACKAGES, dispatch);
};

export const getComOperationType = (branchId) => (dispatch) => {
    const url = `${COMMERCIAL_MANAGEMENT_API.OPERATION_TYPE.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, COMMERCIAL_OPERATION_TYPE, dispatch);
};

export const getComOperation = (branchId) => (dispatch) => {
    const url = `${COMMERCIAL_MANAGEMENT_API.OPERATION.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, COMMERCIAL_OPERATION, dispatch);
};

export const getComOffer = (partnerId) => (dispatch) => {
    const url = `${COMMERCIAL_MANAGEMENT_API.OFFER.GET_ALL.FOR_PARTNER}?partner_id=${partnerId}`;
    return makeActionRequest('get', url, COMMERCIAL_OFFER, dispatch);
};

export const getProducts = (branchId) => (dispatch) => {
    const url = `${COMMERCIAL_MANAGEMENT_API.OFFER.GET_ALL.PRODUCT_AVAILABLE}?branch_id=${branchId}`;
    return makeActionRequest('get', url, PRODUCT, dispatch);
};

export const getMandateType = (branchId) => (dispatch) => {
    const url = `${ACCESS_API.MANDATE.TYPE.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, MANDATE_TYPE, dispatch);
};

export const getMandateModel = (mandateTypeId, branchId) => (dispatch) => {
    const url = `${ACCESS_API.MANDATE.MODEL.GET_ALL}?mandat_type_id=${mandateTypeId}&branch_id=${branchId}`;
    return makeActionRequest('get', url, MANDATE_MODEL, dispatch);
};

export const getMandate = (branchId) => (dispatch) => {
    const url = `${ACCESS_API.MANDATE.SELF.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, MANDATE, dispatch);
};

export const getMandateOfUser = (userId) => (dispatch) => {
    const url = `${ACCESS_API.MANDATE.SELF.USER.GET_ALL}?user_id=${userId}`;
    return makeActionRequest('get', url, MANDATE, dispatch);
};

export const getBranchUsers = (branchId) => (dispatch) => {
    const url = `${USERS_API.BRANCH_USERS}?branch_id=${branchId}`;
    return makeActionRequest('get', url, BRANCH_USERS, dispatch);
};

export const getModelNotifications = (branchId) => (dispatch) => {
    const url = `${NOTIFICATIONS_API.TYPE.GET_ALL_MODEL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, NOTIFICATION_MODEL, dispatch);
};

export const getServicesNotifications = (branchId) => (dispatch) => {
    const url = joinBaseUrlWithParamsId(NOTIFICATIONS_API.SELF.GET_ALL.BY_BRANCH, branchId);
    return makeActionRequest('get', url, NOTIFICATION_SERVICE, dispatch);
};

export const getAllNotifications = (userId) => (dispatch) => {
    const url = `${NOTIFICATIONS_API.SELF.GET_ALL.SELF}?user_id=${userId}`;
    return makeActionRequest('get', url, NOTIFICATION, dispatch);
};

export const getAllNotificationsByStatus = (userId, status) => (dispatch) => {
    const url = `${NOTIFICATIONS_API.SELF.GET_ALL.SELF}?user_id=${userId}&notification_status=${status}`;
    return makeActionRequest('get', url, NOTIFICATION, dispatch);
};

export const getUsersAccounts = (userId) => (dispatch) => {
    const url = `${USERS_API.ACCOUNTS.GET_ALL}?user_id=${userId}`;
    return makeActionRequest('get', url, USERS_ACCOUNTS, dispatch);
};

export const getUsersAccountsByBranch = (branchId) => (dispatch) => {
    const url = `${USERS_API.ACCOUNTS.GET_ALL_BY_BRANCH}?branch_id=${branchId}`;
    return makeActionRequest('get', url, USERS_ACCOUNTS, dispatch);
};

export const getSampleBranches = (branchId) => (dispatch) => {
    const url = `${BRANCH.SAMPLE.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, SAMPLE_BRANCHES, dispatch);
};

export const getProjectWorks = (branchId) => (dispatch) => {
    const url = joinBaseUrlWithParamsId(PROJECTS_API.CONFIGURATION.WORKS.GET_ALL, branchId);
    return makeActionRequest('get', url, PROJECT_WORKS, dispatch);
};

export const getProjectStandard = (branchId) => (dispatch) => {
    // const url = joinBaseUrlWithParamsId(PROJECTS_API.CONFIGURATION.STANDARD.GET_ALL, branchId);
    const url = `${PROJECTS_API.CONFIGURATION.STANDARD.GET_ALL}?id=${branchId}`;
    return makeActionRequest('get', url, PROJECT_STANDARD, dispatch);
};

/*** ************************************************/
export const getAllPostProject = (branchId) => (dispatch) => {
    const url = joinBaseUrlWithParamsId(PROJECTS_API.POST_PROJETS.GET_ALL, branchId);
    return makeActionRequest('get', url, PROJECTS, dispatch);
};
/**** ******************************************************/
export const getOneProjectStandard = (branchId) => (dispatch) => {
    const url = `${PROJECTS_API.CONFIGURATION.STANDARD.GET_ONE}?id=${branchId}`;
    return makeActionRequest('get', url, PROJECT_STANDARD, dispatch);
};

export const getInitialisationOptions = (type, branchId) => (dispatch) => {
    const url = `${PROJECTS_API.CONFIGURATION.INITIALISATION.GET_ALL}?type=${type}&branch_id=${branchId}`;
    const actionType = type === 'IDEA' ? INITIALISATION_IDEA
        : type === 'PROGRAM'
            ? INITIALISATION_PROGRAM
            : INITIALISATION_PROJECTS_CALL;
    return makeActionRequest('get', url, actionType , dispatch);
};

export const getProjectStandardPresentation = (branchId) => (dispatch) => {
    const url = `${PROJECTS_API.CONFIGURATION.STANDARD.PRESENTATION.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, PROJECT_STANDARD_PRESENTATION, dispatch);
};

export const getProjects = (branchId) => (dispatch) => {
    const url = `${PROJECTS_API.SELF.GET_ALL}?branch_id=${branchId}`;
    return makeActionRequest('get', url, PROJECTS, dispatch);
};

export const getFolders = (userId) => (dispatch) => {
    const url = joinBaseUrlWithParamsId(PROJECTS_API.FOLDERS.GET_ALL, userId);
    return makeActionRequest('get', url, FOLDERS, dispatch);
};
