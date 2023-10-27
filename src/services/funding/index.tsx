import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class FundingService {

    static createFundingOffer(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_FUNDING_OFFER, data);
    }

    static getMineFundingOffers(): Promise<any> {
        return makeRequest('get', Routes.GET_MINE_FUNDING_OFFERS);
    }

    static getAllFundingOffers(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_FUNDING_OFFERS);
    }

    static findFundingOffer(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_FUNDING_OFFER_BY_REFERENCE(reference));
    }

    static createProposition(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROPOSITION, data);
    }

    static getPropositions(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_PROPOSITIONS, {reference});
    }
    static findProposition(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_PROPOSITION(reference));
    }
}