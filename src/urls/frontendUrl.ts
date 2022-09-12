import { BASE } from "Url/backendUrl";

export const ROOT = '/';
export const HOME = '/home';

export const LANDING = {
    SELF: '/landing',
    CGU: '/landing/cgu',
    BLOG: '/landing/blog',
    HOME: '/landing/home',
    GETIN: '/landing/get-in',
    EVENTS: '/landing/events',
    AGENTS: '/landing/agents',
    DISCOVER: '/landing/dicover',
    PIONIERS: '/landing/pioniers',
    SERVICES: '/landing/services',
    SOLIDARITY: '/landing/solidarity',
    VALUES: '/landing/reseau-microcap',
    SONDAGE_FIRST: '/landing/sondages',
    MISSION: '/landing/mission-microcap',
    PASS_DETAILS: '/landing/pass-details',
    BLOG_DETAILS: '/landing/blog/:id/details',
    LEGAL_MENTION: '/landing/mentions-legales',
    GALERY_PROJECT: '/landing/projects-gallery',
    MONEY_MANAGEMENT: '/landing/money-management',
    SONDAGE_SECOND: '/landing/sondages/continue/:id',
    TERMS: '/landing/conditions-generales-d-utilisation',
}

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

export const FUNDING = {
    SELF: '/funding',
    ACCOUNT: {
        SELF: '/funding/accounts',
        LIST: '/funding/accounts/list',
        DETAILS: '/funding/accounts/:id/details',
    }
} as const;


export const USER_ACCOUNT_TYPE = {
    SELF: '/user-account-types',
    ROLE: {
        SELF: '/user-account-types/roles',
        LIST: '/user-account-types/roles/list',
        CREATE: '/user-account-types/roles/create',
        UPDATE: '/user-account-types/roles/:id/update',
    },
    TYPE: {
        SELF: '/user-account-types/types',
        LIST: '/user-account-types/types/list',
        CREATE: '/user-account-types/types/create',
        CHAIN: '/user-account-types/types/:id/chains',
        CHAIN_CREATE: '/user-account-types/types/:id/chains/create',
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
            REQUEST: '/groups/communities/space/requests',
            PENDING: '/groups/communities/space/pending',
            MESSAGE: '/groups/communities/space/messages'
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
            CREATE: '/groups/administration/members/create',
            FOLDER: '/groups/administration/members/:id/folders'
        },
        REQUEST: {
            SELF: '/groups/administration/requests',
            JOIN: '/groups/administration/requests/joins',
            INVITATION: '/groups/administration/requests/invitations',
        },
        ARTICLE: {
            SELF: '/groups/administration/articles',
            ITEM: {
                LIST: '/groups/administration/articles/items/list',
                CREATE: '/groups/administration/articles/items/create'
            },
            TOPIC: {
                LIST: '/groups/administration/articles/topic/list',
                CREATE: '/groups/administration/articles/topic/create'
            },
        },
        POST: {
            SELF: '/groups/administration/posts',
            LIST: '/groups/administration/posts/list',
            CREATE: '/groups/administration/posts/create',
            MOTIVATION: {
                LIST: '/groups/administration/posts/:id/motivations/list',
                CREATE: '/groups/administration/posts/:id/motivations/create',
            }
        },
        ROLE: {
            SELF: '/groups/administration/roles',
            LIST: '/groups/administration/roles/list',
            CREATE: '/groups/administration/roles/create',
            UPDATE: '/groups/administration/roles/:id/update'
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
        CARD: "/profiles/users/card",
        ACCESS: "/profiles/users/access",
        CONTACT: "/profiles/users/contacts",
        PERSONAL: "/profiles/users/personal",
        INSTITUTION: "/profiles/users/institutions",
    }
}

export const PROJECT = {
    SELF: "/projects",
    POST: {
        SELF: "/projects/posts",
        LIST: "/projects/posts/list",
        CREATE: "/projects/posts/create",
    },
    INITIALIZATION: {
        SELF: "/projects/initializations",
        ITEMS: "/projects/initializations/:id/items",
        LIST: "/projects/initializations/:type/list",
        CREATE: "/projects/initializations/:type/create",
    },
    DETAILS: {
        SELF: "/projects/details",
        SHOW: "/projects/details/:id/show",
        UPDATE: "/projects/details/:id/update",
        GALLERY: "/projects/details/:id/gallery",
        ACTIVITY: {
            SELF: "/projects/details/:id/activities",
            LIST: "/projects/details/:id/activities/list",
            CREATE: "/projects/details/:id/activities/create",
        }
    },
    ITEM: {
        SELF: "/projects/items",
        SIMPLE: {
            SELF: "/projects/items/simples",
            LIST: "/projects/items/simples/list",
            CREATE: "/projects/items/simples/create"
        },
        COMPLEX: {
            SELF: "/projects/items/complexes",
            LIST: "/projects/items/complexes/list",
            CREATE: "/projects/items/complexes/create"
        }
    },
    MINE: {
        SELF: "/projects/mines",
        FOLDER: {
            SELF: "/projects/mines/folders",
            LIST: "/projects/mines/folders/list",
            CREATE: "/projects/mines/folders/create",
            UPDATE: "/projects/mines/folders/:id/update",
        },
        ITEM: {
            SELF: "/projects/mines/items",
            LIST: "/projects/mines/items/list",
            CREATE: "/projects/mines/items/create",
        }
    }
}

export const MARKETPLACE = {
    SELF: "/marketplace",
    SHOP: "/marketplace/shop",
    CART: "/marketplace/cart",
    ORDERS: "/marketplace/orders",
    SHOP_PRODUCTS: "/marketplace/shop/:reference/products",
    CHECKOUT: "/marketplace/checkout",
    SALES: "/marketplace/orders/:id/sales",
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
            CREATE: "/marketplace/store/products/create",
            CONFIGURE: "/marketplace/store/products/:reference/configure",
        },
        ORDER: {
            SELF: "/marketplace/store/orders",
            LIST: "/marketplace/store/orders/list",
        },
        OPTION: {
            SELF: "/marketplace/store/options",
            LIST: "/marketplace/store/options/list",
            CREATE: "/marketplace/store/options/create",
        },
        PURCHASE: {
            SELF: "/marketplace/store/purchase",
            LIST: "/marketplace/store/purchase/list",
            FOLDER: "/marketplace/store/purchase/:id/folders"
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
    },
    USER_FILE: {
        SELF: "/settings/user-files",
        LIST: "/settings/user-files/list",
        CREATE: "/settings/user-files/create",
    },
    AGENT: {
        SELF: "/settings/agents",
        LIST: "/settings/agents/list",
        CREATE: "/settings/agents/create",
    },
    PIONIER: {
        SELF: "/settings/pioniers",
        LIST: "/settings/pioniers/list",
        CREATE: "/settings/pioniers/create",
    },
    EVENT: {
        SELF: "/settings/events",
        LIST: "/settings/events/list",
        CREATE: "/settings/events/create",
    },
    ARTICLE: {
        SELF: "/settings/articles",
        LIST: "/settings/articles/list",
        CREATE: "/settings/articles/create",
        TOPIC: {
            SELF: "/settings/articles/topics",
            LIST: "/settings/articles/topics/list",
            CREATE: "/settings/articles/topics/create",
            UPDATE: "/settings/articles/topics/:id/update",
        }
    }
}

export const NETWORK = {
    SELF: '/network',
    COVERAGE: {
        SELF: '/network/coverage',
        TERRITORY: {
            SELF: '/network/coverage/territories',
            LIST: '/network/coverage/territories/list',
            CREATE: '/network/coverage/territories/create',
            CHILD: {
                SELF: '/network/coverage/territories/:id',
                LIST: '/network/coverage/territories/:id/sub-territories',
                SETTING: '/network/coverage/territories/:id/settings',
            },
        },
        CONTRACT: {
            SELF: '/network/coverage/contracts',
            LIST: '/network/coverage/contracts/list',
            CREATE: '/network/coverage/contracts/create',
        },
        PARTNERSHIP: {
            SELF: '/network/coverage/partnerships',
            BROKER: '/network/coverage/partnerships/broker',
            OPERATOR: '/network/coverage/partnerships/operator',
            COMMUNITY: '/network/coverage/partnerships/community',
        },
        USERS: {
            SELF: '/network/coverage/users',
            LIST: '/network/coverage/users/list'
        }
    }
} as const;

export const BROKER = {
    SELF: '/brokers',
    AGENCY: {
        SELF: '/brokers/agencies',
        LIST: '/brokers/agencies/list',
        CREATE: '/brokers/agencies/create',
    },
    COUNTER: {
        SELF: '/brokers/counters',
        LIST: '/brokers/counters/list',
        CREATE: '/brokers/counters/create',
    },
    CASHDESK: {
        SELF: '/brokers/cashdesks',
        LIST: '/brokers/cashdesks/list',
        CREATE: '/brokers/cashdesks/create',
    }
} as const;

export const MIPRO = {
    SELF: '/mipro',
    HOME: {
        SELF: '/mipro/home',
        DASHBOARD: '/mipro/home/dashboard',
    },
    PREVISION: {
        SELF: '/mipro/previsions',
        LIST: '/mipro/previsions/list',
        CREATE: '/mipro/previsions/create',
    },
    PERIOD: {
        SELF: '/mipro/periods',
        LIST: '/mipro/periods/pre/:id/list',
        CREATE: '/mipro/periods/pre/:id/create',
    },
    GOAL: {
        SELF: '/mipro/goals',
        LIST: '/mipro/goals/list',
        CREATE: '/mipro/goals/create',
    },
    ADMINISTRATION: {
        SELF: '/mipro/administration',
        GOAL: {
            SELF: '/mipro/administration/goals',
            LIST: '/mipro/administration/goals/list',
            CREATE: '/mipro/administration/goals/create',
        }
    }
} as const;

export const BANK = {
    SELF: '/bank',
    ADMIN: {
        SELF: '/bank/admin',
        PRESTATION: {
            SELF: '/bank/admin/prestations',
            LIST: '/bank/admin/prestations/list',
            CREATE: '/bank/admin/prestations/create',
        },
        MANDATE: {
            SELF: '/bank/admin/mandate',
            LIST: '/bank/admin/mandate/list',
            CREATE: '/bank/admin/mandate/create',
        }
    },
    SUBSCRIPTION: {
        SELF: '/bank/subscriptions',
        LIST: '/bank/subscriptions/list',
        CREATE: '/bank/subscriptions/create',
    },
    OPERATION: {
        SELF: '/bank/operations',
        LIST: '/bank/operations/list',
        CREATE: '/bank/operations/create',
        ASSISTANCE: '/bank/operations/assistance',
        BANK: {
            SELF: '/bank/operations/bank',
            LIST: '/bank/operations/bank/list',
            PENDING: '/bank/operations/bank/pending'
        }
    },
    MONEY: {
        SELF: '/bank/money',
        INJECTION: {
            SELF: '/bank/money/injections',
            LIST: '/bank/money/injections/list',
        },
        EXTINCTION: {
            SELF: '/bank/money/extinctions',
            LIST: '/bank/money/extinctions/list',
        },
        EXPLOITATION: {
            SELF: '/bank/money/exploitations',
            LIST: '/bank/money/exploitations/list',
        }
    },
    CHARGE: {
        SELF: '/bank/charges',
        AGENT: {
            SELF: '/bank/charges/agents',
            REQUEST: {
                SELF: '/bank/charges/agents/requests',
                LIST: '/bank/charges/agents/requests/list',
                CREATE: '/bank/charges/agents/requests/create',
            },
            TRANSFER: {
                SELF: '/bank/charges/agents/transfers',
                LIST: '/bank/charges/agents/transfers/list',
                CREATE: '/bank/charges/agents/transfers/create',
            }
        },
        INTERMEDIARY: {
            SELF: '/bank/charges/admin',
            REQUEST: {
                SELF: '/bank/charges/admin/requests',
                LIST: '/bank/charges/admin/requests/list',
                PENDING: '/bank/charges/admin/requests/pending',
            }
        }
    },
    CLIENT: {
        SELF: '/bank/clients',
        LIST: '/bank/clients/list',
        CHECKBOOK: {
            LIST: '/bank/clients/:id/cheque-books',
            CREATE: '/bank/clients/:id/cheque-books/create'
        }
    },
    PARTY: {
        SELF: '/bank/party',
        AGENT: {
            SELF: '/bank/party/agents',
            LIST: '/bank/party/agents/list',
            CREATE: '/bank/party/agents/create',
        },
        COUNTER: {
            SELF: '/bank/party/counters',
            LIST: '/bank/party/counters/list',
            CREATE: '/bank/party/counters/create',
        },
        PRESTATION: {
            SELF: '/bank/party/prestations',
            LIST: '/bank/party/prestations/list',
            CREATE: '/bank/party/prestations/create',
        },
        COVERAGE: {
            SELF: '/bank/party/coverages',
            LIST: '/bank/party/coverages/list',
            CREATE: '/bank/party/coverages/create',
        }
    },
    CHEQUE_TOPIC: {
        SELF: '/bank/cheques/topics',
        LIST: '/bank/cheques/topics/list',
        CREATE: '/bank/cheques/topics/create',
    },
    MMS: {
        SELF: '/bank/mms',
        CHEQUE: {
            SELF: '/bank/mms/cheques',
            LIST: '/bank/mms/cheques/list',
            CREATE: '/bank/mms/cheques/create',
        },
        TRANSFER: {
            SELF: '/bank/mms/transfers',
            LIST: '/bank/mms/transfers/list',
            CREATE: '/bank/mms/transfers/create',
        },
        SETTINGS: {
            SELF: '/bank/mms/settings',
            LIST: '/bank/mms/settings/list',
            CREATE: '/bank/mms/settings/create',
        }
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
