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
    },
    COVERAGE: '/network/coverage',
    CREATE: '/branch/create',
    EDIT: '/branch/edit',
};
