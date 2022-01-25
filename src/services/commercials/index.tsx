import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class CommercialService {

    static getCommercialOperationTypes(data): Promise<any> {
        return makeRequest('get', Routes.GET_COMMERCIAL_OPERATION_TYPES, data);
    }

    static createCommercialOperationType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COMMERCIAL_OPERATION_TYPE, data);
    }

    static getCommercialOperations(data): Promise<any> {
        return makeRequest('get', Routes.GET_COMMERCIAL_OPERATIONS, data);
    }

    static createCommercialOperation(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COMMERCIAL_OPERATION, data);
    }

    static getCommercialOffers(data): Promise<any> {
        return makeRequest('get', Routes.GET_COMMERCIAL_OFFERS, data);
    }

    static createCommercialOffer(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATA_COMMERCIAL_OFFERS, data);
    }

    static changeCommercialOfferStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.CHANGE_COMMERCIAL_OFFER_STATUS(id));
    }
}