import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class ContractService {

    static getContracts(): Promise<any> {
        return makeRequest('get', `${Routes.GET_ALL_CONTRACTS}`);
    }

    static getAvailableContracts(data: any): Promise<any> {
        return makeRequest('get', `${Routes.GET_AVAILABLE_CONTRACTS}`, data);
    }

    static createContract(data: any): Promise<any> {
        return makeRequest('post', `${Routes.CREATE_CONTRACT}`, data);
    }

    static getUserContracts(data: any): Promise<any> {
        return makeRequest('get', `${Routes.GET_CURRENT_CONTRACT}`, data);
    }

    static getActivableContracts(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_ACTIVABLE_CONTRACTS, data);
    }
}