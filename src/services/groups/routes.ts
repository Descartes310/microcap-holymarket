export const GET_GROUP_CATEGORIES = 'api/socialnetworks/groups/categories';
export const CREATE_GROUP_CATEGORY = 'api/socialnetworks/groups/categories';

export const GET_GROUP_TYPES = 'api/socialnetworks/groups/types';
export const CREATE_GROUP_TYPE = 'api/socialnetworks/groups/types';
export const SET_GROUP_TYPE_AS_DEFAULT = (id) => `api/socialnetworks/groups/types/${id}/status`;

export const GET_GROUP_MEMBERS = 'api/socialnetworks/groups/members';
export const ADD_MEMBER_TO_GROUP = 'api/socialnetworks/groups/members';
export const FIND_GROUP_MEMBER = (id) => `api/socialnetworks/groups/members/${id}`;
export const ADD_FILE_TO_MEMBER = (id) => `api/socialnetworks/groups/members/${id}/files`;

export const GET_COMMUNITY_DATAS = `api/socialnetworks/groups/self`;
export const UPDATE_GROUP_DETAILS = `api/socialnetworks/groups/self/details`;
export const GET_GROUP_DETAILS = (ref) => `api/socialnetworks/groups/self/${ref}/details`;
export const SEND_EXTERNAL_GROUP_INVITATION = `api/socialnetworks/groups/self/invitations`;
export const CREATE_UNCONVENTIONATED_GROUP = `api/socialnetworks/groups/self/unconventionated`;

export const SEND_GROUP_REQUEST = "api/socialnetworks/groups/members/requests";
export const RESPOND_REQUEST_FROM_GROUP = (id) => `api/socialnetworks/groups/members/requests/${id}`;

export const GET_GROUP_POSTS = "api/socialnetworks/groups/posts";
export const CREATE_GROUP_POST = "api/socialnetworks/groups/posts";
export const GET_GROUP_POST_MOTIVATIONS = `api/socialnetworks/groups/posts/motivations`;
export const CREATE_GROUP_POST_MOTIVATION = `api/socialnetworks/groups/posts/motivations`;
