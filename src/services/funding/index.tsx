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

    static inviteCodevSubscriber(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.INVITE_CODEV_SUBSCRIBER(reference), data);
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
    static getDealChild(reference): Promise<any> {
        return makeRequest('get', Routes.GET_CHILD_DEAL(reference));
    }

    static getOffers(data): Promise<any> {
        return makeRequest('get', Routes.GET_OFFERS, data);
    }

    static getRequests(data): Promise<any> {
        return makeRequest('get', Routes.GET_REQUESTS, data);
    }
    
    static findDeal(reference): Promise<any> {
        return makeRequest('get', Routes.FIND_DEAL(reference));
    }
    
    static validateDeal(reference, data): Promise<any> {
        return makeRequest('put', Routes.VALIDATE_DEAL(reference), data);
    }
    
    static changeAccountDeal(reference, data: any): Promise<any> {
        return makeRequest('put', Routes.CHANGE_ACCOUNT_DEAL(reference), data);
    }

    static getDealsByAccount(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_DEALS_BY_ACCOUNT, data);
    }

    static getBonds(): Promise<any> {
        return makeRequest('get', Routes.GET_BONDS);
    }

    static activateAccount(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.ACTIVATE_ACCOUNT(reference), data);
    }

    static getFundingPolitics(): Promise<any> {
        return makeRequest('get', Routes.GET_POLITICS);
    }

    static createFundingPolitic(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_POLITIC, data);
    }

    static getFundingStrategies(): Promise<any> {
        return makeRequest('get', Routes.GET_STRATEGIES);
    }

    static createFundingStrategy(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_STRATEGY, data);
    }

    static getFundingPrograms(): Promise<any> {
        return makeRequest('get', Routes.GET_PROGRAMS);
    }

    static createFundingProgram(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROGRAM, data);
    }
}