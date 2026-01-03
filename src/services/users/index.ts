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

    static getBaseUsers(): Promise<any> {
        return makeRequest('get', Routes.BASE_USERS);
    }

    static getUserProfiles(data): Promise<any> {
        return makeRequest('get', Routes.USER_PROFILES, data);
    }

    static getAccessByUserAndProfile(data): Promise<any> {
        return makeRequest('get', Routes.GET_ACCESS_BY_USER_AND_PROFILE, data);
    }

    static userKYC(reference: string = null): Promise<any> {
        if(reference) {
            return makeRequest('get', Routes.USER_KYC(reference));
        } else {
            return makeRequest('get', Routes.KYCU);
        }
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
    static changeUserAccessFromCommunity(reference: string): Promise<any> {
        return makeRequest('post', Routes.CHANGE_ACCESS_FROM_COMMUNITY(reference), null);
    }

    static createUserAccess(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ACCESS, data);
    }

    static changeAccessLogin(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.CHANGE_ACCESS_LOGIN(id), data);
    }

    static changeAccessContact(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.CHANGE_ACCESS_CONTACT(id), data);
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

    static assistanceResetPassword(datas: any): Promise<any> {
        return makeRequest('post', Routes.ASSISTANCE_RESET_PASSWORD, datas);
    }

    static getBranchUsers(data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_BRANCH_USERS, data);    
    }

    static getResiliatedUsers(): Promise<any> {
        return makeRequest('get', Routes.GET_RESILIATED_USERS);    
    }

    static findByEmail(data): Promise<any> {
        return makeRequest('get', Routes.FIND_BY_EMAIL, data);    
    }

    static resiliateUser(reference, data): Promise<any> {
        return makeRequest('delete', Routes.RESILIATE_USER(reference), data);    
    }

    static restoreResiliateUser(reference, data): Promise<any> {
        return makeRequest('delete', Routes.RESTORE_RESILIATE_USER(reference), data);    
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
    static getActivePass(referralCode: string): Promise<any> {
        return makeRequest('get', Routes.GET_ACTIVE_PASS, {referralCode});
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

    static getMyFiles(data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_FILES, data);
    }

    static getMyFilesByMember(reference: string, data = null): Promise<any> {
        return makeRequest('get', Routes.GET_FILES_BY_MEMBER(reference), data);
    }

    static createFile(data, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_FILE, data, config);
    }
    static validateFile(reference: string): Promise<any> {
        return makeRequest('put', Routes.VALIDATE_FILE(reference));
    }

    static createInstitutionMember(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_INSTITUTION_MEMBER, data);
    }

    static updateInstitutionMember(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_INSTITUTION_MEMBER(reference), data);
    }

    static getInstitutionMembers(id: number, data: any): Promise<any> {
        return makeRequest('get', Routes.GET_INSTITUTION_MEMBERS(id), data);
    }

    static sendAuthOTP(data: any, config = {}): Promise<any> {
        return makeRequest('post', Routes.SEND_OTP, data, config);
    }

    static findAuthOTP(data: any): Promise<any> {
        return makeRequest('get', Routes.FIND_OTP, data);
    }

    static getFileTranscription(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_FILE_TRANSCRIPTIONS(reference));
    }

    static createFileTranscription(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_FILE_TRANSCRIPTION(reference), data);
    }

    static askForFileAuthentification(reference: string): Promise<any> {
        return makeRequest('post', Routes.ASK_FILE_AUTHENTIFICATION(reference), {});
    }

    static createAccessProcuration(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROCURATION_ACCESS, data);
    }

    static getAccessProcurations(): Promise<any> {
        return makeRequest('get', Routes.GET_PROCURATION_ACCESS);
    }

    static deleteAccessProcurations(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_PROCURATION_ACCESS(reference));
    }

    static getAddresses(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_ADDRESSES, data);
    }

    static createAddress(datas: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ADDRESS, datas);
    }

    static updateAddress(reference: string, datas: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_ADDRESS(reference), datas);
    }

    static findAddress(reference: string): Promise<any> {
        return makeRequest('get', Routes.UPDATE_ADDRESS(reference));
    }

    static getCodes(): Promise<any> {
        return makeRequest('get', Routes.GET_CODES);
    }

    static getCreditTicketPayments(status: string): Promise<any> {
        return makeRequest('get', Routes.GET_CREDIT_TICKET_PAYMENTS, { status });
    }

}