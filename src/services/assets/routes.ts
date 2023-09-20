export const CREATE_PARENT = 'api/assets/parents';
export const GET_ALL_PARENTS = 'api/assets/parents';
export const GET_MINE_PARENTS = 'api/assets/parents/mines';
export const FIND_PARENT = (reference) => `api/assets/parents/${reference}`;

export const CREATE_ITEM = 'api/assets';
export const FIND_ASSET = (reference) => `api/assets/${reference}`;
export const GET_ITEM_ITEMS = (reference) => `api/assets/${reference}/assets`;
export const GET_PARENT_ITEMS = (reference) => `api/assets/parents/${reference}/items`;

export const GET_SERIES_TYPES = 'api/assets/series/types';
export const CREATE_SERIES_TYPE = 'api/assets/series/types';

export const CREATE_MANAGEMENT = '/api/assets/management';
export const GET_PROFILES = '/api/assets/management/profiles';
export const CREATE_PROFILE = '/api/assets/management/profiles';
export const GET_COMPOSABLE = (reference) => `/api/assets/${reference}/composable`;
export const CREATE_COMPOSABLE = (reference) => `/api/assets/${reference}/composable`;
export const ASSET_PARTICIPANTS = (reference) => `/api/assets/management/${reference}/participants`;