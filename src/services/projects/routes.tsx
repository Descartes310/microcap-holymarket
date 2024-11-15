export const CREATE_POST = 'api/projects';
export const GET_PROJECTS = 'api/projects';
export const GET_ALL_PROJECTS = 'api/projects/all';
export const GET_PROJECT = (id) => `api/projects/${id}`;
export const GET_PROJECTS_BY_GROUP = 'api/projects/groups';
export const UPDATE_PROJECT = (id) => `api/projects/${id}`;

export const GET_PROJECT_POSTS = 'api/projects/posts';
export const CREATE_PROJECT_POST = 'api/projects/posts';

export const GET_PROJECT_GALLERY = 'api/projects/gallery';
export const GET_PROJECT_ACTIVITIES = (id) => `api/projects/${id}/activities`;
export const CREATE_PROJECT_ACTIVITY = (id) => `api/projects/${id}/activities`;
export const ACTIVE_PROJECT_ACTIVITIES = (id) => `api/projects/activities/${id}/active`;

export const GET_PROJECT_ITEMS = 'api/projects/items';
export const CREATE_PROJECT_ITEM = 'api/projects/items';
export const GET_PROJECT_MINE_ITEMS = 'api/projects/items/mine';
export const CREATE_PROJECT_ITEM_COMPLEX = 'api/projects/items/complex';
export const UPDATE_PROJECT_ITEM_COMPLEX = (id) => `api/projects/items/complex/${id}`;
export const GET_PROJECT_ITEMS_BY_PROJECT = (reference) => `api/projects/${reference}/items`;

export const CREATE_INITIALIZATION = 'api/projects/initializations';
export const GET_PROJECT_INITIALIZATIONS = 'api/projects/initializations';
export const CREATE_INITIALIZATION_ITEM = (id) => `api/projects/initializations/${id}/items`;
export const GET_PROJECT_INITIALIZATION_ITEMS = (id) => `api/projects/initializations/${id}/items`;


export const GET_TABLE_DATAS = 'api/projects/tables/values';
export const CREATE_TABLE_DATAS = 'api/projects/tables/values';
export const GET_TABLE_STRUCTURE = (id) => `api/projects/tables/structures/${id}`;
export const UPDATE_DATA_TABLE_INVESTMENT = (id) => `api/projects/tables/values/${id}`;

export const GET_ATTRIBUTES = 'api/projects/attributes';
export const CREATE_ATTRIBUTE = 'api/projects/attributes';
export const FIND_ATTRIBUTE = (reference) => `api/projects/attributes/${reference}`;
export const UPDATE_ATTRIBUTE = (reference) => `api/projects/attributes/${reference}`;

export const GET_PROPERTIES = `api/projects/properties`;
export const CREATE_PROPERTY = `api/projects/properties`;
export const GET_FULL_PROPERTIES = `api/projects/properties/full`;

export const GET_PRODUCTS = `api/projects/products`;
export const CREATE_PRODUCT = `api/projects/products`;

export const GET_PROJECT_SUBSCRIPTIONS = `api/projects/subscriptions`;
export const CREATE_PROJECT_SUBSCRIPTION = `api/projects/subscriptions`;


export const CREATE_PROJECT_SETTINGS = `api/projects/settings`;
export const GET_PROJECT_SETTINGS = `api/projects/settings`;

export const GET_PROJECT_INVESTMENT = `api/projects/investments`;
export const CREATE_PROJECT_INVESTMENT = `api/projects/investments`;