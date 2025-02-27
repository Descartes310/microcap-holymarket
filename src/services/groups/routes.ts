export const GET_GROUP_CATEGORIES = 'api/socialnetworks/groups/categories';
export const CREATE_GROUP_CATEGORY = 'api/socialnetworks/groups/categories';
export const GET_GROUP_CATEGORY = (reference) => `api/socialnetworks/groups/categories/${reference}`;
export const UPDATE_GROUP_CATEGORY = (reference) => `api/socialnetworks/groups/categories/${reference}`;
export const CHANGE_CATEGORY_TO_JURIDIC = (reference) => `api/socialnetworks/groups/categories/${reference}/juridic`;

export const GET_GROUP_TYPES = 'api/socialnetworks/groups/types';
export const CREATE_GROUP_TYPE = 'api/socialnetworks/groups/types';
export const GET_JURIDIC_TYPES = 'api/socialnetworks/groups/types/juridics';
export const UPDATE_GROUP_TYPE = (reference) => `api/socialnetworks/groups/types/${reference}`;
export const SET_GROUP_TYPE_AS_DEFAULT = (id) => `api/socialnetworks/groups/types/${id}/status`;
export const FIND_GROUP_TYPE = (reference) => `api/socialnetworks/groups/types/find/${reference}`;

export const GET_GROUP_MEMBERS = 'api/socialnetworks/groups/members';
export const ADD_MEMBER_TO_GROUP = 'api/socialnetworks/groups/members';
export const FIND_GROUP_MEMBER = (id) => `api/socialnetworks/groups/members/${id}`;
export const UPDATE_MEMBER_GROUP = (id) => `api/socialnetworks/groups/members/${id}`;
export const ADD_FILE_TO_MEMBER = (id) => `api/socialnetworks/groups/members/${id}/files`;
export const FIND_GROUP_MEMBER_BY_REFERENCE = (id) => `api/socialnetworks/groups/members/find/${id}`;

export const GET_COMMUNITY_DATAS = `api/socialnetworks/groups/self`;
export const UPDATE_GROUP_DETAILS = `api/socialnetworks/groups/self/details`;
export const GET_GROUP_DETAILS = (ref) => `api/socialnetworks/groups/self/${ref}/details`;
export const SEND_EXTERNAL_GROUP_INVITATION = `api/socialnetworks/users/self/invitations`;
export const CREATE_UNCONVENTIONATED_GROUP = `api/socialnetworks/groups/self/unconventionated`;

export const SEND_GROUP_REQUEST = "api/socialnetworks/groups/members/requests";
export const RESPOND_REQUEST_FROM_GROUP = (id) => `api/socialnetworks/groups/members/requests/${id}`;

export const GET_GROUP_POSTS = "api/socialnetworks/groups/posts";
export const CREATE_GROUP_POST = "api/socialnetworks/groups/posts";
export const FIND_GROUP_POST = (id) => `api/socialnetworks/groups/posts/${id}`;
export const UPDATE_GROUP_POST = (id) => `api/socialnetworks/groups/posts/${id}`;
export const GET_GROUP_POST_MOTIVATIONS = `api/socialnetworks/groups/posts/motivations`;
export const CREATE_GROUP_POST_MOTIVATION = `api/socialnetworks/groups/posts/motivations`;

export const CREATE_ARTICLE = 'api/socialnetworks/groups/articles';
export const GET_ALL_ARTICLES = 'api/socialnetworks/groups/articles';
export const GET_ACTIVE_ARTICLES = 'api/socialnetworks/groups/articles/list';
export const GET_BLOG_TOPICS = 'api/socialnetworks/groups/articles/topics/list';
export const CREATE_BLOG_TOPIC = 'api/socialnetworks/groups/articles/topics/create';
export const FIND_BLOG_TOPIC = (id) => `api/socialnetworks/groups/articles/topics/${id}/find`;
export const GET_ARTICLE_DETAILS = (id) => `api/socialnetworks/groups/articles/details/${id}`;
export const UPDATE_ARTICLE_STATUS = (id) => `api/socialnetworks/groups/articles/${id}/status`;
export const UPDATE_BLOG_TOPIC = (id) => `api/socialnetworks/groups/articles/topics/${id}/update`;

export const GET_FUNDING_OPTIONS = `api/socialnetworks/groups/types/funding-options`;
export const DELETE_FUNDING_OPTIONS = `api/socialnetworks/groups/types/funding-options`;
export const CREATE_FUNDING_OPTIONS = `api/socialnetworks/groups/types/funding-options`;
export const GET_GROUP_FUNDING_OPTIONS = (reference) => `api/socialnetworks/groups/types/${reference}/funding-options`;

export const CREATE_FUNDING_OPTION_CATEGORIES = `api/socialnetworks/groups/types/funding-options/categories`;
export const GET_FUNDING_OPTION_CATEGORIES = `api/socialnetworks/groups/types/funding-options/categories`;
export const CREATE_FUNDING_OPTION_TYPES = `api/socialnetworks/groups/types/funding-options/types`;
export const GET_FUNDING_OPTION_TYPES = `api/socialnetworks/groups/types/funding-options/types`;
export const GET_FUNDING_OPTION_TYPES_BY_GROUP = `api/socialnetworks/groups/types/funding-options/types/by-group`;
export const GET_FUNDING_TYPE_BY_CATEGORY = (reference) => `api/socialnetworks/groups/types/funding-options/categories/${reference}/types`;
export const GET_FUNDING_OPTION_TYPES_SUPPORTS = (reference) => `api/socialnetworks/groups/types/funding-options/types/${reference}/supports`;

export const CREATE_SUPPORT_TYPES = `api/socialnetworks/groups/types/funding-options/supports/types`;
export const GET_SUPPORT_TYPES = `api/socialnetworks/groups/types/funding-options/supports/types`;

export const ADD_GROUP_OPTION_TYPE = (reference) => `api/socialnetworks/groups/types/funding-options/types/${reference}/groups`;
export const GET_GROUP_OPTION_TYPES = (reference) => `api/socialnetworks/groups/types/funding-options/types/${reference}/groups`;
export const DELETE_GROUP_OPTION_TYPE = (reference) => `api/socialnetworks/groups/types/funding-options/types/${reference}/groups`;

export const GET_POST_TYPES = `api/socialnetworks/groups/structures/post-types`;
export const GET_STRUCTURE_TYPES = `api/socialnetworks/groups/structures/types`;
export const CREATE_POST_TYPE = `api/socialnetworks/groups/structures/post-types`;
export const CREATE_STRUCTURE_TYPE = `api/socialnetworks/groups/structures/types`;
export const GET_STRUCTURE_MISSIONS = `api/socialnetworks/groups/structures/missions`;
export const CREATE_STRUCTURE_MISSION = `api/socialnetworks/groups/structures/missions`;
export const FIND_STRUCTURE_TYPE = (reference) => `api/socialnetworks/groups/structures/types/${reference}`;
export const UPDATE_STRUCTURE_TYPE = (reference) => `api/socialnetworks/groups/structures/types/${reference}`;

export const ADD_GROUP_STRUCTURE_TYPE = (reference) => `api/socialnetworks/groups/structures/types/${reference}/groups`;
export const GET_GROUP_STRUCTURE_TYPES = (reference) => `api/socialnetworks/groups/structures/types/${reference}/groups`;
export const DELETE_GROUP_STRUCTURE_TYPE = (reference) => `api/socialnetworks/groups/structures/types/${reference}/groups`;

export const GET_FUNDING_OPTION_BY_GROUP_TYPE = (reference) => `api/socialnetworks/groups/types/${reference}/funding-option-types`;

export const GET_FINANCIAL_STRUCTURES = `api/socialnetworks/groups/types/financial-structures`;
export const CREATE_FINANCIAL_STRUCTURES = `api/socialnetworks/groups/types/financial-structures`;
export const DELETE_FINANCIAL_STRUCTURES = `api/socialnetworks/groups/types/financial-structures`;
export const CHANGE_FINANCIAL_STRUCTURE_STATUS = (reference) => `api/socialnetworks/groups/types/financial-structures/${reference}/status`;
export const CHANGE_FINANCIAL_STRUCTURE_FINANCABLE = (reference) => `api/socialnetworks/groups/types/financial-structures/${reference}/financable`;
export const GET_FINANCIAL_STRUCTURE_ACTIVE_SUPPORTS = `api/socialnetworks/groups/types/financial-structures/active/supports`;

export const GET_CAMPAIGNS = `api/socialnetworks/groups/structures/campaigns`;
export const CREATE_CAMPAIGN = `api/socialnetworks/groups/structures/campaigns`;
export const CHANGE_CAMPAIGN_STATUS = (reference) => `api/socialnetworks/groups/structures/campaigns/${reference}`;

export const GET_FINANCIAL_STRUCTURE_SUPPORTS = (reference) => `api/socialnetworks/groups/types/financial-structures/${reference}/supports`;
export const CREATE_FINANCIAL_STRUCTURE_SUPPORT = (reference) => `api/socialnetworks/groups/types/financial-structures/${reference}/supports`;

