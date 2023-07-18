export const GET_ACCOUNT_TYPE_CATEGORIES = 'api/socialnetworks/user-account-types/categories';
export const CREATE_ACCOUNT_TYPE_CATEGORY = 'api/socialnetworks/user-account-types/categories';
export const FIND_ACCOUNT_TYPE_CATEGORY = (id) => `api/socialnetworks/user-account-types/categories/${id}`;
export const UPDATE_ACCOUNT_TYPE_CATEGORY = (id) => `api/socialnetworks/user-account-types/categories/${id}`;

export const GET_ACCOUNT_TYPES = 'api/socialnetworks/user-account-types/self';
export const CREATE_ACCOUNT_TYPE = 'api/socialnetworks/user-account-types/self';
export const FIND_ACCOUNT_TYPE = (id) => `api/socialnetworks/user-account-types/self/${id}`;
export const UPDATE_ACCOUNT_TYPE = (id) => `api/socialnetworks/user-account-types/self/${id}`;

export const GET_ACCOUNTS = 'api/socialnetworks/users/accounts';
export const CREATE_ACCOUNT = 'api/socialnetworks/users/accounts';
export const SET_ACCOUNT_TYPE_AS_DEFAULT = (id) => `api/socialnetworks/user-account-types/self/${id}/status`;

export const GET_CHAINS = (id) => `api/socialnetworks/user-account-types/self/${id}/chains`;
export const CREATE_CHAIN = (id) => `api/socialnetworks/user-account-types/self/${id}/chains`;
