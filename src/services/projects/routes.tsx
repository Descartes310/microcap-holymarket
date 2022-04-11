export const CREATE_POST = 'api/projects';
export const GET_PROJECTS = 'api/projects';
export const GET_PROJECT = (id) => `api/projects/${id}`;
export const UPDATE_PROJECT = (id) => `api/projects/${id}`;

export const GET_PROJECT_POSTS = 'api/projects/posts';
export const CREATE_PROJECT_POST = 'api/projects/posts';

export const GET_PROJECT_ACTIVITIES = (id) => `api/projects/${id}/activities`;
export const CREATE_PROJECT_ACTIVITY = (id) => `api/projects/${id}/activities`;

export const GET_PROJECT_ITEMS = 'api/projects/items';
export const CREATE_PROJECT_ITEM = 'api/projects/items';
export const GET_PROJECT_MINE_ITEMS = 'api/projects/items/mine';
export const CREATE_PROJECT_ITEM_COMPLEX = 'api/projects/items/complex';
export const UPDATE_PROJECT_ITEM_COMPLEX = (id) => `api/projects/items/complex/${id}`;

export const CREATE_INITIALIZATION = 'api/projects/initializations';
export const GET_PROJECT_INITIALIZATIONS = 'api/projects/initializations';
export const CREATE_INITIALIZATION_ITEM = (id) => `api/projects/initializations/${id}/items`;
export const GET_PROJECT_INITIALIZATION_ITEMS = (id) => `api/projects/initializations/${id}/items`;


export const GET_TABLE_DATAS = 'api/projects/tables/values';
export const CREATE_TABLE_DATAS = 'api/projects/tables/values';
export const GET_TABLE_STRUCTURE = (id) => `api/projects/tables/structures/${id}`;