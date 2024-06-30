import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UserService {

    static registerUser(data): Promise<any> {
        return makeRequest('post', Routes.REGISTER, {...data, branchUrl: window.location.host});
    }

    static generateOTP(data: any): Promise<any> {
        return makeRequest('get', Routes.GENERATE_OTP, data);
    }

    static kyc(): Promise<any> {
        return makeRequest('get', Routes.KYC);
    }

    static userKYC(reference: string): Promise<any> {
        return makeRequest('get', Routes.USER_KYC(reference));
    }

    static getBlogs(): Promise<any> {
        return makeRequest('get', Routes.USER_BLOGS);
    }

    static getArticles(reference: string): Promise<any> {
        return makeRequest('get', Routes.USER_ARTICLES(reference));
    }

    static getBlogSettings(): Promise<any> {
        return makeRequest('get', Routes.GET_BLOG_SETTINGS);
    }

    static updateBlogSettings(data, config): Promise<any> {
        return makeRequest('put', Routes.UPDATE_BLOG_SETTINGS, data, config);
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

    static createUserAccess(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ACCESS, data);
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

    static getContacts(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_CONTACTS, data);
    }

    static createContact(datas: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CONTACT, datas);
    }

    static updateContact(id: number, datas: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_CONTACTS(id), datas);
    }

    static sendContactCode(id: any): Promise<any> {
        return makeRequest('post', Routes.SEND_CONTACT_CODE(id), null);
    }

    static confirmContactCode(data: any): Promise<any> {
        return makeRequest('post', Routes.CONFIRM_CONTACT_CODE, data);
    }

    static activatePass(reference: string): Promise<any> {
        return makeRequest('put', Routes.ACTIVATE_PASS(reference));
    }

    static authenticate(reference: string): Promise<any> {
        return makeRequest('post', Routes.AUTHENTICATE(reference));
    }

    static updateProfile(data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_PROFILE, data);
    }

    static setContactAsNotification(id: number): Promise<any> {
        return makeRequest('put', Routes.SET_AS_NOTIFICATION(id));
    }

    static transferPass(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.TRANSFER_PASS(reference), data);
    }

    static findPassFromOrder(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_PASS_FROM_ORDER(reference));
    }

    static getUssdAuth(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_USSD_AUTH, {reference});
    }

    static getUssdMenus(url: string): Promise<any> {
        return makeRequest('get', url);
    }

    static getMyFiles(): Promise<any> {
        return makeRequest('get', Routes.GET_FILES);
    }

    static getMyFilesByMember(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_FILES_BY_MEMBER(reference));
    }

    static createFile(data, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_FILE, data, config);
    }
    static validateFile(reference: string): Promise<any> {
        return makeRequest('put', Routes.VALIDATE_FILE(reference));
    }

}