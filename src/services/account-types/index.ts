import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UserAccountTypeService {

    static getAccountTypeCategories(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNT_TYPE_CATEGORIES);
    }

    static createAccountTypeCategory(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ACCOUNT_TYPE_CATEGORY, data);
    }

    static updateAccountTypeCategory(id: number, data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_ACCOUNT_TYPE_CATEGORY(id), data);
    }

    static findAccountTypeCategory(id: number): Promise<any> {
        return makeRequest('get', Routes.FIND_ACCOUNT_TYPE_CATEGORY(id));
    }

    static getAccountTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNT_TYPES);
    }

    static createAccountType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ACCOUNT_TYPE, data);
    }

    static updateAccountType(id: number, data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_ACCOUNT_TYPE(id), data);
    }

    static findAccountType(id: number): Promise<any> {
        return makeRequest('get', Routes.FIND_ACCOUNT_TYPE(id));
    }

    static getAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNTS);
    }

    static createAccount(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ACCOUNT, data);
    }

    static setAccountTypeAsDefault(id: number, status: boolean): Promise<any> {
        return makeRequest('put', Routes.SET_ACCOUNT_TYPE_AS_DEFAULT(id), {status});
    }

    static getChains(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_CHAINS(id));
    }

    static createChain(id: number, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CHAIN(id), data);
    }
}