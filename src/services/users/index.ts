import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UserService {

    static registerUser(data): Promise<any> {
        return makeRequest('post', Routes.REGISTER, {...data, branchUrl: window.location.host});
    }

    static generateOTP(): Promise<any> {
        return makeRequest('get', Routes.GENERATE_OTP);
    }

    static confirmOTP(otp): Promise<any> {
        return makeRequest('get', Routes.CONFIRM_OTP(otp));
    }

}