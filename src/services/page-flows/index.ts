import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class PageFlowService {

    static getBasePageFlows(data): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_PAGEFLOWS, data);
    }

    static create(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_PAGEFLOW, data);
    }

    static update(reference, data): Promise<any> {
        return makeRequest('post', Routes.UPDATE_PAGEFLOW(reference), data);
    }

    static find(reference): Promise<any> {
        return makeRequest('get', Routes.FIND_PAGEFLOW(reference));
    }

    static delete(reference): Promise<any> {
        return makeRequest('delete', Routes.DELETE_PAGEFLOW(reference));
    }

    static getChild(reference): Promise<any> {
        return makeRequest('get', Routes.GET_PAGEFLOW_CHILD(reference));
    }
}