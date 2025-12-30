export const GET_VOTES = "api/pme-votes";
export const CREATE_VOTE = "api/pme-votes";
export const GET_PRODUCTS = "api/pme-votes/orders";
export const GET_PRODUCT_MODELS = "api/pme-votes/products";

export const GET_VOTE_CONFIGS = "api/pme-votes/configurations";
export const CREATE_VOTE_CONFIG = "api/pme-votes/configurations";
export const FIND_VOTE_CONFIG = (reference) => `api/pme-votes/configurations/${reference}`;
export const UPDATE_VOTE_CONFIG = (reference) => `api/pme-votes/configurations/${reference}`;

export const GET_LOGS = "api/sequences/logs";

export const GET_AUDIT_LOGS = 'api/audits/logs';

export const GET_INPUT_DATAS = 'api/systems/user-data-items';
export const GET_CONTACT_REQUESTS = 'api/systems/contact-requests';
export const TREAT_CONTACT_REQUEST = (reference) => `api/systems/contact-requests/${reference}/treat`;
export const SEND_MESSAGE = (reference) => `api/systems/contact-requests/${reference}/messages`;
export const GET_MESSAGES = (reference) => `api/systems/contact-requests/${reference}/messages`;
