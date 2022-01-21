export const REGISTER = "api/socialnetworks/users/self/register";
export const GENERATE_OTP = "api/socialnetworks/users/self/otp";
export const CONFIRM_OTP = (otp) => `api/socialnetworks/users/self/otp/${otp}`;
export const GET_USER_BY_REFERENCE = (ref) => `api/socialnetworks/users/self/reference/${ref}`;