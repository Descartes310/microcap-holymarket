import AppConfig from 'Constants/AppConfig';

export const BASE = `${AppConfig.api.baseUrl}`;

const shouldHavePublic = true;

const publicPrefix = shouldHavePublic ? 'public/' : '';

export const AUTH = {
    LOGIN: 'oauth/token',
    LOGIN_WITH_SERVICE_NUMBER: 'auth/login',
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
    INFORMATION_WITH_SERVICE_NUMBER: 'auth/me/mandate',
};

export const SYSTEM_OBJECT = {
    IDENTIFICATION: 'public/system/objects/identification-type',
    REGISTRATION_TYPE: 'public/system/objects/immatriculation-type',
    ORGANISATION: 'public/system/objects/organisation-legal-form',
    ORGANISATION_POST: 'public/system/objects/organisation-post',
    NETWORK_PROFILE_TYPE: 'public/system/objects/network-profile-type',
    USER_TYPE: 'public/system/objects/user-type',
    PRODUCT_NATURE: 'public/system/objects/product-nature',
    TIME_UNIT: 'public/system/objects/time-unit',
};

export const BRANCH = {
    ACTIVATION: 'public/branchs/activation',
    CREATE: 'public/branchs',
    GET_ALL: 'public/branchs',
    CONFIGURATION: {
        START: 'public/branchs/start/configurations/{id}',
        STOP: 'public/branchs/close/configurations/{id}',
    },
    PRODUCTS: {
        GET_ALL: '/public/type-products/get-all',
    },
    SAMPLE: {
        GET_ALL: "public/branchs/staging",
        GET_ONE: "public/branchs/{id}",
        STEP: {
            "1": "public/branchs/step1",
            "2": "public/branchs/step2",
            "3": "public/branchs/step3",
            "4": "public/branchs/step4",
        }
    }
};
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
};

export const NETWORK_PROFILE_TYPE = {
    CREATE: 'public/type-network-profiles',
    GET_ALL: 'public/type-network-profiles',
};

export const PRODUCTS = {
    GET_FOR_USER: 'public/products/accounts/user/{id}',
};

export const CATALOGS = {
    GET_ALL: 'public/catalogs',
    CREATE: 'public/catalogs',
    GET_ONE: 'public/catalogs/{id}',
    EDIT: 'public/catalogs/{id}',
    TYPE_PRODUCTS: {
        ADD: 'public/catalogs/{id}/add-type-products',
        REMOVE: 'public/catalogs/{id}/remove-type-products',
        GET: 'public/catalogs/{id}/type-products',
    },
    ACTIVATE: 'public/catalogs/active/{id}'
};

export const CATALOGS_TYPE = {
    GET_ALL: 'public/type-catalogs/catalogs',
};

export const CATEGORY_PRODUCTS = {
    ROOT: 'public/category-products/root',
    GET_ALL: 'public/category-products',
    CREATE: 'public/category-products',
    GET_ONE: 'public/category-products/{id}',
    TYPE_PRODUCTS: 'public/type-catalogs/type-products',
    SUB_CATEGORY: 'public/category-products/{id}/category-products',
};

export const PRODUCT_TYPE = {
    ROOT: 'public/type-products/root',
    GET_ALL: 'public/type-products/get-all',
    CREATE: 'public/type-products',
    GET_ONE: 'public/type-products/{id}',
    GET_ONE_FROM_COM_OFFER: 'public/type-products/offer/{id}',
    TYPE_PRODUCTS: 'public/type-catalogs/type-products',
    SUB_CATEGORY: 'public/type-products/{id}/type-products',
    GET_ALL_BY_SALE: 'public/type-products/by-catalogue-vente',
    AVAILABLE: 'public/type-products/{id}/variations',
};

export const PACKAGES = {
    LIST: 'public/packages',
    CREATE: 'public/packages',
    ACTIVATE: 'public/packages/activate',
    DEACTIVATE: 'public/packages/desactivate',
};

export const USER_PROFILE = {
    GET_ALL: 'public/profiles',
    CREATE: 'public/profiles',
    PERMISSION: 'public/profiles/permission',
    ADD_USER: 'public/profiles/{id}/users',
    PERMISSIONS: {
        GET_ALL: 'public/profiles/permissions',
    },
};

export const USERS = {
    BRANCH_USERS: 'public/users',
    SEARCH: 'public/users/search',
    GET_ALL: 'public/users/persons',
    GET_ALL_BY_ORGANISATION: 'public/users/persons/by-organisation',
    GET_ALL_PARTNER: 'public/users/organisations/branch/{id}/partner',
    GET_ALL_PARTNER_OPERATOR: 'public/users/organisations/branch/{id}/partner/operator',
    GET_ALL_ORGANISATIONS: 'public/users/organisations',
    GET_ORGANISATION_REFERENCE: 'public/users/organisations/adhesion/{id}',
    CREATE: {
        PERSON: 'public/users/persons/with-profile',
        ORGANISATION: 'public/users/organisations/with-profile',
        PARTNER: 'public/users/organisations/{id}/partner',
    },
    UPDATE: {
        PERSON: '/public/users/persons'
    },
    ACCOUNTS: {
        GET_ALL: '/public/type-network-profiles',
        GET_ALL_BY_BRANCH: '/public/type-network-profiles/branch',
        CREATE: '/public/type-network-profiles',
    },
    VALIDATION: {
        SEND_OTP: 'public/users/{id}/otp/mail',
        VERIFY: 'public/users/{id}/otp'
    },
    PIECE: {
        GET_ALL: 'public/users/pieces/{id}/get',
        GET_USER: 'public/users/pieces/user/{id}/get',
        CREATE: 'public/users/pieces/create',
        CREATE_FOR_USER: 'public/users/pieces/value/create',
        UPDATE_FOR_USER: 'public/users/pieces/value/update',
        DELETE_FOR_USER: 'public/users/pieces/value/{id}/delete'
    }
};

export const COMMUNITY_MEMBER = {
    USER: {
        GROUPS: {
            GET_ALL: 'groups/communities/user/me',
            GET_BY_BRANCH: 'groups/communities/branch/{id}/user/{user_id}',
            NOT_IN: 'groups/communities/user/{id}/not-in',
            ADMIN: 'groups/communities/user/admin/me',
            GET_MEMBERS: 'groups/communities/{id}/members',
            GET_COMMUNITIES: 'groups/communities/users/{id}',
            CREATE_VOUCHER: 'groups/{id}/vouchers',
            GET_VOUCHERS: 'groups/{id}/vouchers/users/{user_id}/type/{type}',
            GET_ADMINS: 'groups/communities/{id}/admins',
            ADD_OPERATOR: 'groups/communities/{id}/operator',
        },
        CREATE: {
            NON_CONVENTIONAL: 'groups/communities/non-conventionated'
        }
    },
    INVITATIONS: {
        GET_ALL: 'groups/communities/pending/invitation/{id}',
        SEND: {
            ONE: 'groups/communities/send/invitation/community/{group_id}',
            MANY: 'groups/communities/send/invitation/community/{group_id}',
            REQUEST: 'groups/communities/send/request/community/{group_id}/users/{user_id}',
            TO_USER: 'groups/communities/send/invitation/community/user/{user_id}',
            TO_GROUP: 'groups/communities/send/invitation/community/{group_id}',
            INVITATIONS: 'groups/communities/{id}/pending/invitations',
            REQUESTS: 'groups/communities/{id}/pending/requests',
        },
        ACCEPT: 'groups/communities/accept/invitation/{invitation_id}',
        CANCEL: 'groups/communities/cancel/invitation/{invitation_id}',
        DELETE: 'groups/communities/delete/invitation/{invitation_id}',
    },
};

/* export const COMMUNITY = {

    INVITATIONS: {
        GET_ALL: 'groups/communities/pending/invitation/me',
        SEND: {
            ONE: 'groups/communities/send/invitation/community/{group_id}/user/{user_id}',
            MANY: 'groups/communities/send/invitation/community/{group_id}',
            REQUEST: 'groups/communities/send/request/community/{group_id}',
        },
        ACCEPT: 'groups/communities/accept/invitation/{invitation_id}',
        CANCEL: 'groups/communities/cancel/invitation/{invitation_id}',
        DELETE: 'groups/communities/delete/invitation/{invitation_id}',
    },
};
 */
export const COMMERCIAL_MANAGEMENT = {
    OPERATION_TYPE: {
        GET_ALL: 'public/commercial-operation-type',
        CREATE: 'public/commercial-operation-type',
        UPDATE: 'public/commercial-operation-type',
    },
    OPERATION: {
        GET_ALL: 'public/commercial-operation',
        CREATE: 'public/commercial-operation',
        UPDATE: 'public/commercial-operation',
    },
    OFFER: {
        GET_ALL: {
            FOR_PARTNER: 'public/commercial-offer/for-partner',
            FOR_NETWORK: 'public/commercial-offer/for-network',
            PRODUCT_AVAILABLE: 'public/commercial-offer/products-available',
        },
        CREATE: 'public/commercial-offer',
        ADD_PRODUCT: 'public/commercial-offer/{id}',
        UPDATE: 'public/commercial-offer',
        ACTIVATE: 'public/commercial-offer/active',
        DEACTIVATE: 'public/commercial-offer/desactive'
    },
};

export const ORDER = {
    GET_ALL: 'public/order',
    GET_ONE: 'public/order/{id}',
    CREATE: 'public/order',
};

export const ACCOUNT = {
    GET_ONE: 'public/accounts/{id}',
    GET_TRANSACTIONS: 'public/accounts/{id}/mouvements',
    GET_ACCOUNT_BY_AMOUNT: 'public/accounts/users/{id}/account-by-amount',
    APPROVISIONING_VOUCHER: 'public/accounts/{id}/approvisioning/voucher',
    APPROVISIONING_CARD: 'public/accounts/{id}/approvisioning/card'
};

export const SALES = {
    GET_ALL: 'public/sales',
    GET_ONE: 'public/sales/{id}',
    GET_BY_USER: 'public/sales/users/{id}',
    CREATE: 'public/sales',
};

export const GENERIC_OBJECT = {
    GET_ALL: 'public/generic-objects',
    GET_ONE: 'public/generic-objects/{id}',
    CREATE: 'public/generic-objects',
};

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
};

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
};

export const PROJECTS = {
    SELF: {
        GET_ALL: 'public/projects',
        CREATE: 'public/projects',
    },
    FOLDERS: {
        GET_ALL: 'public/projects/folders/users/{id}',
        CREATE: 'public/projects/folders',
        GET_ONE: 'public/projects/folders/{id}',
    },
    REACTIONS: {
        GET_ALL: 'public/projects/reactions/projects/{id}',
        CREATE: 'public/projects/reactions',
        GET_ONE: 'public/projects/reactions/{id}',
    },
    POST_PROJETS: {
        CREATE: 'public/branchs/{id}/posts',
        GET_ALL: 'public/branchs/{id}/posts',
    },
    CONFIGURATION: {
        WORKS: {
            GET_ALL: 'public/branchs/{id}/books',
            CREATE: 'public/books',
        },
        STANDARD: {
            GET_ALL: 'public/projects/presentation-standard',
            GET_ONE: 'public/projects/presentation-standard/{id}',
            CREATE: 'public/projects/presentation-standard',
            MODELS: {
                GET_ALL: 'public/projects/presentation-standard/{id}/models',
                CREATE: 'public/projects/model',
                DELETE: 'public/projects/models/{id}',
            },
            PRESENTATION:  {
                GET_ALL: 'public/projects/presentation',
                GET_ONE: 'public/projects/presentation/{id}',
                CREATE: 'public/projects/presentation',
            }
        },
        INITIALISATION: {
            GET_ALL: 'public/projects/options',
            CREATE: 'public/projects/options',
        }
    }
};

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
