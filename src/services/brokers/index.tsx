import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class BrokerService {

    static getAgencies(): Promise<any> {
        return makeRequest('get', Routes.GET_AGENCIES);
    }

    static getCounters(): Promise<any> {
        return makeRequest('get', Routes.GET_COUNTERS);
    }

    static getCashdesk(): Promise<any> {
        return makeRequest('get', Routes.GET_CASHDESKS);
    }

    static createAgency(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_AGENCY, data);
    }

    static createCounter(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COUNTER, data);
    }

    static createCashdesk(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CASHDESK, data);
    }

    static creditCashdesk(id, data: any): Promise<any> {
        return makeRequest('post', Routes.CREDIT_CASHDESK(id), data);
    }

    static getAgenciesByBroker(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_AGENCIES_BY_BROKER, data);
    }

    static getCountersByAgencies(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_COUNTERS_BY_AGENCY, data);
    }
}