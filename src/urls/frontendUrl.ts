
export const ROOT = '/';
export const HOME = '/home';
export const LANDING_PAGE_FLOW = '/page-flows';
export const PAYMENT = '/session/payments';

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

export const PME_PROJECT = {
    SELF: '/100pme',
    VOTE: '/100pme/vote',
    LOGIN: '/100pme/login',
    VOTE_RECAP: '/100pme/vote/recap',
    VOTE_OPTION: '/100pme/vote/options/:id',
    VOTE_OPTION_2: '/100pme/vote/options-end/:id',
    VOTE_RESERVE_RECAP: '/100pme/vote/reserve/recap',
    VOTE_PRODUCT: '/100pme/vote/options/:id/products',
    VOTE_PRODUCT_END: '/100pme/vote/options/products/end',
    SUBSCRIBE_ACCOUNT: '/100pme/vote/options/:id/accounts',
}

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
        JOURNALS: '/funding/accounts/:id/journals',
        CONSOLIDATIONS: '/funding/accounts/:id/consolidations',
        SYNCHRONISATIONS: '/funding/accounts/:id/synchronisations',
    },
    BOND: {
        SELF: '/funding/bonds',
        LIST: '/funding/bonds/list',
    },
    BOURSE: {
        SELF: '/funding/bourse',
        PROJECT: {
            SELF: '/funding/bourse/projects',
            LIST: '/funding/bourse/projects/list',
        },
        REQUEST: {
            SELF: '/funding/bourse/requests',
            MINE: '/funding/bourse/requests/mine',
            LIST: '/funding/bourse/requests/list',
        },
        OFFER: {
            SELF: '/funding/bourse/offers',
            MINE: '/funding/bourse/offers/mine',
            LIST: '/funding/bourse/offers/list',
            CREATE_MINE: '/funding/bourse/offers/mine/create',
        },
        DEALS: {
            SELF: '/funding/deals',
            SENT: '/funding/deals/sent',
            RECEIVED: '/funding/deals/received',
        }
    }
} as const;

export const ASSETS = {
    SELF: '/assets',
    ITEM: {
        SELF: '/assets/items',
        LIST: '/assets/items/list',
        MINE: '/assets/items/mine',
        CREATE: '/assets/items/create',
        UPDATE: '/assets/items/:id/update',
        CHILD: '/assets/items/:id/assets',
        MINE_CHILD: '/assets/items/mine/:id/assets',
        SUB_CHILD: '/assets/items/:id/assets/:ref',
        MINE_SUB_CHILD: '/assets/items/mine/:id/assets/:ref',
    },
    PROFILE: {
        SELF: '/assets/profiles',
        LIST: '/assets/profiles/list',
        CREATE: '/assets/profiles/create',
    },
    SERIES: {
        SELF: '/assets/series',
        LIST: '/assets/series/list',
        CREATE: '/assets/series/create',
        TYPE: {
            SELF: '/assets/series/types',
            LIST: '/assets/series/types/list', 
            CREATE: '/assets/series/types/create',
        }
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
        UPDATE: `/user-account-types/types/:id/update`,
        CHAIN_CREATE: '/user-account-types/types/:id/chains/create',
        CHAIN_UPDATE: '/user-account-types/types/:id/chains/:chainId',
    },
    CATEGORY: {
        SELF: '/user-account-types/categories',
        LIST: '/user-account-types/categories/list',
        CREATE: '/user-account-types/categories/create',
        UPDATE: `/user-account-types/categories/:id/update`
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
        CREATE: '/groups/types/create',
        UPDATE: '/groups/types/:id/update'
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
        CREATE: '/groups/categories/create',
        UPDATE: '/groups/categories/:id/update'
    },
    FUNDING_OPTION: {
        SELF: '/groups/funding-options',
        OPTION: {
            SELF: '/groups/funding-options/options',
            LIST: '/groups/funding-options/options/list',
            CREATE: '/groups/funding-options/options/create',
        },
        CATEGORY: {
            SELF: '/groups/funding-options/categories',
            LIST: '/groups/funding-options/categories/list',
            CREATE: '/groups/funding-options/categories/create',
        },
        TYPE: {
            SELF: '/groups/funding-options/types',
            LIST: '/groups/funding-options/types/list',
            CREATE: '/groups/funding-options/types/create',
        },
        SUPPORT_TYPE: {
            SELF: '/groups/funding-options/supports/types',
            LIST: '/groups/funding-options/supports/types/list',
            CREATE: '/groups/funding-options/supports/types/create',
        },
    },
    STRUCTURE: {
        SELF: '/groups/structures',
        MISSION: {
            SELF: '/groups/structures/missions',
            LIST: '/groups/structures/missions/list',
            CREATE: '/groups/structures/missions/create',
        },
        POST_TYPE: {
            SELF: '/groups/structures/post-types',
            LIST: '/groups/structures/post-types/list',
            CREATE: '/groups/structures/post-types/create',
        },
        ORGANE_TYPE: {
            SELF: '/groups/structures/organes-types',
            LIST: '/groups/structures/organes-types/list',
            CREATE: '/groups/structures/organes-types/create',
            UPDATE: '/groups/structures/organes-types/:id/update',
        }
    },
    COMMUNITY: {
        SELF: '/groups/communities',
        SPACE: {
            SELF: '/groups/communities/space',
            ALL: '/groups/communities/space/all',
            MINE: '/groups/communities/space/mine',
            REQUEST: '/groups/communities/space/requests',
            PENDING: '/groups/communities/space/pending',
            MESSAGE: '/groups/communities/space/messages',
            MEMBER: '/groups/communities/space/members'
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
        PROJECT: {
            SELF: '/groups/administration/projects',
            LIST: '/groups/administration/projects/list',
            DEALS: '/groups/administration/projects/deals',
            CONFIGURATION: {  
                SELF: "/groups/administration/projects/configurations",  
                ATTRIBUTE: {
                    SELF: "/groups/administration/projects/configurations/attributes",
                    LIST: "/groups/administration/projects/configurations/attributes/list",
                    CREATE: "/groups/administration/projects/configurations/attributes/create",
                    UPDATE: "/groups/administration/projects/configurations/attributes/:id/update",
                    PROPERTIES: "/groups/administration/projects/configurations/attributes/:id/properties"
                },
                FINANCEMENT: {
                    SELF: "/groups/administration/projects/configurations/financements",
                    LIST: "/groups/administration/projects/configurations/financements/list",
                    CREATE: "/groups/administration/projects/configurations/financements/create",
                    UPDATE: "/groups/administration/projects/configurations/financements/:id/update",
                },
                PRODUCT: {
                    SELF: "/groups/administration/projects/configurations/products",
                    LIST: "/groups/administration/projects/configurations/products/list",
                    CREATE: "/groups/administration/projects/configurations/products/create",
                },
                SETTING: {
                    SELF: "/groups/administration/projects/configurations/settings",
                    SETTING: "/groups/administration/projects/configurations/settings/self",
                }
            },
            FINANCIAL_STRUCTURE: {
                SELF: "/groups/administration/projects/financial-structures",
                LIST: "/groups/administration/projects/financial-structures/list",
                CREATE: "/groups/administration/projects/financial-structures/create",
                CAMPAIGN_LIST: "/groups/administration/projects/financial-structures/:id/list",
                CAMPAIGN_CREATE: "/groups/administration/projects/financial-structures/:id/create",
            }
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
        ACCOUNTS: "/profiles/users/account",
        BLOG: "/profiles/users/blog",
    },
    ASSISTANCE: {
        SELF: "/profiles/assistance",
        USER: "/profiles/assistance/user",
        CREATE_ACCOUNT: "/profiles/assistance/create-account",
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
    SUBSCRIPTION: {
        SELF: "/projects/subscriptions",
        LIST: "/projects/subscriptions/list",
        CREATE: "/projects/subscriptions/create"
        
    },
    MINE: {
        SELF: "/projects/mines",
        FOLDER: {
            SELF: "/projects/mines/folders",
            LIST: "/projects/mines/folders/list",
            CREATE: "/projects/mines/folders/create",
            UPDATE: "/projects/mines/folders/:id/update",
        },
        FUNDING: {
            SELF: "/projects/mines/fundings",
            LIST: "/projects/mines/fundings/list",
            CREATE: "/projects/mines/fundings/create",
            UPDATE: "/projects/mines/fundings/:id/update",
        },
        ITEM: {
            SELF: "/projects/mines/items",
            LIST: "/projects/mines/items/list",
            CREATE: "/projects/mines/items/create",
        }
    },
    CONFIGURATION: {  
        SELF: "/projects/configurations",  
        ATTRIBUTE: {
            SELF: "/projects/configurations/attributes",
            LIST: "/projects/configurations/attributes/list",
            CREATE: "/projects/configurations/attributes/create",
            UPDATE: "/projects/configurations/attributes/:id/update",
            PROPERTIES: "/projects/configurations/attributes/:id/properties"
        },
        FINANCEMENT: {
            SELF: "/projects/configurations/financements",
            LIST: "/projects/configurations/financements/list",
            UPDATE: "/projects/configurations/financements/:id/update",
        }
    }
}

export const MARKETPLACE = {
    SELF: "/marketplace",
    CART: "/marketplace/cart",
    ORDERS: "/marketplace/orders",
    CHECKOUT: "/marketplace/checkout",
    SALES: "/marketplace/orders/:id/sales",
    SUB_ORDERS: "/marketplace/orders/:id/orders",
    SHOP_PRODUCTS: "/marketplace/shop/:reference/products",
    SHOP: {
        SELF: "/marketplace/shop",
        PRIVATE: "/marketplace/shop/private",
        CLASSIC: "/marketplace/shop/classic",
        MARKETS: "/marketplace/shop/markets",
        FINANCIAL: "/marketplace/shop/financial",
    },
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
    MARKET: {
        SELF: "/marketplace/markets",
        LIST: "/marketplace/markets/list",
        CREATE: "/marketplace/markets/create",
        UPDATE: "/marketplace/markets/:id/update",
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
    DISCOUNT_MODELS: {
        SELF: "/marketplace/discounts-models",
        LIST: "/marketplace/discounts-models/list",
        CREATE: "/marketplace/discounts-models/create",
        UPDATE: "/marketplace/discounts-models/:id/update",
        REQUEST: "/marketplace/discounts-models/list/pending",
        PRODUCTS: "/marketplace/discounts-models/:id/products",
        MEMBERS: "/marketplace/discounts-models/:id/members",
    },
    BOOKING: {
        SELF: "/marketplace/bookings",
        LIST: "/marketplace/bookings/list",
        CREATE: "/marketplace/bookings/create",
        UPDATE: "/marketplace/bookings/:id/update",
    },
    STORE: {
        SELF: "/marketplace/store",
        PRODUCT: {
            SELF: "/marketplace/store/products",
            LIST: "/marketplace/store/products/list",
            CREATE: "/marketplace/store/products/create",
            UPDATE: "/marketplace/store/products/:reference/update",
            CONFIGURE: "/marketplace/store/products/:reference/configure",
        },
        DISTRIBUTION: {
            SELF: "/marketplace/store/distributions",
            LIST: "/marketplace/store/distributions/list",
            CREATE: "/marketplace/store/distributions/create",
            RECEIVED: "/marketplace/store/distributions/received",
        },
        DISCOUNT: {
            SELF: "/marketplace/store/discounts",
            LIST: "/marketplace/store/discounts/list",
            CREATE: "/marketplace/store/discounts/create",
            UPDATE: "/marketplace/store/discounts/:id/update",
            PRODUCTS: "/marketplace/store/discounts/:id/products",
        },
        BOOKING: {
            SELF: "/marketplace/store/bookings",
            LIST: "/marketplace/store/bookings/list",
        },
        PAYMENT: {
            SELF: "/marketplace/store/payments",
            LIST: "/marketplace/store/payments/list",
            CONFIGURATION: {
                SELF: "/marketplace/store/payments/configurations",
                LIST: "/marketplace/store/payments/configurations/list",
                CREATE: "/marketplace/store/payments/configurations/create",
                UPDATE: "/marketplace/store/payments/configurations/:id/update",
            }
        },
        ORDER: {
            SELF: "/marketplace/store/orders",
            LIST: "/marketplace/store/orders/list",
        },
        TICKET: {
            SELF: "/marketplace/store/tickets",
            LIST: "/marketplace/store/tickets/list",
            CREATE: "/marketplace/store/tickets/create",
        },
        OPTION: {
            SELF: "/marketplace/store/options",
            ITEM: {
                SELF: "/marketplace/store/options/items",
                LIST: "/marketplace/store/options/items/list",
                CREATE: "/marketplace/store/options/items/create",
            },
            SUPPORT: {
                SELF: "/marketplace/store/options/supports",
                LIST: "/marketplace/store/options/supports/list",
                CREATE: "/marketplace/store/options/supports/create",
            }, 
            TITLE: {
                SELF: "/marketplace/store/options/titles",
                LIST: "/marketplace/store/options/titles/list",
                CREATE: "/marketplace/store/options/titles/create",
            }
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
            SELF: "/settings/units/types",
            LIST: "/settings/units/types/list",
            CREATE: "/settings/units/types/create"
        },
        CURRENCY: {
            SELF: "/settings/units/currencies",
            LIST: "/settings/units/currencies/list",
            CREATE: "/settings/units/currencies/create",
            UPDATE: "/settings/units/currencies/:id/update"
        }
    },
    USER_FILE: {
        SELF: "/settings/user-files",
        LIST: "/settings/user-files/list",
        CREATE: "/settings/user-files/create",
        UPDATE: "/settings/user-files/:id/update",
        MODELS: "/settings/user-files/:id/models",
        MODEL_ITEMS: "/settings/user-files/models/:id/items",
    },
    PME_VOTE: {
        SELF: "/settings/pme-votes",
        LIST: "/settings/pme-votes/list",
        CREATE: "/settings/pme-votes/create",
        UPDATE: "/settings/pme-votes/:id/update",
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
    },
    IMMATRICULATION: {
        SELF: "/settings/immatriculations",
        LIST: "/settings/immatriculations/list",
        CREATE: "/settings/immatriculations/create",
        UPDATE: "/settings/immatriculations/:id/update",
    },
    MESSAGE_TEMPLATE: {
        SELF: "/settings/messages/templates",
        LIST: "/settings/messages/templates/list",
        CREATE: "/settings/messages/templates/create",
        UPDATE: "/settings/messages/templates/:id/update",
    },
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
            COMPLEMENTARY: '/network/coverage/partnerships/complementary',
        },
        AFFECTATION: {
            SELF: '/network/coverage/affectation',
            LIST: '/network/coverage/affectation/list'
        },
        USERS: {
            SELF: '/network/coverage/users',
            LIST: '/network/coverage/users/list',
            DETAILS: '/network/coverage/users/:id/details',
        },
        USSD: '/network/coverage/ussd'
    }
} as const;

export const RESOURCES = {
    SELF: '/resources',
    PAGE_FLOWS: {
        SELF: '/resources/page-flows',
        LIST: '/resources/page-flows/list',
        CREATE: '/resources/page-flows/create',
        UPDATE: '/resources/page-flows/:id/update',
        CHILD: {
            LIST: '/resources/page-flows/:id',
            CREATE: '/resources/page-flows/:id/create'
        },
    }
} as const;

export const BROKER = {
    SELF: '/brokers',
    AGENCY: {
        SELF: '/brokers/agencies',
        LIST: '/brokers/agencies/list',
        CREATE: '/brokers/agencies/create',
        UPDATE: '/brokers/agencies/update/:id',
    },
    COUNTER: {
        SELF: '/brokers/counters',
        LIST: '/brokers/counters/list',
        CREATE: '/brokers/counters/create',
        UPDATE: '/brokers/counters/update/:id',
    },
    CASHDESK: {
        SELF: '/brokers/cashdesks',
        LIST: '/brokers/cashdesks/list',
        CREATE: '/brokers/cashdesks/create',
    }
} as const;

export const MIPRO = {
    SELF: '/360',
    HOME: {
        SELF: '/360/home',
        DASHBOARD: '/360/home/dashboard',
        ACTIVITY: '/360/home/activities',
    },
    PREVISION: {
        SELF: '/360/previsions',
        LIST: '/360/previsions/list',
        CREATE: '/360/previsions/create',
    },
    PERIOD: {
        SELF: '/360/periods',
        LIST: '/360/periods/pre/:id/list',
        CREATE: '/360/periods/pre/:id/create',
    },
    GOAL: {
        SELF: '/360/goals',
        LIST: '/360/goals/list',
        CREATE: '/360/goals/create',
    },
    ADMINISTRATION: {
        SELF: '/360/administration',
        GOAL: {
            SELF: '/360/administration/goals',
            LIST: '/360/administration/goals/list',
            CREATE: '/360/administration/goals/create',
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
            UPDATE: '/bank/admin/prestations/update/:id',
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
        CASHDESK: {
            SELF: '/bank/operations/cashdesks',
            LIST: '/bank/operations/cashdesks/list',
        },
        BANK: {
            SELF: '/bank/operations/bank',
            LIST: '/bank/operations/bank/list',
            DRAFT: '/bank/operations/bank/draft',
            LIQUIDATION: '/bank/operations/bank/liquidation',
        },
        PSGAV: {
            SELF: '/bank/operations/psgav',
            LIST: '/bank/operations/psgav/list',
            DRAFT: '/bank/operations/psgav/draft',
            LIQUIDATION: '/bank/operations/psgav/liquidation',
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
            DECHARGE: '/bank/charges/agents/decharges',
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
    ACCOUNT: {
        SELF: '/bank/accounts',
        LIST: '/bank/accounts/list',
        DETAILS: '/bank/accounts/:id/transactions',
    },
    ORDERSERVICE: {
        SELF: '/bank/order-services',
        LIST: '/bank/order-services/list',
        ITEM: {
            SELF: '/bank/order-services/items',
            LIST: '/bank/order-services/items/list',
            CREATE: '/bank/order-services/items/create'
        }
    },
    PARTY: {
        SELF: '/bank/party',
        AGENT: {
            SELF: '/bank/party/agents',
            LIST: '/bank/party/agents/list',
            CREATE: '/bank/party/agents/create',
        },
        CASHDESK: {
            SELF: '/bank/party/cashdesks',
            LIST: '/bank/party/cashdesks/list',
            CREATE: '/bank/party/cashdesks/create',
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

export const SUPERVISION = {
    SELF: '/supervision',
    USERS: {
        SELF: '/supervision/users',
        LIST: '/supervision/users/list',
        DETAILS: '/supervision/users/:id/details',
    },
    PARTNERS: {
        SELF: '/supervision/partners',
        LIST: '/supervision/partners/list',
    },
    MEMBERS: {
        SELF: '/supervision/members',
        LIST: '/supervision/members/list',
    },
    PROJECTS: {
        SELF: '/supervision/projects',
        LIST: '/supervision/projects/list',
    },
    VOTES: {
        SELF: '/supervision/votes',
        LIST: '/supervision/votes/list',
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
