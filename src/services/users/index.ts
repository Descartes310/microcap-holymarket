import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UserService {
    static registerUser(data): Promise<any> {
        return makeRequest('post', Routes.REGISTER, {...data, branchUrl: window.location.host});
    }
}