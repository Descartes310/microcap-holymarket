import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class FinanceService {

    static findSettlement(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_SETTLEMENT(reference));
    }

    static respondSettlement(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.RESPOND_SETTLEMENT(reference), data);
    }
}