import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class OrderService {

    static getOrders(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_ORDERS, data);
    }

    static createOrder(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ORDER, data);
    }
}