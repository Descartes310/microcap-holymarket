import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class BankService {

    static getPrestations(): Promise<any> {
        return makeRequest('get', Routes.GET_PRESTATIONS);
    }

    static getFundAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_FUND_ACCOUNTS);
    }

    static createPrestation(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRESTATION, data);
    }

    static createMandate(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_MANDATE, data);
    }

    static getIntermediateParty(): Promise<any> {
        return makeRequest('get', Routes.GET_INTERMEDIATE_PARTIES);
    }

    static getPotentialAgents(): Promise<any> {
        return makeRequest('get', Routes.GET_POTENTIAL_AGENT);
    }

    static createAgent(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_AGENT, data);
    }
}