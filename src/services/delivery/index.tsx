import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class DeliveryService {

    static getParcels(): Promise<any> {
        return makeRequest('get', Routes.GET_PARCELS);
    }

    static getDeliveries(): Promise<any> {
        return makeRequest('get', Routes.GET_DELIVERIES);
    }

    static getDeliveryParcels(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_DELIVERY_PARCELS(reference));
    }

    static createDeliveryParcel(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DELIVERY_PARCEL, data);
    }

    static deleteDeliveryParcel(reference: string, data: any): Promise<any> {
        return makeRequest('delete', Routes.DELETE_DELIVERY_PARCEL(reference), data);
    }

    static createDelivery(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DELIVERY, data);
    }

    static updateDeliveryStatus(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_DELIVERY_STATUS(reference), data);
    }
}