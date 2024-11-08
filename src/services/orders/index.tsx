import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class OrderService {

    static getOrders(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_ORDERS, data ? data : null);
    }

    static getSubOrders(reference: string, data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_SUB_ORDERS(reference), data ? data : null);
    }

    static findOrder(id: number): Promise<any> {
        return makeRequest('get', Routes.FIND_ORDER(id));
    }

    static findOrderByReference(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_ORDER_BY_REFERENCE(reference));
    }

    static createOrder(data: any): Promise<any> {
        return makeRequest('post', data.isPreOrder ? Routes.CREATE_PRE_ORDER : Routes.CREATE_ORDER, data);
    }
    
    static initiatePayment(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.INITIATE_PAYMENT(reference), data);
    }

    static getPurchases(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_PURCHASES, data ? data : null);
    }

    static getSales(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_SALES(id));
    }

    static getAllSales(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_SALES);
    }

    static paySale(id, data: any): Promise<any> {
        return makeRequest('post', Routes.PAY_ORDER(id), data);
    }

    static paySaleByTransfer(id, data: any, config): Promise<any> {
        return makeRequest('post', Routes.PAY_ORDER_BY_TRANSFER(id), data, config);
    }

    static approveSale(id, data: any): Promise<any> {
        return makeRequest('post', Routes.APPROVE_PAYMENT(id), data);
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

    static getFullDetails(id: string): Promise<any> {
        return makeRequest('get', Routes.GET_FULL_DETAILS(id));
    }

    static sendPaymentRequest(data: any): Promise<any> {
        return makeRequest('post', Routes.SEND_PAYMENT_REQUEST, data);
    }

    static getOrderProduct(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_ORDER_PRODUCT(reference));
    }

    static getOrderSellers(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_ORDER_SELLERS(reference));
    }

    static setOrderSeller(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.SET_ORDER_SELLER(reference), data);
    }

    static configureOrderCodev(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CONFIGURE_ORDER_CODEV(reference), data);
    }
}