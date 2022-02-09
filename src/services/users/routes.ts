export const GENERATE_OTP = "api/socialnetworks/users/self/otp";
export const REGISTER = "api/socialnetworks/users/self/register";
export const GET_USER_ACCESS = "api/socialnetworks/users/self/access";
export const CONFIRM_OTP = (otp) => `api/socialnetworks/users/self/otp/${otp}`;
export const CHANGE_ACCESS = (id) => `api/socialnetworks/users/access/${id}/change`;
export const GET_USER_BY_REFERENCE = (ref) => `api/socialnetworks/users/self/reference/${ref}`;
export const GET_USER_BY_MEMBERSHIP = (membership) => `api/socialnetworks/users/self/membership/${membership}`;