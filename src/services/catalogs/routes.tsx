export const GET_CATALOGS = 'api/catalogs';
export const CREATE_CATALOG = 'api/catalogs';
export const CHANGE_CATALOG_STATUS = (id) => `api/catalogs/${id}/status`;

export const GET_CATALOG_PRODUCTS = (id) => `api/catalogs/${id}/products`;
export const ADD_CATALOG_PRODUCTS = (id) => `api/catalogs/${id}/products`;
export const DELETE_CATALOG_PRODUCT = (id) => `api/catalogs/${id}/products`;