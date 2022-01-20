export const REGISTER = "api/socialnetworks/users/self/register";
export const GENERATE_OTP = "api/socialnetworks/users/self/otp";
export const CONFIRM_OTP = (otp) => `api/socialnetworks/users/self/otp/${otp}`;