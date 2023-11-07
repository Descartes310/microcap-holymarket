import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class FundingService {

    static createFundingOffer(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_FUNDING_OFFER, data);
    }

    static getMineFundingOffers(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_MINE_FUNDING_OFFERS, data);
    }

    static getAllFundingOffers(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_FUNDING_OFFERS, data);
    }

    static findFundingOffer(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_FUNDING_OFFER_BY_REFERENCE(reference));
    }

    static createProposition(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROPOSITION, data);
    }

    static getPropositions(data): Promise<any> {
        return makeRequest('get', Routes.GET_PROPOSITIONS, data);
    }

    static findProposition(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_PROPOSITION(reference));
    }

    static getDeals(data): Promise<any> {
        return makeRequest('get', Routes.GET_DEALS, data);
    }
    
    static findDeal(reference): Promise<any> {
        return makeRequest('get', Routes.FIND_DEAL(reference));
    }
}