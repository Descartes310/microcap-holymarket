export const GET_GROUP_CATEGORIES = 'api/socialnetworks/groups/categories';
export const CREATE_GROUP_CATEGORY = 'api/socialnetworks/groups/categories';

export const GET_GROUP_TYPES = 'api/socialnetworks/groups/types';
export const CREATE_GROUP_TYPE = 'api/socialnetworks/groups/types';

export const GET_GROUP_MEMBERS = 'api/socialnetworks/groups/members';
export const ADD_MEMBER_TO_GROUP = 'api/socialnetworks/groups/members';

export const GET_COMMUNITY_DATAS = `api/socialnetworks/groups/self`;
export const UPDATE_GROUP_DETAILS = `api/socialnetworks/groups/self/details`;
export const GET_GROUP_DETAILS = (ref) => `api/socialnetworks/groups/self/${ref}/details`;
export const SEND_EXTERNAL_GROUP_INVITATION = `api/socialnetworks/groups/self/invitations`;

export const SEND_GROUP_REQUEST = "api/socialnetworks/groups/members/requests";
export const RESPOND_REQUEST_FROM_GROUP = (id) => `api/socialnetworks/groups/members/requests/${id}`;
