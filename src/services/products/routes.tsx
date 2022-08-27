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