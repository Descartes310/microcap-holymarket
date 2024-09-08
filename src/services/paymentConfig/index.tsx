import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class PaymentConfigService {

    static get(): Promise<any> {
        return makeRequest('get', Routes.GET);
    }

    static find(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND(reference));
    }

    static create(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE, data);
    }
    
}