export const GET_CATEGORIES = 'api/products/categories';
export const CREATE_CATEGORY = 'api/products/categories';

export const GET_PRODUCT_MODELS = 'api/products/models';
export const CREATE_PRODUCT_MODEL = 'api/products/models';
export const GET_PRODUCT_MODEL_AVAILABLES = 'api/products/models/availables';
export const FIND_PRODUCT_MODEL = (reference) => `api/products/models/find/${reference}`;

export const GET_PRODUCTS = 'api/products';
export const CREATE_PRODUCT = 'api/products';
export const GET_SHOP_PRODUCTS = 'api/products/shop';
export const GET_SHOP_PRODUCT_MODELS = 'api/products/shop/models';
export const CHANGE_PRODUCT_STATUS = (id) => `api/products/${id}/status`;
export const FIND_PRODUCT = (reference) => `api/products/find/${reference}`;

export const UPDATE_PRODUCT_DETAILS = 'api/products/details';
export const CREATE_CODEV_PRODUCT_MODEL = 'api/products/codevs';


export const CREATE_CODEV_OPTION = 'api/products/codev/options';
export const CREATE_CODEV_OPTION_DETAILS = (reference) => `api/products/codev/options/${reference}/details`;
export const GET_CODEV_OPTION_DETAILS = (reference) => `api/products/codev/options/${reference}/details`;
export const CREATE_CODEV_SIMPLE_OPTION = 'api/products/codev/options/create';
export const CREATE_CODEV_OPTION_TYPE = 'api/products/codev/type_option_titles';
export const GET_CODEV_OPTION_TYPE = 'api/products/codev/type_option_titles';
export const GET_CODEV_OPTION = 'api/products/codev/options';
export const CREATE_CODEV_DETAILS = 'api/products/codevs/details';
export const GET_CODEV_DETAILS = 'api/products/codevs/details';

export const CREATE_CODEV_SUPPORT_OPTION_TYPE = 'api/products/codev/support_options/types';
export const GET_CODEV_SUPPORT_OPTION_TYPE = 'api/products/codev/support_options/types';
export const CREATE_CODEV_SUPPORT_OPTION = 'api/products/codev/support_options';
export const GET_CODEV_SUPPORT_OPTION = 'api/products/codev/support_options';
export const GET_FREE_TIRAGE = 'api/products/codevs/tirages/availables';
export const GET_LINE_BY_DATE = 'api/products/codevs/line/dates';
export const GET_INDIVISION_BY_DATE = 'api/products/codevs/indivisions/dates';
export const CREATE_INDIVIVIONS = 'api/products/codevs/indivision';

export const GET_CONFIG_OPTIONS = 'api/products/codev/config_options';
export const CREATE_CONFIG_OPTION = 'api/products/codev/config_options';

export const CREATE_CODEV_TYPE_SUPPORT_OPTION = 'api/products/codev/options/create/support';
export const CREATE_CODEV_TYPE_OPTION_TITLE = 'api/products/codev/options/create/title';
export const GET_CODEV_TYPE_SUPPORT_OPTION = 'api/products/codev/options/supports';
export const GET_CODEV_TYPE_OPTION_TITLE = 'api/products/codev/options/titles';