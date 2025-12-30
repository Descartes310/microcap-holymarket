import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class SystemService {

    static createVote(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_VOTE, data);
    }

    static createVoteConfig(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_VOTE_CONFIG, data);
    }

    static updateVoteConfig(reference, data): Promise<any> {
        return makeRequest('put', Routes.UPDATE_VOTE_CONFIG(reference), data);
    }

    static findVoteConfig(reference): Promise<any> {
        return makeRequest('get', Routes.FIND_VOTE_CONFIG(reference));
    }

    static getVoteConfigs(): Promise<any> {
        return makeRequest('get', Routes.GET_VOTE_CONFIGS);
    }

    static getProducts(): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCTS);
    }

    static getProductModels(data): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_MODELS, data);
    }

    static getVotes(): Promise<any> {
        return makeRequest('get', Routes.GET_VOTES);
    }

    static getOperationLogs(): Promise<any> {
        return makeRequest('get', Routes.GET_LOGS);
    }

    static getAuditLogs(): Promise<any> {
        return makeRequest('get', Routes.GET_AUDIT_LOGS);
    }

    static getContactRequests(): Promise<any> {
        return makeRequest('get', Routes.GET_CONTACT_REQUESTS);
    }    

    static getGlobalDataInputs(): Promise<any> {
        return makeRequest('get', Routes.GET_INPUT_DATAS);
    }    
    
    static treatContactRequest(reference, data): Promise<any> {
        return makeRequest('post', Routes.TREAT_CONTACT_REQUEST(reference), data);
    }

    static sendMessage(reference, data): Promise<any> {
        return makeRequest('post', Routes.SEND_MESSAGE(reference), data);
    }

    static getMessages(reference): Promise<any> {
        return makeRequest('get', Routes.GET_MESSAGES(reference));
    }

}