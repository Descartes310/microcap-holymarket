import { BASE } from "Url/backendUrl";

export const ROOT = '/';
export const HOME = '/home';
export const DISCOVER = '/discover';
export const AUTH = {
    LOGIN: '/login',
    REGISTER: '/register',
    TOKEN: '/branch/activation',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
};

export const NETWORK = {
    LIST: '/branch',
    ACTIVATION: '/branches/activation',
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
    ONGOING_CREATE: '/branch/ongoing/create',
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
        USERS_PERMISSION: {
            SELF: '/users-profile/users-permission',
            LIST: '/users-profile/users-permission/list',
            CREATE: '/users-permission/create',
        },
    },
    ACCOUNTS: {
        SELF: '/users-accounts',
        LIST: '/users-accounts/list',
        CREATE: '/users-accounts/create',
    }
};

export const COMMUNITY_MEMBER = {
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

export const PRODUCT = {
    LIST: '/products',
    SHOW: '/products/:id/show',
};

export const STORE = {
    SELF: '/store',
    CART: '/store/cart',
    CHECKOUT: '/store/checkout/:id',
};

export const ACCESS = {
    SELF: '/access',
    LIST: '/access/list',
    CREATE: '/access/create',
    MANDATE: {
        SELF: {
            SELF: '/access/mandate/mandate',
            LIST: '/access/mandate//mandate/list',
            CREATE: '/access/mandate/mandate/create',
        },
        MODEL: {
            SELF: '/access/mandate/model',
            LIST: '/access/mandate/model/list',
            CREATE: '/access/mandate/model/create',
        },
        TYPE: {
            SELF: '/access/mandate/type',
            LIST: '/access/mandate/type/list',
            CREATE: '/access/mandate/type/create',
        },
    }
};

export const NOTIFICATIONS = {
    SELF: '/notifications',
    LIST: '/notifications/list',
    // CREATE: '/notifications/create',
};

export const SETTINGS = {
    NOTIFICATION: {
        SELF: '/settings/notifications',
        MODEL: {
            SELF: '/settings/notifications/model',
            LIST: '/settings/notifications/model/list',
            CREATE: '/settings/notifications/model/create',
        },
        SERVICE: {
            SELF: '/settings/notifications/service',
            LIST: '/settings/notifications/service/list',
            CREATE: '/settings/notifications/service/create',
        }
    }
};

export const PROJECTS = {
    SELF: '/projects',
    FOLDERS: {
        SELF: '/projects/folder',
        LIST: '/projects/folder/list',
        SHOW: '/projects/folder/:id',
        CREATE: '/projects/folder/create',
    },
    PROJECTS: {
        LIST: '/projects/list',
        CREATE: '/projects/create',
        EDITION: {
            SELF: '/projects/edition',
            ARTICLE: '/projects/edition/article',
            ILLUSTRATION: '/projects/edition/illustration',
        },
        CONSULTATION: '/projects/consultation'
    },
    POST_PROJETS: {
        LIST: '/projects/post-projects/list',
        CREATE: '/projects/post-projects/create',
    },
    CONFIGURATION: {
        SELF: '/projects/configuration',
        STANDARD: {
            SELF: '/projects/configuration/standard',
            LIST: '/projects/configuration/standard/list',
            CREATE: '/projects/configuration/standard/create',
            CONFIGURATION: '/projects/configuration/standard/:id/configuration',
            PRESENTATION: {
                SELF: '/projects/configuration/standard/presentation',
                LIST: '/projects/configuration/standard/presentation/list',
                CREATE: '/projects/configuration/standard/presentation/create',
            }
        },
        WORKS: {
            SELF: '/projects/configuration/works',
            LIST: '/projects/configuration/works/list',
            CREATE: '/projects/configuration/works/create',
        },
        INITIALISATION: {
            SELF: '/projects/configuration/initialisation-options',
            IDEA: {
                SELF: '/projects/configuration/initialisation-options/idea',
                LIST: '/projects/configuration/initialisation-options/idea/list',
                CREATE: '/projects/configuration/initialisation-options/idea/create',
            },
            PROJECTS_CALL: {
                SELF: '/projects/configuration/initialisation-options/projects-call',
                LIST: '/projects/configuration/initialisation-options/projects-call/list',
                CREATE: '/projects/configuration/initialisation-options/projects-call/create',
            },
            PROGRAM: {
                SELF: '/projects/configuration/initialisation-options/program',
                LIST: '/projects/configuration/initialisation-options/program/list',
                CREATE: '/projects/configuration/initialisation-options/program/create',
            },
            LIST: '/projects/configuration/works/list',
            CREATE: '/projects/configuration/works/create',
        }
    },
};

export const COMMUNITY = {
    SELF: '/community-t',
    POST_PROJECT: {
        SELF: '/community-t/projects',
        LIST: '',
        CREATE: ''
    },
    MEMBERS: {
        SELF: '/community-t/members',
        LIST: '/community-t/members/list',
        INVITATION: '/community-t/members/invitation'
    },
    ACTIVITY: {
        SELF: '/community-t/activities',
        LIST: '',
        CREATE: ''
    }
};


export const MICROCAP360 = {
    MICROCAP360: '/microcap360',
    COMPTES: {
        SELF: '/microcap360/accounts',
    },
    PROJECTS: {
        SELF: '/microcap360/projects',
    },
    RESEAU: {
        SELF: '/community',
    }
};


export const joinUrlWithParams = (to, params) => {
    let url = to;
    params.forEach(param => {
        url = url.replace(`:${param.param}`, `${encodeURIComponent(param.value)}`);
    });

    return url;
};

export const joinUrlWithParamsId = (to, id) => {
    return joinUrlWithParams(to, [{ param: 'id', value: id }]);
};
