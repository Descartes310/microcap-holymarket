import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class FundingService {

    static createGrantOffer(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_GRANT_OFFER, data);
    }

    static getMineGrantOffers(): Promise<any> {
        return makeRequest('get', Routes.GET_MINE_GRANT_OFFERS);
    }

    static getAllGrantOffers(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_GRANT_OFFERS);
    }
}