import AppConfig from 'Constants/AppConfig';

export const BASE = `${AppConfig.api.baseUrl}`;

export const AUTH = {
    LOGIN: 'oauth/token',
    LOGIN_WITH_SERVICE_NUMBER: 'auth/login',
    GET_ALL_BY_NAME_AND_URL: 'auth/cgu/by-url',
    SONDAGE: 'auth/sondages',
    GET_USER_BY_EMAIL: 'auth/email',
    COUNTRY: {
        LIST: 'auth/countries',
        OPERATORS: 'auth/countries/{country}/microcap-operators'
    },
    RESET_PASSWORD: {
        MAIN: 'auth/reset-password',
        LINK: 'auth/send-reset-password-link',
    },
} as const;

export const PROFILE = {
    INFORMATION: 'auth/me',
    INFORMATION_WITH_SERVICE_NUMBER: 'auth/me/mandate',
} as const;

export const SETTING = {
    GET_ALL: 'api/settings/branchs/{id}',
    GET_ALL_BY_NAME: 'api/settings/branchs/{id}/by-name',
    CGU: 'api/settings/update/cgu',
    UPDATE_CGU: 'api/settings/update/cgu/{id}',
    CURRENCIES: 'api/settings/currencies',
    UNIT_TYPE: 'api/settings/unit-types',
    GET_UNIT: 'api/settings/units/unit-types/{id}',
    UNIT: 'api/settings/units',
    AGENTS: {
        GET_ALL: 'api/settings/agents/list',
        GET_MAIN: 'api/settings/agents/list/main',
        ACTIVE: 'api/settings/agents/active/{id}',
        GET_ONE: 'api/settings/agents/{id}',
        CREATE: 'api/settings/agents',
        UPDATE: 'api/settings/agents/{id}',
        MAIN: 'api/settings/agents/main/{id}',
    },
    PIONIERS: {
        GET_ALL: 'api/settings/pioniers/list',
        GET_MAIN: 'api/settings/pioniers/list/main',
        GET_ONE: 'api/settings/pioniers/{id}',
        ACTIVE: 'api/settings/pioniers/active/{id}',
        MAIN: 'api/settings/pioniers/main/{id}',
        CREATE: 'api/settings/pioniers',
        UPDATE: 'api/settings/pioniers/{id}'
    }
} as const;

export const SYSTEM_OBJECT = {
    IDENTIFICATION: 'api/socialnetworks/users/self/identification-types',
    REGISTRATION_TYPE: 'public/system/objects/immatriculation-type',
    ORGANISATION: 'public/system/objects/organisation-legal-form',
    ORGANISATION_POST: 'public/system/objects/organisation-post',
    NETWORK_PROFILE_TYPE: 'public/system/objects/network-profile-type',
    USER_TYPE: 'public/system/objects/user-type',
    PRODUCT_NATURE: 'public/system/objects/product-nature',
    TIME_UNIT: 'public/system/objects/time-unit',
} as const;

export const BRANCH = {
    ACTIVATION: 'api/branchs/activation',
    CREATE: 'api/branchs',
    GET_ALL: 'api/branchs',
    GET_ALL_POSTS: 'api/branchs/{id}/posts',
    GET_ALL_OPERATORS: 'api/branchs/{id}/operators',
    SELECTED_OPERATOR: 'api/groups/communities/send/request/community/{group_id}/organisation/{organisation_id}',
    REMOVE_OPERATOR: 'api/groups/operators/remove',
    CANCEL_OPERATOR: 'api/groups/operators/invitation/cancel',
    CONFIGURATION: {
        START: 'api/branchs/start/configurations/{id}',
        STOP: 'api/branchs/close/configurations/{id}',
    },
    PRODUCTS: {
        GET_ALL: '/api/type-products/get-all',
        GET_ALL_PRODUCTS: '/api/type-products/get-all/products',
    },
    SAMPLE: {
        GET_ALL: "api/branchs/staging",
        GET_ONE: "api/branchs/{id}",
        STEP: {
            "1": "api/branchs/step1",
            "2": "api/branchs/step2",
            "3": "api/branchs/step3",
            "4": "api/branchs/step4",
        }
    }
} as const;
export const NETWORK_PROFILE = {
    CREATE: 'public/network-profile',
    GET_ALL: 'public/network-profile',
    ADD_USER_TO_ROLE: 'public/network-profile/{id}/users',
    BRANCH: 'public/network-profile/branch',
    PARTNERSHIP: {
        GET_ALL: 'public/network-profile/partership',
        CREATE: 'public/network-profile/partership',
        BRANCH_ALL: 'public/network-profile/partership/all',
        ASSISTANT: {
            CREATE: 'public/network-profile/partner/assistant',
            LIST: 'public/network-profile/partner/assistant',
        },
    },
} as const;

export const NETWORK_PROFILE_TYPE = {
    CREATE: 'public/type-network-profiles',
    GET_ALL: 'public/type-network-profiles',
} as const;

export const PRODUCTS = {
    GET_FOR_USER: 'api/products/accounts/user',
} as const;

export const CATALOGS = {
    GET_ALL: 'api/catalogs',
    CREATE: 'api/catalogs',
    GET_ONE: 'api/catalogs/{id}',
    EDIT: 'api/catalogs/{id}',
    TYPE_PRODUCTS: {
        ADD: 'api/catalogs/{id}/add-type-products',
        REMOVE: 'api/catalogs/{id}/remove-type-products',
        GET: 'api/catalogs/{id}/type-products',
    },
    ACTIVATE: 'api/catalogs/active/{id}'
} as const;

export const CATALOGS_TYPE = {
    GET_ALL: 'api/type-catalogs/catalogs',
} as const;

export const CATEGORY_PRODUCTS = {
    ROOT: 'api/category-products/root',
    GET_ALL: 'api/category-products',
    CREATE: 'api/category-products',
    GET_ONE: 'api/category-products/{id}',
    TYPE_PRODUCTS: 'api/type-catalogs/type-products',
    SUB_CATEGORY: 'api/category-products/{id}/category-products',
} as const;

export const PRODUCT_TYPE = {
    ROOT: 'api/type-products/root',
    GET_ALL: 'api/type-products/get-all',
    GET_ALL_PRODUCTS: 'api/type-products/get-all/products',
    CREATE: 'api/type-products',
    GET_ONE: 'api/type-products/{id}',
    GET_ONE_FULL: 'api/type-products/{id}/full',
    GET_ONE_FROM_COM_OFFER: 'api/type-products/offer/{id}',
    TYPE_PRODUCTS: 'api/type-catalogs/type-products',
    SUB_CATEGORY: 'api/type-products/{id}/type-products',
    GET_ALL_BY_SALE: 'api/type-products/by-catalogue-vente',
    AVAILABLE: 'api/type-products/{id}/variations',
} as const;

export const PDF_GENERATOR = {
    GET_MOVEMENTS: 'api/pdf/accounts/{id}/mouvements',
} as const;

export const PACKAGES = {
    LIST: 'api/packages',
    CREATE: 'api/packages',
    ACTIVATE: 'api/packages/activate',
    DEACTIVATE: 'api/packages/desactivate',
} as const;

export const USER_PROFILE = {
    GET_ALL: 'api/profiles',
    CREATE: 'api/profiles',
    PERMISSION: 'api/profiles/permission',
    ADD_USER: 'api/profiles/{id}/users',
    PERMISSIONS: {
        GET_ALL: 'api/profiles/permissions',
    },
} as const;

export const PREVISIONS = {
    GOALS: {
        GET_ALL: 'users/previsions/goals',
        CREATE: 'users/previsions/goals',
    },
    PREVISIONS: {
        CREATE: 'users/previsions',
        GET_ALL: 'users/previsions',
        ACTIVE: 'users/previsions/{id}',
        GET_ONE: 'users/previsions/{id}',
        DETAILS: 'users/previsions/details',
        UPDATE_GOALS: 'users/previsions/update/goals',
        GET_CODE: 'users/previsions/generate-code',
        ACTIVE_PASS: 'users/previsions/active-pass'
    },
    PERIODES: {
        GET_ALL: 'users/previsions/{id}/periods',
        CREATE: 'users/previsions/{id}/periods',
        DETAILS: 'users/previsions/periods/{id}',
    }
} as const;

export const USERS = {
    BRANCH_USERS: 'api/users',
    SEARCH: 'api/users/search',
    GET_ONE: '/api/users/one',
    SUSPEND: 'api/users/{id}/suspend',
    DELETE: 'api/users/{id}/delete',
    VERIFIED: 'api/users/{id}/verified',
    GET_ALL: 'api/users/persons',
    JOIN_GROUP: 'api/users/group/{id}',
    FIND_BY_MEMBERSHIP: 'api/users/membership',
    GET_ORGANISATIONS: 'api/users/organisations',
    UPDATE_CURRENCY: 'api/users/currency/{id}',
    UPDATE_PROFILE: 'api/users/update/profile',
    GET_PROFILES: 'api/users/profiles',
    CHANGE_PROFILE_TO_ORGANISATION: 'api/users/organisations/{id}',
    GET_ALL_BY_ORGANISATION: 'api/users/persons/by-organisation',
    GET_ALL_PARTNER: 'api/users/organisations/branch/{id}/partner',
    GET_ALL_PARTNER_OPERATOR: 'api/users/organisations/branch/{id}/partner/operator',
    GET_ALL_PARTNER_OPERATOR_ME: 'api/users/organisations/partner/operator/me/{id}',
    ADD_MEMBER_TO_ORGANISATIONS: 'api/users/organisations/members',
    GET_MEMBER_OF_ORGANISATIONS: 'api/users/organisations/members',
    GET_ORGANISATION_REFERENCE: 'api/users/organisations/adhesion/{id}',
    CREATE: {
        PERSON: 'api/users/persons/with-profile',
        ORGANISATION: 'api/users/organisations/with-profile',
        PARTNER: 'api/users/organisations/{id}/partner',
    },
    UPDATE: {
        PERSON: '/api/users',
        AVATAR: '/api/users/update/avatar'
    },
    ACCOUNTS: {
        GET_ALL: '/public/type-network-profiles',
        GET_ALL_BY_BRANCH: '/public/type-network-profiles/branch',
        CREATE: '/public/type-network-profiles',
    },
    VALIDATION: {
        SEND_OTP: 'api/users/{id}/otp/mail',
        VERIFY: 'api/users/{id}/otp'
    },
    PIECE: {
        GET_ALL: 'api/users/pieces/{id}/get',
        GET_USER: 'api/users/pieces/user/{id}/get',
        GET_CONNECTED_USER: 'api/users/pieces/user/get',
        CREATE: 'api/users/pieces/create',
        CREATE_FOR_USER: 'api/users/pieces/value/create',
        UPDATE_FOR_USER: 'api/users/pieces/value/update',
        DELETE_FOR_USER: 'api/users/pieces/value/{id}/delete'
    }
} as const;

export const PROFILES = {
    index: 'api/profiles',
    find: (id) => `api/profiles/${id}`,
    permissions: 'api/profiles/permissions'
} as const;

export const COMMUNITY_MEMBER = {
    USER: {
        GROUPS: {
            GET_ALL: 'api/groups/communities/user/me',
            GET_ONE: 'api/groups/communities/{id}',
            GET_BY_BRANCH: 'api/groups/communities/branch/{id}/user/{user_id}',
            GET_BY_BRANCH_DISABLE: 'api/groups/communities/disable',
            ACTIVATE: 'api/groups/communities/{id}/activate',
            NOT_IN: 'api/groups/communities/user/{id}/not-in',
            ADMIN: 'api/groups/communities/user/admin/me',
            GET_MEMBERS: 'api/groups/communities/{id}/members',
            GET_COMMUNITIES: 'api/groups/communities/users',
            CREATE_VOUCHER: 'api/groups/{id}/vouchers',
            GET_VOUCHERS_FOR_USER: 'api/groups/users/vouchers',
            GET_VOUCHERS: 'api/groups/{id}/vouchers/',
            GET_ADMINS: 'api/groups/communities/{id}/admins',
            ADD_OPERATOR: 'api/groups/communities/{id}/operator',
            GET_FAVOURITES: 'api/groups/communities/favourites',
            ADD_FAVOURITES: 'api/groups/communities/{id}/favourites',
        },
        CREATE: {
            NON_CONVENTIONAL: 'api/groups/communities/non-conventionated'
        }
    },
    GROUP: {
        CREATE_POST: 'api/groups/posts',
        CREATE_MOTIVATION: 'api/groups/posts/{id}/motivations',
        CREATE_SECTION: 'api/groups/{id}/sections',
        GET_MAIN_SECTIONS: 'api/groups/{id}/sections',
        GET_ALL_SECTIONS: 'api/groups/{id}/sections/all',
        GET_POSTS: 'api/groups/{id}/posts',
        PIN: 'api/groups/{id}/pin',
        GET_MOTIVATION_POSTS: 'api/groups/posts/{post_id}/motivations',
        GET_CHILD_SECTIONS: 'api/groups/sections/{id}/sections',
        GET_PENDING_COMMUNITIES: 'api/groups/communities/operators/invitations',
        GET_CURRENT_COMMUNITIES: 'api/groups/operators/communities',
        VALIDATE_COMMUNITY: 'api/groups/communities/operators/invitations/validation',
    },
    INVITATIONS: {
        GET_ALL: 'api/groups/communities/pending/invitation',
        SEND: {
            ONE: 'api/groups/communities/send/invitation/community/{group_id}',
            MANY: 'api/groups/communities/send/invitation/community/{group_id}',
            REQUEST: 'api/groups/communities/send/request/community/{group_id}/users/{user_id}',
            TO_USER: 'api/groups/communities/send/invitation/community/user/{user_id}',
            TO_GROUP: 'api/groups/communities/send/invitation/community/{group_id}',
            INVITATIONS: 'api/groups/communities/{id}/pending/invitations',
            REQUESTS: 'api/groups/communities/{id}/pending/requests',
        },
        ACCEPT: 'api/groups/communities/accept/invitation/{invitation_id}',
        CANCEL: 'api/groups/communities/cancel/invitation/{invitation_id}',
        DELETE: 'api/groups/communities/delete/invitation/{invitation_id}',
    },
} as const;

export const COMMERCIAL_MANAGEMENT = {
    OPERATION_TYPE: {
        GET_ALL: 'api/commercial-operation-type',
        CREATE: 'api/commercial-operation-type',
        UPDATE: 'api/commercial-operation-type',
    },
    OPERATION: {
        GET_ALL: 'api/commercial-operation',
        CREATE: 'api/commercial-operation',
        UPDATE: 'api/commercial-operation',
    },
    OFFER: {
        GET_ALL: {
            FOR_PARTNER: 'api/commercial-offer/for-partner',
            FOR_NETWORK: 'api/commercial-offer/for-network',
            PRODUCT_AVAILABLE: 'api/commercial-offer/products-available',
        },
        CREATE: 'api/commercial-offer',
        ADD_PRODUCT: 'api/commercial-offer/{id}',
        UPDATE: 'api/commercial-offer',
        ACTIVATE: 'api/commercial-offer/active',
        DEACTIVATE: 'api/commercial-offer/desactive'
    },
} as const;

export const ORDER = {
    GET_ALL: 'api/order/users',
    GET_ALL_OPERATORS: 'api/order/operator',
    GET_ALL_UNAPPROVED: 'api/order/users/unapproved',
    GET_ONE: 'api/order/{id}',
    APPROVE_ORDER: 'api/order/{id}/status',
    GET_ONE_SALE: 'api/order/{id}/sales',
    GET_ALL_PAYMENT: 'api/order/{id}/sales/all',
    CREATE: 'api/order',
    PIECES: 'api/order/{id}/pieces',
} as const;

export const ACCOUNT = {
    GET_ONE: 'api/accounts/{id}',
    GET_ALL_BY_UNIT: 'api/accounts',
    UNCOMPLETE: 'api/accounts/uncomplete',
    UPDATE_ACCOUNT: 'api/accounts/{id}/update',
    CHANGE_CURRENCY: 'api/accounts/{id}/currency',
    GET_TRANSACTIONS: 'api/accounts/{id}/mouvements',
    APPROVISIONING_CARD: 'api/accounts/{id}/approvisioning/card',
    CONSOLIDATION_BALANCE: 'api/accounts/consolidated/{id}/balance',
    GET_ACCOUNT_BY_AMOUNT: 'api/accounts/users/{id}/account-by-amount',
    APPROVISIONING_VOUCHER: 'api/accounts/{id}/approvisioning/voucher',
} as const;

export const BROKER = {
    SELF: {
        ACCOUNTS: 'api/brokers/accounts'
    },
    AGENCIES: {
        LIST: 'api/agencies',
        CREATE: 'api/agencies',
        FIND: 'api/agencies/{id}',
    },
    COUNTERS: {
        LIST: 'api/counters',
        CREATE: 'api/counters',
        FIND: 'api/counters/{id}',
    },
    CASHDESKS: {
        LIST: 'api/cashdesks',
        CREATE: 'api/cashdesks',
        FIND: 'api/cashdesks/{id}',
        CREDIT: 'api/cashdesks/{id}/credit',
    }
} as const;

export const SALES = {
    GET_ALL: 'api/sales',
    GET_ONE: 'api/sales/{id}',
    GET_BY_USER: 'api/sales/users/{id}',
    CREATE: 'api/sales',
} as const;

export const GENERIC_OBJECT = {
    GET_ALL: 'public/generic-objects',
    GET_ONE: 'public/generic-objects/{id}',
    CREATE: 'public/generic-objects',
} as const;

export const ACCESS = {
    GET_ALL: 'public/access/access',
    CREATE: 'public/access/access',
    GET_ONE: 'public/generic-objects/{id}',
    MANDATE: {
        SELF: {
            GET_ALL: 'public/access/mandates',
            CREATE: 'public/access/mandates',
            USER: {
                GET_ALL: 'public/access/mandates/user',
            }
        },
        MODEL: {
            GET_ALL: 'public/access/mandate-models',
            CREATE: 'public/access/mandate-models',
        },
        TYPE: {
            GET_ALL: 'public/access/mandate-types',
            CREATE: 'public/access/mandate-types',
        }
    }
} as const;

export const NOTIFICATIONS = {
    GET_ALL: 'public/notifications',
    SELF: {
        GET_ALL: {
            SELF: 'public/notifications',
            BY_BRANCH: 'public/notifications/branch/{id}',
            BY_STATUS: 'public/notifications/by-status',
        },
        COUNT_UNREAD: 'public/notifications/unread/count',
        UPDATE: 'public/notifications',
        CREATE: 'public/notifications',
    },
    TYPE: {
        GET_ALL_MODEL: 'public/notifications/notification_models',
        GET_ALL: 'public/notifications/notification_type',
        CREATE: 'public/notifications/notification_type',
    },
    CREATE: 'public/generic-objects',
} as const;

export const PROJECTS = {
    SELF: {
        GET_ALL: 'api/projects',
        CREATE: 'api/projects',
    },
    FOLDERS: {
        GET_ALL: 'api/projects/folders/users/{id}',
        GET_ALL_BY_BRANCH: 'api/projects/folders/branch',
        CREATE: 'api/projects/folders',
        UPDATE: 'api/projects/folders/{id}',
        UPDATE_STATUS: 'api/projects/folders/{id}/status',
        ADD_WORK: 'api/projects/folders/{id}/adding',
        ADD_COMPLEX_WORK: 'api/projects/folders/{id}/adding/complex',
        DELETE_COMPLEX_WORK: 'api/projects/folders/{id}/deleting/complex',
        UPDATE_FOLDER_WORK: 'api/projects/folders/book/editing',
        UPDATE_WORK: 'api/projects/folders/books/{id}',
        SORT_WORK: 'api/projects/folders/{id}/sort',
        GET_ONE: 'api/projects/folders/{id}',
        GET_ONE_BY_GROUP: 'api/projects/folders/group/{id}',
    },
    REACTIONS: {
        GET_ALL: 'api/projects/reactions/projects/{id}',
        GET_ALL_BY_BRANCH: 'api/projects/reactions/projects/all/branch',
        CREATE: 'api/projects/reactions',
        GET_ONE: 'api/projects/reactions/{id}',
    },
    POST_PROJETS: {
        CREATE: 'api/projects/posts',
        GET_ALL: 'api/branchs/{id}/project/posts',
    },
    CONFIGURATION: {
        WORKS: {
            GET_ALL: 'api/branchs/{id}/books',
            CREATE: 'api/books',
            UPDATE: 'api/books/{id}',
            GET_ONE: 'api/books/{id}',
            CHANGE_STATUS: 'api/books/{id}/status',
            GET_ALL_USER: 'api/books',
            GET_COMPLEX: 'api/books/complex',
            GET_COMPLEX_DETAILS: 'api/books/complex/{id}/details',
        },
        STANDARD: {
            GET_ALL: 'api/projects/presentation-standard',
            GET_ONE: 'api/projects/presentation-standard/{id}',
            CREATE: 'api/projects/presentation-standard',
            MODELS: {
                GET_ALL: 'api/projects/presentation-standard/{id}/models',
                CREATE: 'api/projects/model',
                DELETE: 'api/projects/models/{id}',
            },
            PRESENTATION:  {
                GET_ALL: 'api/projects/presentation',
                GET_ONE: 'api/projects/presentation/{id}',
                CREATE: 'api/projects/presentation',
            }
        },
        INITIALISATION: {
            GET_ALL: 'api/projects/options',
            GET_ONE: 'api/projects/options/{id}',
            CREATE: 'api/projects/options',
            UPDATE: 'api/projects/options/{id}',
        }
    }
} as const;

export const joinBaseUrl = to => BASE + to;

export const joinBaseUrlWithParams = (to, params) => {
    let url = BASE + to;

    params.forEach(param => {
        url = url.replace(`{${param.param}}`, `${encodeURIComponent(param.value)}`);
    });

    return url;
};

export const joinBaseUrlWithRequestParams = (to, params) => {
    let url = BASE + to;
    let i = 0;
    params.forEach(param => {
        if(i == 0)
            url = url + '?' + param.param + '=' + param.value
        else
        url = url + '&' + param.param + '=' + param.value
    });

    return url;
};

export const joinBaseUrlWithParamsId = (to, id) => {
    return joinBaseUrlWithParams(to, [{param: 'id', value: id}]);
};
