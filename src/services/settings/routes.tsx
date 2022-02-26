export const GET_USER_FILES = 'api/settings/user-file-types';
export const CREATE_USER_FILE = 'api/settings/user-file-types';

export const CREATE_AGENT = 'api/settings/agents';
export const GET_AGENTS = 'api/settings/agents/list';
export const UPDATE_AGENT = (id) => `api/settings/agents/${id}`;
export const CHANGE_AGENT_MAIN = (id) => `api/settings/agents/${id}/main`;
export const CHANGE_AGENT_ACTIVE = (id) => `api/settings/agents/${id}/active`;

export const CREATE_EVENT = 'api/settings/events';
export const GET_EVENTS = 'api/settings/events/list';