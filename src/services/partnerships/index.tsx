import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class PartnershipService {

    static getPartnerships(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PARTNERSHIPS, data);
    }

    static getPartnershipDetails(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_BANK_CODE, data);
    }

    static getPartnershipByType(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PARTNERSHIP_BY_TYPE, data);
    }

    static getPartnershipByCountry(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PARTNERSHIP_BY_COUNTRY, data);
    }

    static createPartnership(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PARTNERSHIP, data);
    }

    static addAttachedCounters(data: any): Promise<any> {
        return makeRequest('put', Routes.SET_ATTACHED_COUNTERS, data);
    }

    static getAttachedCounters(): Promise<any> {
        return makeRequest('get', Routes.GET_ATTACHED_COUNTERS, {});
    }
}