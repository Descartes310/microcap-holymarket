export const KYC = "api/socialnetworks/users/self/all";
export const GENERATE_OTP = "api/socialnetworks/users/self/otp";
export const REGISTER = "api/socialnetworks/users/self/register";
export const GET_USER_ACCESS = "api/socialnetworks/users/self/access";
export const GET_BRANCH_USERS = "api/socialnetworks/users/self/by-branch";
export const CONFIRM_OTP = (otp) => `api/socialnetworks/users/self/otp/${otp}`;
export const RESET_PASSWORD = "api/socialnetworks/users/access/reset-password";
export const CHANGE_ACCESS = (id) => `api/socialnetworks/users/access/${id}/change`;
export const RESET_PASSWORD_LINK = "api/socialnetworks/users/access/send-password-link";
export const CHANGE_ACCESS_LOGIN = (id) => `api/socialnetworks/users/access/${id}/login`;
export const ACTIVATE_OR_BLOCK_ACCESS = "api/socialnetworks/users/access/activate-or-block";
export const GET_USER_BY_REFERENCE = (ref) => `api/socialnetworks/users/self/reference/${ref}`;
export const CHANGE_ACCESS_PASSWORD = (id) => `api/socialnetworks/users/access/${id}/password`;
export const GET_USER_BY_MEMBERSHIP = (membership) => `api/socialnetworks/users/self/membership/${membership}`;

export const GET_INSTITUTIONS = "api/socialnetworks/users/institutions";
export const CREATE_INSTITUTION = "api/socialnetworks/users/institutions";
export const GET_BANK_AGENCY_CODE = "api/socialnetworks/users/institutions/agency-code";

export const GET_CONTACTS = "api/socialnetworks/users/self/contacts";
export const UPDATE_CONTACTS = "api/socialnetworks/users/self/contacts";
