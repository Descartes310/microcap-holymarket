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

export const NOTIFICATIONS = {
    SELF: '/notifications',
    LIST: '/notifications/unread',
    READ: '/notifications/read',
    TREATED: '/notifications/treated'
} as const;


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

export const MARKETPLACE = {
    SELF: "/marketplace",
    SHOP: "/marketplace/shop",
    CATAlOG: {
        SELF: "/marketplace/catalogs",
        PRODUCTS: `/marketplace/catalogs/:id/products`,
        SALE: {
            SELF: "/marketplace/catalogs/sales",
            LIST: "/marketplace/catalogs/sales/list",
            CREATE: "/marketplace/catalogs/sales/create",
        },
        DISTRIBUTION: {
            SELF: "/marketplace/catalogs/distributions",
            LIST: "/marketplace/catalogs/distributions/list",
            CREATE: "/marketplace/catalogs/distributions/create"
        }
    },
    COMMERCIAL: {
        SELF: "/marketplace/commercials",
        OPERATION_TYPE: {
            SELF: "/marketplace/commercials/operations/types",
            LIST: "/marketplace/commercials/operations/types/list",
            CREATE: "/marketplace/commercials/operations/types/create"
        },
        OPERATION: {
            SELF: "/marketplace/commercials/operations",
            LIST: "/marketplace/commercials/operations/list",
            CREATE: "/marketplace/commercials/operations/create"
        },
        OFFER: {
            SELF: "/marketplace/commercials/operations/offers",
            LIST: "/marketplace/commercials/operations/offers/list",
            CREATE: "/marketplace/commercials/operations/offers/create"
        }
    },
    CATEGORY: {
        SELF: "/marketplace/categories",
        LIST: "/marketplace/categories/list",
        CREATE: "/marketplace/categories/create",
    },
    MODEL: {
        SELF: "/marketplace/models",
        PRODUCT: {
            SELF: "/marketplace/models/products",
            LIST: "/marketplace/models/products/list",
            CREATE: "/marketplace/models/products/create",
        },
        PACKAGE: {
            SELF: "/marketplace/models/packages",
            LIST: "/marketplace/models/packages/list",
            CREATE: "/marketplace/models/packages/create",
        }
    },
    STORE: {
        SELF: "/marketplace/store",
        PRODUCT: {
            SELF: "/marketplace/store/products",
            LIST: "/marketplace/store/products/list",
            CREATE: "/marketplace/store/products/create"
        },
        ORDER: {
            SELF: "/marketplace/store/orders",
            LIST: "/marketplace/store/orders/list",
            CREATE: "/marketplace/store/orders/create"
        },
        PURCHASE: {
            SELF: "/marketplace/store/purchase",
            LIST: "/marketplace/store/purchase/list",
            CREATE: "/marketplace/store/purchase/create"
        }
    },
}

export const SETTING = {
    SELF: "/settings",
    UNIT: {
        SELF: "/settings/units",
        LIST: "/settings/units/list",
        CREATE: "/settings/units/create",
        TYPE: {
            SELF: "/settings/units",
            LIST: "/settings/units/types/list",
            CREATE: "/settings/units/types/create"
        }
    }
}

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
