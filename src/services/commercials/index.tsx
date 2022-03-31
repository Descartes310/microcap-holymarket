import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class CommercialService {

    static getCommercialOperationTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_COMMERCIAL_OPERATION_TYPES);
    }

    static createCommercialOperationType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COMMERCIAL_OPERATION_TYPE, data);
    }

    static getCommercialOperations(): Promise<any> {
        return makeRequest('get', Routes.GET_COMMERCIAL_OPERATIONS);
    }

    static createCommercialOperation(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COMMERCIAL_OPERATION, data);
    }

    static getCommercialOffers(status = null): Promise<any> {
        return makeRequest('get', Routes.GET_COMMERCIAL_OFFERS, status ? {status} : {});
    }

    static createCommercialOffer(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATA_COMMERCIAL_OFFERS, data);
    }

    static changeCommercialOfferStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.CHANGE_COMMERCIAL_OFFER_STATUS(id));
    }
}