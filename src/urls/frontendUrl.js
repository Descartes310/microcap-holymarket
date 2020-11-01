import {BASE} from "Url/backendUrl";

export const HOME = '/';
export const AUTH = {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
};

export const NETWORK = {
    LIST: '/branch',
    SHOW: '/branch/:id',
    CONFIGURATION: {
        SELF: '/network/configuration',
        NETWORK_PROFILE: {
            SELF: '/network/configuration/network-profile',
            LIST: '/network/configuration/network-profile/list',
            CREATE: '/network/configuration/network-profile/create',
        },
        NETWORK_PRIMARY: {
            SELF: '/network/configuration/network-primary',
            ADD_PARTNERSHIP: '/network/configuration/network-primary/partner/add',
            CREATE: '/network/configuration/network-profile/create',
        },
        ASSISTANT_CONFIGURATION: {
            SELF: '/network/configuration/assistant',
            LIST: '/network/configuration/assistant/list',
            CREATE: '/network/configuration/assistant/create',
        },
    },
    COVERAGE: '/network/coverage',
    CREATE: '/branch/create',
    EDIT: '/branch/edit',
};

export const CATALOG = {
    PRODUCT: {
        SELF: '/catalog/products',
        LIST: '/catalog/products/list',
        CREATE: '/catalog/products/create',
        SHOW: '/catalog/products/show/:id',
    },
};

export const CATEGORY = {
    PRODUCT: {
        SELF: '/category/products',
        LIST: '/category/products/list',
        CREATE: '/category/products/create',
        SHOW: '/category/products/show/:id',
    },
};

export const PRODUCT_TYPE = {
    SELF: '/product-type',
    LIST: '/product-type/list',
    CREATE: '/product-type/create',
    SHOW: '/product-type/show/:id',
};

export const USERS = {
    USERS: {
        SELF: '/users'
    },
    USERS_PROFILE: {
        SELF: '/users-profile',
        LIST: '/users-profile/list',
        CREATE: '/users-profile/create',
    },
};

export const joinUrlWithParams = (to, params) => {
    let url = to;
    params.forEach(param => {
        url = url.replace(`:${param.param}`, `${encodeURIComponent(param.value)}`);
    });

    return url;
};
