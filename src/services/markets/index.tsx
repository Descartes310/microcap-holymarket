import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class MarketService {

    static getAll(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL);
    }

    static getMines(): Promise<any> {
        return makeRequest('get', Routes.GET_MINE);
    }

    static getAvailables(data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_AVAILABLES, data);
    }

    static find(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND(reference));
    }

    static update(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE(reference), data);
    }

    static create(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE, data);
    }

    static getProducts(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCTS(reference));
    }
}