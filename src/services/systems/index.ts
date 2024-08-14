import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class SystemService {

    static createVote(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_VOTE, data);
    }

}