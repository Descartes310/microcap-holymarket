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

    static activateUserPageAccount(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.ACTIVATE_PAGE_ACCOUNT(reference), data);
    }

    static getFundingPolitics(): Promise<any> {
        return makeRequest('get', Routes.GET_POLITICS);
    }

    static createFundingPolitic(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_POLITIC, data);
    }

    static getFundingProspectus(): Promise<any> {
        return makeRequest('get', Routes.GET_PROSPECTUS);
    }

    static createFundingProspectus(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROSPECTUS, data);
    }

    static activeFundingProspectus(reference: string): Promise<any> {
        return makeRequest('put', Routes.ACTIVE_PROSPECTUS(reference), {});
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

    static getActiveProspectus(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_ACTIVE_PROSPECTUS, data);
    }
    
    static createFundingProgram(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROGRAM, data);
    }

    static getPlacementAvailableDeals(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PLACEMENT_DEALS, data);
    }

    static createPlacement(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PLACEMENT, data);
    }

    static getPlacements(): Promise<any> {
        return makeRequest('get', Routes.GET_PLACEMENTS);
    }

    static findFundingProspectus(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_PROSPECTUS(reference));
    }

    static findFundingPolitic(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_POLITIC(reference));
    }

    static findFundingStrategy(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_STRATEGY(reference));
    }

    static findFundingProgram(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_PROGRAM(reference));
    }
}