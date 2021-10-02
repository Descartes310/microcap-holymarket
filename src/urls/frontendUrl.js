import { BASE } from "Url/backendUrl";

export const ROOT = '/';
export const HOME = '/home';
export const DISCOVER = '/discover';
export const MISSION = '/mission-microcap';
export const VALUES = '/reseau-microcap';
export const GETIN = '/get-in';
export const PIONIERS = '/pioniers';
export const AGENTS = '/agents';
export const SERVICES = '/services';
export const CGU = '/cgu';
export const PASS_DETAILS = '/pass-details';
export const SOLIDARITY = '/solidarity';
export const MONEY_MANAGEMENT = '/money-management';
export const GALERY_PROJECT = '/projects-gallery';
export const TERMS = '/conditions-generales-d-utilisation';
export const LEGAL_MENTION = '/mentions-legales';
export const SONDAGE_FIRST = '/sondages';
export const SONDAGE_SECOND = '/sondages/continue/:id';

export const AUTH = {
    LOGIN: '/login',
    REGISTER: '/register',
    TOKEN: '/branch/activation',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
};

export const PREVISIONS = {
    SELF: '/previsions',
    LIST: '/previsions/list',
    CREATE: '/previsions/create',
    INFOS: '/previsions/client/infos',
    GOALS: '/previsions/client/goals',
    PERIODES: {
        LIST: '/previsions/:id/periodes/list',
        DETAILS: '/previsions/:id/periodes/:id2',
        CREATE: '/previsions/:id/periodes/create',
    }
};

export const PREVISIONS_ADMIN = {
    SELF: '/admin/previsions',
    LIST: '/admin/previsions/list',
    GOALS: {
        SELF: '/admin/previsions/goals',
        LIST: '/admin/previsions/goals/list',
    }
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
    COVERAGE_TABS: {
        AREA: '/network/coverage/areas',
        AREA_TYPE: '/network/coverage/area-types',
        PARTNER: '/network/coverage/partners'
    },

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
        PERSONNAL_SPACE: '/personal-space'
    },
    USERS_PROFILE: {
        SELF: '/users-profile',
        LIST: '/users-profile/list',
        CREATE: '/users-profile/create',
        PROFILE: '/users-profile/profile',
        DISPLAY_PROFILE: '/users-profile/display-profile',
        SHOW_PROFILE: '/users-profile/display-profile/:id',
        USERS_PERMISSION: {
            SELF: '/users-profile/users-permission',
            LIST: '/users-profile/users-permission/list',
            CREATE: '/users-permission/create',
        },
    },
    ACCOUNTS: {
        SELF: '/users-accounts',
        LIST: '/users-accounts/list',
        ALL: '/all-users',
        CREATE: '/users-accounts/create',
    },
};

export const COMMERCIAL_MANAGEMENT = {
    COMMERCIAL_OFFER: {
        SELF: '/commercial/offer',
        LIST: '/commercial/offer/list',
        CREATE: '/commercial/offer/create',
        ADD_PRODUCT: '/commercial/offer/:id/add-product'
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
    CLASSIC_SALES: '/products/classic-sales',
    PRIVATE_SALES: '/products/private-sales',
    FINANCIAL_SALES: '/products/financial-sales',
    MICROCAP_PRODUCT: '/products/microcap-sales',
    ORDERS: '/products/orders',
    UNAPPROVED_ORDERS: '/products/orders/unapproved',
    OPERATOR_ORDERS: '/products/orders/operators',
    ORDERS_SHOW: '/products/orders/:id/show',
    SHOW: '/products/:id/show/:type',
    DETAILS: '/products/:id/details/:type',
    SHOW_ACCOUNT: '/products/accounts',
    ACCOUNT_DETAILS: '/products/accounts/:id',
    ACCOUNT_LOGS: '/products/accounts/:id/logs',
};

export const STORE = {
    SELF: '/store',
    CART: '/store/cart',
    ORDER: '/store/order',
    CHECKOUT: '/store/checkout/:id',
};

export const RESSOURCE = {
    SELF: '/ressources',
    VOUCHERS: '/ressources/vouchers',
    PIECES: '/ressources/pieces',
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
    LIST: '/notifications/unread',
    READ: '/notifications/read',
    TREATED: '/notifications/treated',
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
    },
    USERPIECE: {
        SELF: '/settings/users-pieces'
    },
    CONFIGS: {
        SELF: '/settings/configurations'
    },
    UNITS: {
        SELF: '/settings/units',
        TYPE: '/settings/units/types',
        VALUE: '/settings/units/values'
    },
    POST: {
        SELF: '/settings/posts',
        LIST: '/settings/posts/list',
        CREATE: '/settings/posts/create',
        MOTIVATION: {
            LIST: '/settings/posts/:id/list',
            CREATE: '/settings/posts/:id/create',
        }
    },
    AGENTS: {
        SELF: '/settings/agents',
    },
    PIONIERS: {
        SELF: '/settings/pioniers',
    }
};

export const PROJECTS = {
    SELF: '/projects',
    FOLDERS: {
        SELF: '/projects/folder',
        SHOW: '/projects/folder/:id',
        GALLERY: '/projects/folder/:id/gallery',
        UPDATE: '/projects/folder/:id/update',
        WORK: '/projects/folder/:id/works',
        CREATE: '/projects/folder/create',
        REACTIONS: {
            LIST: '/projects/folder/reactions/list',
            CREATE: '/projects/folder/reactions/create',
            CONSULTATION: '/projects/folder/reactions/consultation'
        },
        WORKS: {
            SELF: '/projects/folder/works',
            LIST: '/projects/folder/works/list',
            CREATE: '/projects/folder/works/create',
            UPDATE: '/projects/folder/works/:id/update',
        },
        PROJECTS: {
            SELF: '/projects/folder/projects',
            LIST: '/projects/folder/projects/list',
            IDEAS: '/projects/folder/projects/ideas/list',
            CREATE_IDEAS: '/projects/folder/projects/ideas/create',
        }
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
            SIMPLE: {
                SELF: '/projects/configuration/works/simple',
                LIST: '/projects/configuration/works/simple/list',
                CREATE: '/projects/configuration/works/simple/create',
                UPDATE: '/projects/configuration/works/simple/:id/update',
            },
            COMPLEX: {
                SELF: '/projects/configuration/works/complex',
                LIST: '/projects/configuration/works/complex/list',
                CREATE: '/projects/configuration/works/complex/create',
            }
        },
        INITIALISATION: {
            SELF: '/projects/configuration/initialisation-options',
            UPDATE: '/projects/configuration/initialisation-options/:id/update',
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

export const COMMUNITY_ADMIN = {
    SELF: '/community-t/:id/admin',
    VOUCHER: {
        PAYMENT: '/community-t/:id/admin/members/vouchers/payment',
        CHARCHING: '/community-t/:id/admin/members/vouchers/charging'
    },
    MEMBERS: {
        SELF: '/community-t/:id/admin/members',
        LIST: '/community-t/:id/admin/members/list',
        INVITATION: '/community-t/:id/admin/members/invitation'
    },
    POST: {
        SELF: '/community-t/:id/admin/user-category',
        LIST: '/community-t/:id/admin/user-category/list',
        CREATE: '/community-t/:id/admin/user-category/create',
        MOTIVATION: {
            LIST: '/community-t/:id/admin/user-category/post/:postId/list',
            CREATE: '/community-t/:id/admin/user-category/post/:postId/create',
        }
    },
    RUBRIQUE: {
        SELF: '/community-t/:id/admin/rubrique',
        LIST: '/community-t/:id/admin/rubrique/list',
        CREATE: '/community-t/:id/admin/rubrique/create',
    },
    OPERATOR: {
        SELF: '/community-t/:id/admin/operateur',
        LIST: '/community-t/:id/admin/operateur/list',
        SUPERVISION: {
            SELF: '/community-t/:id/admin/operateur/supervision',
            COMMUNITIES: '/community-t/:id/admin/operateur/supervision/communities',
        }
    },
    PROJECT: {
        SELF: '/community-t/:id/admin/project',
        CREATE: '/community-t/:id/admin/project/create',
    },
    INVITATIONS: {
        SELF: '/community-t/:id/admin/members/invitation',
        LIST: {
            SEND: '/community-t/:id/admin/members/invitation/send',
            RECEIVED: '/community-t/:id/admin/members/invitation/integration-request',
        },
        CREATE: '/community-t/:id/admin/members/invitation/create'
    },
};

export const COMMUNITY = {
    SELF: '/community-t/:id',
    POST_PROJECT: {
        SELF: '/community-t/:id/projects',
        LIST: '',
        CREATE: ''
    },
    MEMBERS: {
        SELF: '/community-t/:id/members',
        LIST: '/community-t/:id/members/list',
        INVITATION: '/community-t/:id/members/invitation'
    },
    ACTIVITY: {
        SELF: '/community-t/activities',
        LIST: '',
        CREATE: ''
    },
    PROJECTS: {
        SELF: '/community-t/:id/admin/projects',
        SHOW: '/community-t/:id/admin/projects/show',
        GALLERY: '/community-t/:id/admin/projects/gallery',
        UPDATE: '/community-t/:id/admin/projects/update',
    },
    INVITATIONS: {
        SELF: '/community-t/:id/members/invitation',
        LIST: {
            SEND: '/community-t/:id/members/invitation/send',
            RECEIVED: '/community-t/:id/members/invitation/integration-request',
        },
        CREATE: '/community-t/:id/members/invitation/create'
    },
};

export const COMMUNITY_MEMBER = {
    SELF: '/community',
    GROUPS: {
        SELF: '/community/groups',
        LIST: '/community/groups/list',
        ME: '/community/groups/me',
        CHAT: '/community/groups/chats',
        FAVOURITES: '/community/groups/favourites',
        CREATE: '/community/groups/create',
    },
    INVITATIONS: {
        SELF: '/community/invitation',
        LIST: {
            RECEIVED: '/community/invitation/list',
            REQUEST: '/community/invitation/integration-request',
        },
    },
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
    },
    MY: {
        SELF: '/microcap360/personnal',
        PASS: '/microcap360/personnal/pass',
        PROJECT: '/microcap360/personnal/project',
    }
};

export const STOCK = {
    SELF: '/stocks',
    OPPORTUITY: {
        SELF: '/stocks/oppotunities',
    },
    FINANCIAL: {
        SELF: '/stocks/financials',
        PROJECT_SHOW: '/stocks/financials/project/:id',
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
