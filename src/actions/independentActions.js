import api from 'Api';
import {
    AUTH,
    SYSTEM_OBJECT,
    joinBaseUrlWithParams,
    BRANCH,
    NETWORK_PROFILE,
    CATALOGS,
    CATEGORY_PRODUCTS,
    PRODUCT_TYPE,
    USER_PROFILE
} from "Url/backendUrl";

export const getResidenceCountries = () => {
    return new Promise((resolve, reject) => {
        api.get(AUTH.COUNTRY.LIST)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getOperators = (country) => {
    return new Promise((resolve, reject) => {
        const url = joinBaseUrlWithParams(AUTH.COUNTRY.OPERATORS, [{
            param: 'country',
            value: country,
        }]);
        api.get(url)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getIdentificationType = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.IDENTIFICATION)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getRegistrationType = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.REGISTRATION_TYPE)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getOrganisationTypes = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.ORGANISATION)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getOrganisationPosts = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.ORGANISATION_POST)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const sendResetPasswordLink = (email) => {
    return new Promise((resolve, reject) => {
        /*const url = joinBaseUrlWithParams(AUTH.RESET_PASSWORD.LINK, [{
            param: 'email',
            value: email,
        }]);*/
        const url = AUTH.RESET_PASSWORD.LINK + `?email=${email}`;

        api.get(url)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const resetPassword = (data) => {
    return new Promise((resolve, reject) => {
        api.post(AUTH.RESET_PASSWORD.MAIN, data)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createBranch = (data, config) => {
    return new Promise((resolve, reject) => {
        api.post(BRANCH.CREATE, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createNetworkProfilePartnership = (data, config) => {
    return new Promise((resolve, reject) => {
        api.post(NETWORK_PROFILE.PARTNERSHIP.CREATE, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createAssistantConfiguration = (data, config) => {
    return new Promise((resolve, reject) => {
        api.post(NETWORK_PROFILE.PARTNERSHIP.ASSISTANT.CREATE, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getNetworkProfileType = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.NETWORK_PROFILE_TYPE)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createNetworkProfileType = (data) => {
    return new Promise((resolve, reject) => {
        api.post(NETWORK_PROFILE.CREATE, data)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

const makeRequest = (verb, url, data = null, config = {}) => {
    return new Promise((resolve, reject) => {
        api[verb](url, data)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const setNetworkProfileConfigurationState = (shouldStart, id) => {
    const url = joinBaseUrlWithParams(BRANCH.CONFIGURATION[shouldStart ? 'START' : 'STOP'], [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('put', url);
};

export const getNetworkProfilePartnership = (branchId) => {
    return new Promise((resolve, reject) => {
        api.get(NETWORK_PROFILE.PARTNERSHIP.GET_ALL)
            .then(result => {
                const partner = result.data.filter(p => p.branch.id === branchId);
                resolve(partner);
            })
            .catch(error => reject(error));
    });
};

export const getAllNetworkProfilePartnershipForOneBranch = (branchId) => {
    return makeRequest('get', `${NETWORK_PROFILE.PARTNERSHIP.BRANCH_ALL}?branch_id=${branchId}`);
};

export const getAllAssistantForOneBranch = (branchId) => {
    return makeRequest('get', `${NETWORK_PROFILE.PARTNERSHIP.ASSISTANT.LIST}?branch_id=${branchId}`);
};

export const setActiveCatalog = (catalogId) => {
    const url = joinBaseUrlWithParams(CATALOGS.ACTIVATE, [{
        param: 'id',
        value: catalogId,
    }]);
    return makeRequest('get', url);
};

export const createCatalog = (data, branchId) => {
    const url = `${CATALOGS.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const addProductsToOneCatalog = (data, catalogId, branchId) => {
    let url = joinBaseUrlWithParams(CATALOGS.TYPE_PRODUCTS.ADD, [{
        param: 'id',
        value: catalogId,
    }]);
    url = `${url}?type_products=${encodeURIComponent(data)}`;
    return makeRequest('post', url, null, {shouldSkipDataParsing: true});
};

export const removeProductsToOneCatalog = (data, catalogId, branchId) => {
    let url = joinBaseUrlWithParams(CATALOGS.TYPE_PRODUCTS.REMOVE, [{
        param: 'id',
        value: catalogId,
    }]);
    url = `${url}?type_products=${encodeURIComponent(data)}`;
    return makeRequest('post', url, null, {shouldSkipDataParsing: true});
};

export const getOneCatalog = (catalogId) => {
    let url = joinBaseUrlWithParams(CATALOGS.GET_ONE, [{
        param: 'id',
        value: catalogId,
    }]);
    return makeRequest('get', url);
};

export const createCategoryProducts = (data, branchId) => {
    const url = `${CATEGORY_PRODUCTS.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createProductType = (data, branchId) => {
    const url = `${PRODUCT_TYPE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createUserProfile = (data, branchId) => {
    const url = `${USER_PROFILE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};
