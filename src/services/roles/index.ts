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

    static changeRoleStatus(id: number, data: any = null): Promise<any> {
        return makeRequest('put', Routes.CHANGE_ROLE_STATUS(id), data);
    }

    static findRole(id: number): Promise<any> {
        return makeRequest('get', Routes.FIND_ROLE(id));
    }

    static updateRole(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_ROLE(id), data);
    }
}