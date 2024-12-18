import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class MessageService {
    static sendMessage(data: any): Promise<any> {
        return makeRequest('post', Routes.SEND_MESSAGE, data);
    }

    static createBroadcast(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_BROADCAST, data);
    }

    static updateBroadcast(id: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_BROADCAST(id), data);
    }

    static getBroadcasts(): Promise<any> {
        return makeRequest('get', Routes.GET_BROADCASTS);
    }

    static getMyBroadcasts(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_BROADCASTS);
    }

    static getBroadcastMembers(id: string): Promise<any> {
        return makeRequest('get', Routes.BROADCAST_MEMBERS(id));
    }

    static findBroadcast(id: string): Promise<any> {
        return makeRequest('get', Routes.FIND_BROADCAST(id));
    }

    static addBroadcastMember(id: string, data: any): Promise<any> {
        return makeRequest('post', Routes.ADD_BROADCAST_MEMBER(id), data);
    }

    static deleteBroadcastMember(id: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_BROADCAST_MEMBER(id));
    }

    static confirmBroadcastMember(id: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CONFIRM_BROADCAST_MEMBER(id), data);
    }

    static sendBroadcastMessage(id: string, data: any): Promise<any> {
        return makeRequest('post', Routes.SEND_BROADCAST_MESSAGE(id), data);
    }
}