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
} as const;

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
} as const;

export const PREVISIONS_ADMIN = {
    SELF: '/admin/previsions',
    LIST: '/admin/previsions/list',
    GOALS: {
        SELF: '/admin/previsions/goals',
        LIST: '/admin/previsions/goals/list',
    }
} as const;

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
} as const;

export const CATALOG = {
    PRODUCT: {
        SELF: '/catalog/products',
        LIST: '/catalog/products/list',
        CREATE: '/catalog/products/create',
        PRODUCTS: '/catalog/products/:id/product',
        SHOW: '/catalog/products/show/:id',
    },
    SALE: {
        SELF: '/catalog/sale',
        LIST: '/catalog/sale/list',
        CREATE: '/catalog/sale/create',
        PRODUCTS: '/catalog/sale/:id/product',
        SHOW: '/catalog/sale/show/:id',
    },
} as const;

export const CATEGORY = {
    PRODUCT: {
        SELF: '/category/products',
        LIST: '/category/products/list',
        CREATE: '/category/products/create',
        SHOW: '/category/products/show/:id',
    },
} as const;

export const PRODUCT_TYPE = {
    SELF: '/product-type',
    LIST: '/product-type/list',
    CREATE: '/product-type/create',
    SHOW: '/product-type/show/:id',
} as const;

export const PACKAGES = {
    SELF: '/packages',
    LIST: '/packages/list',
    CREATE: '/packages/create',
    SHOW: '/packages/show/:id',
} as const;

export const ORGANISATIONS = {
    SELF: '/organisations',
    USERS: {
        SELF: '/organisations/users',
        LIST: '/organisations/users/list',
    },
    PROFILES: {
        index: '/organisations/profiles'
    }
} as const;

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
} as const;

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
} as const;

export const PRODUCT = {
    LIST: '/products',
    ORDERS: '/products/orders',
    SHOW: '/products/:id/show/:type',
    SHOW_ACCOUNT: '/products/accounts',
    DETAILS: '/products/:id/details/:type',
    CLASSIC_SALES: '/products/classic-sales',
    ORDERS_SHOW: '/products/orders/:id/show',
    PRIVATE_SALES: '/products/private-sales',
    ACCOUNT_DETAILS: '/products/accounts/:id',
    ACCOUNT_LOGS: '/products/accounts/:id/logs',
    FINANCIAL_SALES: '/products/financial-sales',
    MICROCAP_PRODUCT: '/products/microcap-sales',
    OPERATOR_ORDERS: '/products/orders/operators',
    UNAPPROVED_ORDERS: '/products/orders/unapproved',
    UNCOMPLETE_ACCOUNTS: '/products/accounts/uncomplete',
    UPDATE_UNCOMPLETE_ACCOUNTS: '/products/accounts/uncomplete/:id',
} as const;

export const STORE = {
    SELF: '/store',
    CART: '/store/cart',
    ORDER: '/store/order',
    CHECKOUT: '/store/checkout/:id',
} as const;

export const RESSOURCE = {
    SELF: '/ressources',
    VOUCHERS: '/ressources/vouchers',
    PIECES: '/ressources/pieces',
} as const;

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
} as const;

export const NOTIFICATIONS = {
    SELF: '/notifications',
    LIST: '/notifications/unread',
    READ: '/notifications/read',
    TREATED: '/notifications/treated',
    // CREATE: '/notifications/create',
} as const;

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
} as const;

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
} as const;

export const COMMUNITY_ADMIN = {
    SELF: '/community-t/admin',
    VOUCHER: {
        PAYMENT: '/community-t/admin/members/vouchers/payment',
        CHARCHING: '/community-t/admin/members/vouchers/charging'
    },
    MEMBERS: {
        SELF: '/community-t/admin/members',
        LIST: '/community-t/admin/members/list',
        INVITATION: '/community-t/admin/members/invitation'
    },
    POST: {
        SELF: '/community-t/admin/user-category',
        LIST: '/community-t/admin/user-category/list',
        CREATE: '/community-t/admin/user-category/create',
        MOTIVATION: {
            LIST: '/community-t/admin/user-category/post/:postId/list',
            CREATE: '/community-t/admin/user-category/post/:postId/create',
        }
    },
    RUBRIQUE: {
        SELF: '/community-t/admin/rubrique',
        LIST: '/community-t/admin/rubrique/list',
        CREATE: '/community-t/admin/rubrique/create',
    },
    OPERATOR: {
        SELF: '/community-t/admin/operateur',
        LIST: '/community-t/admin/operateur/list',
        SUPERVISION: {
            SELF: '/community-t/admin/operateur/supervision',
            COMMUNITIES: '/community-t/admin/operateur/supervision/communities',
        }
    },
    PROJECT: {
        SELF: '/community-t/admin/project',
        CREATE: '/community-t/admin/project/create',
    },
    INVITATIONS: {
        SELF: '/community-t/admin/members/invitation',
        LIST: {
            SEND: '/community-t/admin/members/invitation/send',
            RECEIVED: '/community-t/admin/members/invitation/integration-request',
        },
        CREATE: '/community-t/admin/members/invitation/create'
    },
} as const;

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
    },
    PROJECTS: {
        SELF: '/community-t/admin/projects',
        SHOW: '/community-t/admin/projects/show',
        GALLERY: '/community-t/admin/projects/gallery',
        UPDATE: '/community-t/admin/projects/update',
    },
    INVITATIONS: {
        SELF: '/community-t/members/invitation',
        LIST: {
            SEND: '/community-t/members/invitation/send',
            RECEIVED: '/community-t/members/invitation/integration-request',
        },
        CREATE: '/community-t/members/invitation/create'
    },
} as const;

export const COMMUNITY_MEMBER = {
    SELF: '/community',
    GROUPS: {
        SELF: '/community/groups',
        LIST: '/community/groups/list',
        ME: '/community/groups/me',
        PENDING: '/community/groups/pending',
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
} as const;

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
    },
    SUPERVISION: {
        SELF: '/supervision',
        COMMUNITIES: '/supervision/communities'
    }
} as const;

export const STOCK = {
    SELF: '/stocks',
    OPPORTUITY: {
        SELF: '/stocks/oppotunities',
    },
    FINANCIAL: {
        SELF: '/stocks/financials',
        PROJECT_SHOW: '/stocks/financials/project/:id',
    }
} as const;

export const BROKER = {
    SELF: '/broker',
    AGENCIES: {
        SELF: '/broker/agencies',
        LIST: '/broker/agencies/list',
        CREATE: '/broker/agencies/create',
        USERS: '/broker/agencies/users/list',
        MOUVEMENTS: '/broker/agencies/:id/mouvements',
    },
    COUNTERS: {
        SELF: '/broker/counters',
        LIST: '/broker/counters/list',
        CREATE: '/broker/counters/create',
        USERS: '/broker/counters/users/list',
        MOUVEMENTS: '/broker/counters/:id/mouvements',
    },
    CASHDESKS: {
        SELF: '/broker/cashdesks',
        LIST: '/broker/cashdesks/list',
        CREATE: '/broker/cashdesks/create',
        USERS: '/broker/cashdesks/users/list',
        MOUVEMENTS: '/broker/cashdesks/:id/mouvements',
    }
} as const;

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



export const USER_ACCOUNT_TYPE = {
    SELF: '/user-account-types',
    ROLE: {
        SELF: '/user-account-types/roles',
        LIST: '/user-account-types/roles/list',
        CREATE: '/user-account-types/roles/create',
    },
    TYPE: {
        SELF: '/user-account-types/types',
        LIST: '/user-account-types/types/list',
        CREATE: '/user-account-types/types/create',
    },
    CATEGORY: {
        SELF: '/user-account-types/categories',
        LIST: '/user-account-types/categories/list',
        CREATE: '/user-account-types/categories/create',
        UPDATE: (id) => `/user-account-types/categories/${id}/update`
    }
}

export const GROUP = {
    SELF: '/groups',
    ROLE: {
        SELF: '/groups/roles',
        LIST: '/groups/roles/list',
        CREATE: '/groups/roles/create'
    },
    TYPE: {
        SELF: '/groups/types',
        LIST: '/groups/types/list',
        CREATE: '/groups/types/create'
    },
    DETAILS: {
        SELF: '/groups/details',
        VIEW: '/groups/details/:id/view',
        VIEW_SELF: '/groups/details/view',
        MEMBERS: '/groups/details/members',
    },
    CATEGORY: {
        SELF: '/groups/categories',
        LIST: '/groups/categories/list',
        CREATE: '/groups/categories/create'
    },
    COMMUNITY: {
        SELF: '/groups/communities',
        SPACE: {
            SELF: '/groups/communities/space',
            ALL: '/groups/communities/space/all',
            MINE: '/groups/communities/space/mine',
            REQUEST: '/groups/communities/space/requests'
        },
        MANAGEMENT: {
            SELF: '/groups/communities/management',
            CREATE: '/groups/communities/management/create',
        }
    },
    ADMINISTRATION: {
        SELF: '/groups/administration',
        MEMBER: {
            SELF: '/groups/administration/members',
            LIST: '/groups/administration/members/list',
            CREATE: '/groups/administration/members/create'
        },
        REQUEST: {
            SELF: '/groups/administration/requests',
            JOIN: '/groups/administration/requests/joins',
            INVITATION: '/groups/administration/requests/invitations',
        },
        ROLE: {
            SELF: '/groups/administration/roles',
            LIST: '/groups/administration/roles/list',
            CREATE: '/groups/administration/roles/create'
        },
        PARAMETER: {
            SELF: '/groups/administration/settings',
            CREATE: '/groups/administration/settings/update'
        },
    }
}

export const PROFILE = {
    SELF: "/profiles",
    USER: {
        SELF: "/profiles/users",
        ACCESS: "/profiles/users/access",
        PERSONAL: "/profiles/users/personal",
    }
}