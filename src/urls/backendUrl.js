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
    IDENTIFICATION: '/public/system/objects/identification-type',
    REGISTRATION_TYPE: '/public/system/objects/immatriculation-type',
    ORGANISATION: '/public/system/objects/organisation-legal-form',
    ORGANISATION_POST: '/public/system/objects/organisation-post'
};

export const BRANCH = {
    CREATE: '/public/branchs',
    GET_ALL: '/public/branchs'
};

export const joinBaseUrl = to => BASE + to;

export const joinBaseUrlWithParams = (to, params) => {
    let url = BASE + to;

    params.forEach(param => {
        url = url.replace(`{${param.param}}`, `${encodeURIComponent(param.value)}`);
    });

    return url;
};
