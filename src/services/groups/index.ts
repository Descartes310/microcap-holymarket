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

    static getGroupMembers(data: any = {}): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_MEMBERS, data);
    }

    static getGroupDetails(ref): Promise<any> {
        return makeRequest('get', Routes.GET_GROUP_DETAILS(ref));
    }

    static updateGroupDetails(data, config): Promise<any> {
        return makeRequest('put', Routes.UPDATE_GROUP_DETAILS, data, config);
    }

    static makeGroupRequest(data): Promise<any> {
        return makeRequest('put', Routes.SEND_GROUP_REQUEST, data);
    }

    static respondToGroupResquest(id, status): Promise<any> {
        return makeRequest('put', Routes.RESPOND_REQUEST_FROM_GROUP(id), { status });
    }

    static sendExternalGroupInvitation(data): Promise<any> {
        if(!data.reference)
            delete data.reference;
        if(!data.email)
            delete data.email;
        return makeRequest('get', Routes.SEND_EXTERNAL_GROUP_INVITATION, data);
    }
}