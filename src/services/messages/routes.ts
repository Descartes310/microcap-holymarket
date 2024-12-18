export const SEND_MESSAGE = 'api/messages/send-message';

export const GET_BROADCASTS = 'api/broadcasts';
export const CREATE_BROADCAST = 'api/broadcasts';
export const GET_ALL_BROADCASTS = 'api/broadcasts/mines';
export const FIND_BROADCAST = (id) => `api/broadcasts/${id}`;
export const UPDATE_BROADCAST = (id) => `api/broadcasts/${id}`;
export const BROADCAST_MEMBERS = (id) => `api/broadcasts/${id}/members`;
export const ADD_BROADCAST_MEMBER = (id) => `api/broadcasts/${id}/members`;
export const SEND_BROADCAST_MESSAGE = (id) => `api/broadcasts/${id}/messages`;
export const DELETE_BROADCAST_MEMBER = (id) => `api/broadcasts/members/${id}`;
export const CONFIRM_BROADCAST_MEMBER = (id) => `api/broadcasts/${id}/members/confirm`;