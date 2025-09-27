import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class DeliveryZoneService {

    static getDeliveryZones(data: any = {}): Promise<any> {
        return makeRequest('get', Routes.GET_DELIVERY_ZONES, data);
    }

    static findDeliveryZone(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_DELIVERY_ZONE(reference));
    }

    static createDeliveryZone(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DELIVERY_ZONE, data);
    }

    static updateDeliveryZone(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_DELIVERY_ZONE(reference), data);
    }

    static findAvailableDelivers(): Promise<any> {
        return makeRequest('get', Routes.GET_AVAILABLE_DELIVERS);
    }
}