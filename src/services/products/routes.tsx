export const GET_CATEGORIES = 'api/products/categories';
export const CREATE_CATEGORY = 'api/products/categories';

export const GET_PRODUCT_MODELS = 'api/products/models';
export const CREATE_PRODUCT_MODEL = 'api/products/models';
export const GET_PRODUCT_BY_MODEL_CODE = 'api/products/models/sellers';
export const GET_PRODUCT_MODEL_AVAILABLES = 'api/products/models/availables';
export const FIND_PRODUCT_MODEL = (reference) => `api/products/models/find/${reference}`;
export const FIND_AGGREGATION_PRODUCT_MODELS = (reference) => `api/products/models/${reference}/aggregations`;

export const GET_PRODUCTS = 'api/products';
export const CREATE_PRODUCT = 'api/products';
export const GET_SHOP_PRODUCTS = 'api/products/shop';
export const GET_SHOP_PRODUCT_MODELS = 'api/products/shop/models';
export const UPDATE_PRODUCT = (reference) => `api/products/${reference}`;
export const CHANGE_PRODUCT_STATUS = (id) => `api/products/${id}/status`;
export const FIND_PRODUCT = (reference) => `api/products/find/${reference}`;

export const UPDATE_PRODUCT_DETAILS = 'api/products/details';
export const CREATE_CODEV_PRODUCT_MODEL = 'api/products/codevs';
export const CODEV_PARTICIPANTS = 'api/products/codevs/participants';
export const CODEV_INVITE_PARTICIPANT = 'api/products/codevs/subscribers/invite';
export const CODEV_INVITE_PARTICIPANT_RESPONSE = 'api/products/codevs/subscribers/invite/response';


export const CREATE_CODEV_OPTION = 'api/products/codev/options';
export const CREATE_CODEV_OPTION_DETAILS = (reference) => `api/products/codev/options/${reference}/details`;
export const GET_CODEV_OPTION_DETAILS = (reference) => `api/products/codev/options/${reference}/details`;
export const CREATE_CODEV_SIMPLE_OPTION = 'api/products/codev/options/create';
export const CREATE_CODEV_OPTION_TYPE = 'api/products/codev/type_option_titles';
export const GET_CODEV_OPTION_TYPE = 'api/products/codev/type_option_titles';
export const GET_CODEV_OPTION = 'api/products/codev/options';
export const CREATE_CODEV_DETAILS = 'api/products/codevs/details';
export const GET_CODEV_DETAILS = 'api/products/codevs/details';
export const GENERATE_TIRAGES = 'api/products/codevs/tirage/active';

export const CREATE_CODEV_SUPPORT_OPTION_TYPE = 'api/products/codev/support_options/types';
export const GET_CODEV_SUPPORT_OPTION_TYPE = 'api/products/codev/support_options/types';
export const CREATE_CODEV_SUPPORT_OPTION = 'api/products/codev/support_options';
export const GET_CODEV_SUPPORT_OPTION = 'api/products/codev/support_options';
export const GET_FREE_TIRAGE = 'api/products/codevs/tirages/availables';
export const GET_LINE_BY_DATE = 'api/products/codevs/line/dates';
export const GET_INDIVISION_BY_DATE = 'api/products/codevs/indivisions/dates';
export const GET_INDIVISION_BY_LINE = 'api/products/codevs/indivisions/line';
export const GET_TICKET_BY_INDIVISION = 'api/products/codevs/indivisions/tickets';
export const GET_INDIVISION_BY_PRODUCT = 'api/products/codevs/indivisions/availables';
export const CREATE_INDIVIVIONS = 'api/products/codevs/indivision';
export const CREATE_SUBSCRIBER = 'api/products/codevs/subscribers';
export const GET_TICKET_BY_ACCOUNT = 'api/products/codevs/tickets-by-account';

export const GET_CONFIG_OPTIONS = 'api/products/codev/config_options';
export const CREATE_CONFIG_OPTION = 'api/products/codev/config_options';

export const CREATE_CODEV_TYPE_SUPPORT_OPTION = 'api/products/codev/options/create/support';
export const CREATE_CODEV_TYPE_OPTION_TITLE = 'api/products/codev/options/create/title';
export const GET_CODEV_TYPE_SUPPORT_OPTION = 'api/products/codev/options/supports';
export const GET_CODEV_TYPE_OPTION_TITLE = 'api/products/codev/options/titles';


export const DELETE_LINE_BOOKING = 'api/products/codevs/lines/free';
export const DELETE_INDIVISION_BOOKING = 'api/products/codevs/indivisions/free';
export const CREATE_LINE_BOOKING = 'api/products/codevs/lines/book';
export const CREATE_INDIVISION_BOOKING = 'api/products/codevs/indivisions/book';


export const GET_LINE_GLOBAL_INFO = 'api/products/codevs/line/global';
export const GET_LINE_SUPPORTS = 'api/products/codevs/line/supports';

export const FIND_MY_CODEVS = 'api/products/codevs/mines';
export const FIND_MY_TICKETS = 'api/products/codevs/tickets/mines';
export const FIND_TICKET_BY_CODE = 'api/products/codevs/tickets/code';
export const FIND_TICKET_BY_PERIOD = 'api/products/codevs/tickets/period';
export const FIND_TICKETS_FROM_PRODUCT = 'api/products/codevs/tickets/product';
export const GET_COTATIONS = (reference) => `api/products/${reference}/cotations`;
export const UPDATE_COTATION = (reference) => `api/products/${reference}/cotations`;

export const GET_TICKET_TYPES = 'api/products/codevs/tickets/types';
export const CREATE_TICKET_TYPE = 'api/products/codevs/tickets/types';
export const GET_CHILD_TICKETS = (reference) => `api/products/codevs/tickets/${reference}/child`;
export const CREATE_CHILD_TICKETS = (reference) => `api/products/codevs/tickets/${reference}/child`;

export const GET_CUSTOM_CARTS = 'api/products/custom-carts';
export const CREATE_CUSTOM_CART = 'api/products/custom-carts';

export const GET_DISCOUNTS = 'api/discounts';
export const CREATE_DISCOUNT = 'api/discounts';
export const FIND_DISCOUNT = (reference) => `api/discounts/${reference}`;
export const UPDATE_DISCOUNT = (reference) => `api/discounts/${reference}`;
export const DELETE_DISCOUNT = (reference) => `api/discounts/${reference}`;
export const GET_DISCOUNT_PRODUCTS = (reference) => `api/discounts/${reference}/products`;
export const CREATE_DISCOUNT_PRODUCT = (reference) => `api/discounts/${reference}/products`;
export const DELETE_DISCOUNT_PRODUCT = (reference) => `api/discounts/${reference}/products`;