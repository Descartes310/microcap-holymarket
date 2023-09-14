import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class MessageService {
    static sendMessage(data: any): Promise<any> {
        return makeRequest('post', Routes.SEND_MESSAGE, data);
    }
}