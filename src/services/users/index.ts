import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UserService {

    static registerUser(data): Promise<any> {
        return makeRequest('post', Routes.REGISTER, {...data, branchUrl: window.location.host});
    }

    static generateOTP(): Promise<any> {
        return makeRequest('get', Routes.GENERATE_OTP);
    }

    static kyc(): Promise<any> {
        return makeRequest('get', Routes.KYC);
    }

    static confirmOTP(otp, data): Promise<any> {
        return makeRequest('put', Routes.CONFIRM_OTP(otp), data);
    }

    static findUserByReference(reference, data = null): Promise<any> {
        return makeRequest('get', Routes.GET_USER_BY_REFERENCE(reference), data);
    }

    static findUserByMembership(membership): Promise<any> {
        return makeRequest('get', Routes.GET_USER_BY_MEMBERSHIP(membership));
    }

    static getUserAccess(): Promise<any> {
        return makeRequest('get', Routes.GET_USER_ACCESS);
    }

    static changeUserAccess(id: number): Promise<any> {
        return makeRequest('post', Routes.CHANGE_ACCESS(id), null);
    }

    static changeAccessLogin(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.CHANGE_ACCESS_LOGIN(id), data);
    }

    static changeAccessPassword(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.CHANGE_ACCESS_PASSWORD(id), data);
    }

    static sendPasswordLink(datas: any): Promise<any> {
        return makeRequest('post', Routes.RESET_PASSWORD_LINK, datas);
    }

    static resetPassword(datas: any): Promise<any> {
        return makeRequest('post', Routes.RESET_PASSWORD, datas);
    }

    static getBranchUsers(): Promise<any> {
        return makeRequest('get', Routes.GET_BRANCH_USERS);    
    }

    static activateOrBlockAccess(data:any): Promise<any> {
        return makeRequest('put', Routes.ACTIVATE_OR_BLOCK_ACCESS, data);
    }
    static createInstitution(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_INSTITUTION, data);
    }

    static getInstitutions(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_INSTITUTIONS, data);
    }

    static getInstitutionCodes(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_BANK_AGENCY_CODE, data);
    }

}