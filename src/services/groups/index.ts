import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class GroupService {

    static getGroupCategories(): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_CATEGORIES);
    }

    static createGroupCategory(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_GROUP_CATEGORY, data);
    }

    static getGroupTypes(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_TYPES, data);
    }

    static createGroupType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_GROUP_TYPE, data);
    }

    static addMemberToRole(data: any): Promise<any> {
        return makeRequest('post', Routes.ADD_MEMBER_TO_GROUP, data);
    }

    static getGroupMembers(): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_MEMBERS);
    }
}