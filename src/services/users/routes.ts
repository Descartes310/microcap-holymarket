export const KYC = "api/socialnetworks/users/self/all";
export const GENERATE_OTP = "api/socialnetworks/users/self/otp";
export const REGISTER = "api/socialnetworks/users/self/register";
export const USER_BLOGS = "api/socialnetworks/users/self/blogs";
export const CREATE_ACCESS = 'api/socialnetworks/users/access/new';
export const GET_USER_ACCESS = "api/socialnetworks/users/self/access";
export const UPDATE_PROFILE = "api/socialnetworks/users/self/profile";
export const GET_BRANCH_USERS = "api/socialnetworks/users/self/by-branch";
export const CONFIRM_OTP = (otp) => `api/socialnetworks/users/self/otp/${otp}`;
export const RESET_PASSWORD = "api/socialnetworks/users/access/reset-password";
export const GET_BLOG_SETTINGS = `api/socialnetworks/users/self/blogs/settings`;
export const UPDATE_BLOG_SETTINGS = `api/socialnetworks/users/self/blogs/settings`;
export const CHANGE_ACCESS = (id) => `api/socialnetworks/users/access/${id}/change`;
export const USER_KYC = (reference) => `api/socialnetworks/users/self/${reference}/all`;
export const RESET_PASSWORD_LINK = "api/socialnetworks/users/access/send-password-link";
export const CHANGE_ACCESS_LOGIN = (id) => `api/socialnetworks/users/access/${id}/login`;
export const ACTIVATE_OR_BLOCK_ACCESS = "api/socialnetworks/users/access/activate-or-block";
export const USER_ARTICLES = (reference) => `api/socialnetworks/users/self/blogs/${reference}`;
export const GET_USER_BY_REFERENCE = (ref) => `api/socialnetworks/users/self/reference/${ref}`;
export const CHANGE_ACCESS_PASSWORD = (id) => `api/socialnetworks/users/access/${id}/password`;
export const GET_USER_BY_MEMBERSHIP = (membership) => `api/socialnetworks/users/self/membership/${membership}`;
export const CHANGE_ACCESS_FROM_COMMUNITY = (reference) => `api/socialnetworks/users/access/${reference}/change/community`;

export const GET_INSTITUTIONS = "api/socialnetworks/users/institutions";
export const CREATE_INSTITUTION = "api/socialnetworks/users/institutions";
export const GET_BANK_AGENCY_CODE = "api/socialnetworks/users/institutions/agency-code";

export const GET_CONTACTS = "api/socialnetworks/users/self/contacts";
export const CREATE_CONTACT = "api/socialnetworks/users/self/contacts";
export const UPDATE_CONTACTS = (id) => `api/socialnetworks/users/self/contacts/${id}`;
export const CONFIRM_CONTACT_CODE = `api/socialnetworks/users/self/contacts/confirm-code`;
export const SEND_CONTACT_CODE = (id) => `api/socialnetworks/users/self/contacts/${id}/send-code`;
export const SET_AS_NOTIFICATION = (id) => `api/socialnetworks/users/self/contacts/${id}/notification`;

export const ACTIVATE_PASS = (reference) => `api/socialnetworks/users/pass/${reference}/active`;
export const TRANSFER_PASS = (reference) => `api/socialnetworks/users/pass/${reference}/transfer`;
export const FIND_PASS_FROM_ORDER = (reference) => `api/socialnetworks/users/pass/order/${reference}`;
export const AUTHENTICATE = (reference) => `api/socialnetworks/users/self/${reference}/authenticate`;


export const GET_USSD_AUTH = `ussd/authorizations`;


export const CREATE_FILE= "api/socialnetworks/users/files";
export const GET_FILES = "api/socialnetworks/users/files";
export const GET_FILES_BY_MEMBER = (reference) => `api/socialnetworks/users/files/${reference}`;
export const VALIDATE_FILE = (reference) => `api/socialnetworks/users/files/${reference}/validate`;
