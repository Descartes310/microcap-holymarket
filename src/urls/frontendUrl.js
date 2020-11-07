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
        NETWORK_PROFILE_TYPE: {
            SELF: '/network/configuration/network-profile-type',
            LIST: '/network/configuration/network-profile-type/list',
            CREATE: '/network/configuration/network-profile-type/create',
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
    SALE: {
        SELF: '/catalog/sale',
        LIST: '/catalog/sale/list',
        CREATE: '/catalog/sale/create',
        SHOW: '/catalog/sale/show/:id',
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

export const PACKAGES = {
    SELF: '/packages',
    LIST: '/packages/list',
    CREATE: '/packages/create',
    SHOW: '/packages/show/:id',
};

export const USERS = {
    USERS: {
        SELF: '/users',
        LIST: '/users/list',
        CREATE: '/users/create',
    },
    USERS_PROFILE: {
        SELF: '/users-profile',
        LIST: '/users-profile/list',
        CREATE: '/users-profile/create',
    },
};

export const COMMUNITY = {
    SELF: '/community',
    GROUPS: {
        SELF: '/community/groups',
        LIST: '/community/groups/list',
        ME: '/community/groups/me',
        CREATE: '/community/groups/create',
    },
    INVITATIONS: {
        SELF: '/community/invitations',
        LIST: {
            SEND: '/community/invitations/send',
            RECEIVED: '/community/invitations/list',
            REQUEST: '/community/invitations/integration-request',
        },
        CREATE: '/community/invitations/create'
    },
};

export const COMMERCIAL_MANAGEMENT = {
    COMMERCIAL_OFFER: {
        SELF: '/commercial/offer',
        LIST: '/commercial/offer/list',
        CREATE: '/commercial/offer/create',
    },
    COMMERCIAL_OPERATION: {
        SELF: '/commercial/operation',
        LIST: '/commercial/operation/list',
        CREATE: '/commercial/operation/create',
    },
    COMMERCIAL_OPERATION_TYPE: {
        SELF: '/commercial/operation-type',
        LIST: '/commercial/operation-type/list',
        CREATE: '/commercial/operation-type/create',
    },
};

export const joinUrlWithParams = (to, params) => {
    let url = to;
    params.forEach(param => {
        url = url.replace(`:${param.param}`, `${encodeURIComponent(param.value)}`);
    });

    return url;
};
