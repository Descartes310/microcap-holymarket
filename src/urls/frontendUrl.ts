
export const ROOT = '/';
export const CART = '/cart';
export const CHECKOUT = '/cart/checkout';
export const MARKETS = '/:categoryReference/markets';
export const PRODUCTS = '/:categoryReference/markets/:marketReference/products/:reference';
export const MARKET_PRODUCT_MODELS = '/:categoryReference/markets/:marketReference/products';
export const HOME = '/home';
export const LANDING_PAGE_FLOW = '/page-flows';
export const PAYMENT = '/session/payments';
export const PUBLIC = {
    PROSPECTUS: '/prospectus/:id/details'
}


export const AUTH = {
    LOGIN: '/login',
    REGISTER: '/register',
    TOKEN: '/branch/activation',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
} as const;

export const MARKETPLACE = {
    SELF: "/marketplace",
    DELIVERY: {
        SELF: "/marketplace/delivery",
        ADMINISTRATION: {
            SELF: "/marketplace/delivery/administration",
            PENDING_PRODUCTS: "/marketplace/delivery/administration/pending-products",
            PARCELS: "/marketplace/delivery/administration/parcels",
            DELIVERIES: "/marketplace/delivery/administration/deliveries",
        },
        ZONE: {
            SELF: "/marketplace/delivery/zones",
            LIST: "/marketplace/delivery/zones/list",
            CREATE: "/marketplace/delivery/zones/create",
            UPDATE: "/marketplace/delivery/zones/:reference/update",
        }
    },
    CART: "/marketplace/cart",
    ORDERS: "/marketplace/orders",
    CHECKOUT: "/marketplace/checkout",
    SALES: "/marketplace/orders/:id/sales",
    SUB_ORDERS: "/marketplace/orders/:id/orders",
    SHOP_PRODUCTS: "/marketplace/shop/:reference/products",
    SHOP: {
        SELF: "/marketplace/shop",
        PRIVATE: "/marketplace/shop/private",
        HOLYMARKET: {
            SELF: "/marketplace/shop/holy-market",
            CATEGORIES: "/marketplace/shop/holy-market/categories",
            MARKETS: "/marketplace/shop/holy-market/categories/:categoryReference/markets",
            PRODUCTS: "/marketplace/shop/holy-market/categories/:categoryReference/markets/:marketReference",
        },
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
            UPDATE: "/marketplace/models/products/:reference/update",
            CONFIGURE: "/marketplace/models/products/:reference/configure",
        },
        PACKAGE: {
            SELF: "/marketplace/models/packages",
            LIST: "/marketplace/models/packages/list",
            CREATE: "/marketplace/models/packages/create",
            UPDATE: "/marketplace/models/packages/:reference/update",
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
