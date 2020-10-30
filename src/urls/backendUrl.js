import AppConfig from 'Constants/AppConfig';

export const BASE = `${AppConfig.api.baseUrl}`;

const shouldHavePublic = true;

const publicPrefix = shouldHavePublic ? 'public/' : '';

export const AUTH = {
    LOGIN: 'oauth/token',
    COUNTRY: {
        LIST: 'auth/countries',
        OPERATORS: 'auth/countries/{country}/microcap-operators'
    },
    REGISTER: {
        PERSON: publicPrefix + 'users/persons',
        ORGANISATION: publicPrefix + 'users/organisations'
    },
    RESET_PASSWORD: {
        MAIN: 'auth/reset-password',
        LINK: 'auth/send-reset-password-link',
    },
};

export const PROFILE = {
    INFORMATION: 'auth/me',
};

export const SYSTEM_OBJECT = {
    IDENTIFICATION: 'public/system/objects/identification-type',
    REGISTRATION_TYPE: 'public/system/objects/immatriculation-type',
    ORGANISATION: 'public/system/objects/organisation-legal-form',
    ORGANISATION_POST: 'public/system/objects/organisation-post',
    NETWORK_PROFILE_TYPE: 'public/system/objects/network-profile-type',
};

export const BRANCH = {
    CREATE: 'public/branchs',
    GET_ALL: 'public/branchs',
    CONFIGURATION: {
        START: 'public/branchs/start/configurations/{id}',
        STOP: 'public/branchs/close/configurations/{id}',
    },
    PRODUCTS: {
        GET_ALL: '/public/type-products/get-all',
    }
};
export const NETWORK_PROFILE = {
    CREATE: 'public/network-profile',
    GET_ALL: 'public/network-profile',
    PARTNERSHIP: {
        GET_ALL: 'public/network-profile/partership',
        CREATE: 'public/network-profile/partership',
        BRANCH_ALL: 'public/network-profile/partership/all',
        ASSISTANT: {
            CREATE: 'public/network-profile/partner/assistant',
            LIST: 'public/network-profile/partner/assistant',
        },
    }
};

export const CATALOGS = {
    GET_ALL: 'public/catalogs',
    CREATE: 'public/catalogs',
    GET_ONE: 'public/catalogs/{id}',
    EDIT: 'public/catalogs/{id}',
    TYPE_PRODUCTS: {
        ADD: 'public/catalogs/{id}/add-type-products',
        REMOVE: 'public/catalogs/{id}/remove-type-products',
        GET: 'public/catalogs/{id}/type-products',
    },
    ACTIVATE: 'public/catalogs/active/{id}'
};

export const CATALOGS_TYPE = {
    GET_ALL: 'public/type-catalogs/catalogs',
};
export const CATEGORY_PRODUCTS = {
    ROOT: 'public/category-products/root',
    GET_ALL: 'public/category-products',
    CREATE: 'public/category-products',
    GET_ONE: 'public/category-products/{id}',
    TYPE_PRODUCTS: 'public/type-catalogs/type-products',
    SUB_CATEGORY: 'public/category-products/{id}/category-products',
};

export const joinBaseUrl = to => BASE + to;

export const joinBaseUrlWithParams = (to, params) => {
    let url = BASE + to;

    params.forEach(param => {
        url = url.replace(`{${param.param}}`, `${encodeURIComponent(param.value)}`);
    });

    return url;
};
