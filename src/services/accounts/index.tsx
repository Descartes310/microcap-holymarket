import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class AccountService {

    static getAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNTS);
    }
}