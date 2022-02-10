import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class SettingService {

    static getUserFileTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_USER_FILES);
    }

    static createUserFileType(data, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_USER_FILE, data, config);
    }
}