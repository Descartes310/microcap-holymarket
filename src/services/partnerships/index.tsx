import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class PartnershipService {

    static getPartnerships(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PARTNERSHIPS, data);
    }

    static getPartnershipDetails(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_BANK_CODE, data);
    }

    static createPartnership(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PARTNERSHIP, data);
    }
}