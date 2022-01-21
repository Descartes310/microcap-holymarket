import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class RoleService {

    static getRoles(data): Promise<any> {
        return makeRequest('get', Routes.GET_ROLES, data);
    }

    static createRole(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ROLE, data);
    }

    static getPermissions(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_PERMISSIONS, data);
    }
}