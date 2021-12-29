import { makeRequest } from '../helpers/helpers';
import { PROFILES } from "Url/backendUrl";


export default class ProfileService {

    static postProfile(data): Promise<any> {
        return makeRequest('post', PROFILES.SELF, data);
    }

    static putProfile(id, data): Promise<any> {
        return makeRequest('put', PROFILES.find(id), data);
    }
}
