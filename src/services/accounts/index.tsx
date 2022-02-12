import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class AccountService {

    static getAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNTS);
    }

    static creditAccount(id, data: any): Promise<any> {
        return makeRequest('post', Routes.CREDIT_ACCOUNT(id), data);
    }

    static debitAccount(id, data: any): Promise<any> {
        return makeRequest('post', Routes.DEBIT_ACCOUNT(id), data);
    }

    static getAccount(id): Promise<any> {
        var regExp = /[a-zA-Z]/g;
        if(!regExp.test(id)) {
            return makeRequest('get', Routes.FIND_ACCOUNT(id));
        } else {
            return makeRequest('get', Routes.FIND_ACCOUNT_BY_REFERENCE('fdg_acc_'+id));
        }
    }

    static getAccountMouvements(id): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNT_MOUVEMENTS(id));
    }
}