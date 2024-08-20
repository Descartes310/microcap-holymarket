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

    static getVotes(): Promise<any> {
        return makeRequest('get', Routes.GET_VOTES);
    }

}