import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class ContractService {

    static getContracts(): Promise<any> {
        return makeRequest('get', `${Routes.GET_ALL_CONTRACTS}`);
    }

    static getAvailableContracts(): Promise<any> {
        return makeRequest('get', `${Routes.GET_AVAILABLE_CONTRACTS}`);
    }

    static createContract(data: any): Promise<any> {
        return makeRequest('post', `${Routes.CREATE_CONTRACT}`, data);
    }
}