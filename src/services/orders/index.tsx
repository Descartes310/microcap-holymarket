import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class OrderService {

    static getOrders(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_ORDERS, data ? data : null);
    }

    static findOrder(id: number): Promise<any> {
        return makeRequest('get', Routes.FIND_ORDER(id));
    }

    static createOrder(data: any): Promise<any> {
        return makeRequest('post', data.isPreOrder ? Routes.CREATE_PRE_ORDER : Routes.CREATE_ORDER, data);
    }

    static getPurchases(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_PURCHASES, data ? data : null);
    }

    static getSales(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_SALES(id));
    }

    static paySale(id, data: any): Promise<any> {
        return makeRequest('post', Routes.PAY_ORDER(id), data);
    }

    static addFileToOrder(id: number, data: any, config: any): Promise<any> {
        return makeRequest('put', Routes.ADD_FILE_TO_ORDER(id), data, config);
    }

    static approvedOrder(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.APPROVED_ORDER(id), data);
    }

    static findDiscount(id: string, data: any): Promise<any> {
        return makeRequest('get', Routes.FIND_DISCOUNT(id), data);
    }

    static findSubscription(id: string, data: any): Promise<any> {
        return makeRequest('get', Routes.FIND_SUBSCRIPTION(id), data);
    }
}