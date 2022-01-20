import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UserAccountTypeService {

    static getAccountTypeCategories(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNT_TYPE_CATEGORIES);
    }

    static createAccountTypeCategory(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ACCOUNT_TYPE_CATEGORY, data);
    }

    static getAccountTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNT_TYPES);
    }

    static createAccountType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ACCOUNT_TYPE, data);
    }
}