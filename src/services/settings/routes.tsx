export const GET_USER_FILES = 'api/settings/user-file-types';
export const CREATE_USER_FILE = 'api/settings/user-file-types';
export const GET_ALL_USER_FILES = 'api/settings/user-file-types/all';
export const FIND_USER_TYPE = (id) => `api/settings/user-file-types/${id}`;
export const UPDATE_USER_TYPE = (id) => `api/settings/user-file-types/${id}`;
export const UPDATE_USER_FILE_TYPE = (id) => `api/settings/user-file-types/${id}/type`;
export const REQUIRED_USER_FILE_TYPE = (id) => `api/settings/user-file-types/${id}/required`;

export const CREATE_AGENT = 'api/settings/agents';
export const GET_AGENTS = 'api/settings/agents/list';
export const UPDATE_AGENT = (id) => `api/settings/agents/${id}`;
export const CHANGE_AGENT_MAIN = (id) => `api/settings/agents/${id}/main`;
export const CHANGE_AGENT_ACTIVE = (id) => `api/settings/agents/${id}/active`;

export const CREATE_EVENT = 'api/settings/events';
export const GET_EVENTS = 'api/settings/events/list';

export const CREATE_ARTICLE = 'api/settings/articles';
export const GET_ALL_ARTICLES = 'api/settings/articles';
export const GET_USER_ARTICLES = 'api/settings/articles/mines';
export const GET_ACTIVE_ARTICLES = 'api/settings/articles/list';
export const GET_BLOG_TOPICS = 'api/settings/articles/topics/list';
export const CREATE_BLOG_TOPIC = 'api/settings/articles/topics/create';
export const FIND_BLOG_TOPIC = (id) => `api/settings/articles/topics/${id}/find`;
export const GET_ARTICLE_DETAILS = (id) => `api/settings/articles/details/${id}`;
export const UPDATE_ARTICLE_STATUS = (id) => `api/settings/articles/${id}/status`;
export const UPDATE_BLOG_TOPIC = (id) => `api/settings/articles/topics/${id}/update`;

export const CREATE_IMMATRICULATION = 'api/identifications/immatriculations/types';
export const GET_IMMATRICULATIONS = 'api/identifications/immatriculations/types';
export const FIND_IMMATRICULATION = (id) => `api/identifications/immatriculations/types/${id}`;
export const UPDATE_IMMATRICULATION = (id) => `api/identifications/immatriculations/types/${id}`;
export const GET_IMMATRICULATIONS_BY_TERRITORY = 'api/identifications/immatriculations/types/public/list';

export const CREATE_MESSAGE_TEMPLATE = 'api/messages/templates';
export const GET_MESSAGE_TEMPLATES = 'api/messages/templates';
export const FIND_MESSAGE_TEMPLATE = (reference) => `api/messages/templates/${reference}`;
export const UPDATE_MESSAGE_TEMPLATE = (reference) => `api/messages/templates/${reference}`;
