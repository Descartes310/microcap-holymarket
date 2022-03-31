export const GET_USER_FILES = 'api/settings/user-file-types';
export const CREATE_USER_FILE = 'api/settings/user-file-types';

export const CREATE_AGENT = 'api/settings/agents';
export const GET_AGENTS = 'api/settings/agents/list';
export const UPDATE_AGENT = (id) => `api/settings/agents/${id}`;
export const CHANGE_AGENT_MAIN = (id) => `api/settings/agents/${id}/main`;
export const CHANGE_AGENT_ACTIVE = (id) => `api/settings/agents/${id}/active`;

export const CREATE_EVENT = 'api/settings/events';
export const GET_EVENTS = 'api/settings/events/list';

export const CREATE_ARTICLE = 'api/settings/articles';
export const GET_ALL_ARTICLES = 'api/settings/articles';
export const GET_ACTIVE_ARTICLES = 'api/settings/articles/list';
export const GET_ARTICLE_DETAILS = (id) => `api/settings/articles/details/${id}`;
export const UPDATE_ARTICLE_STATUS = (id) => `api/settings/articles/${id}/status`;