import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class NotificationService {

    static countUnread(): Promise<any> {
        return makeRequest('get', `${Routes.COUNT_NOTIFICATIONS}`);
    }

    static getNotifications(status: any, treated: boolean, size: any = null): Promise<any> {
        return makeRequest('get', `${Routes.GET_NOTIFICATIONS}?status=${status}&treated=${treated}${size ? '&size='+size : ''}`);
    }
}