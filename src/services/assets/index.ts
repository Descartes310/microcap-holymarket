import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class AssetService {

    static getAllParents(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_PARENTS);
    }

    static getMineParent(): Promise<any> {
        return makeRequest('get', Routes.GET_MINE_PARENTS);
    }

    static createParent(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PARENT, data);
    }

    static getSeriesTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_SERIES_TYPES);
    }

    static createSeriesType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_SERIES_TYPE, data);
    }

    static getParentItems(reference: string, data): Promise<any> {
        return makeRequest('get', Routes.GET_PARENT_ITEMS(reference), data);
    }

    static getAssetItems(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_ITEM_ITEMS(reference));
    }

    static findParent(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_PARENT(reference));
    }

    static findAsset(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_ASSET(reference));
    }

    static createItem(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ITEM, data);
    }

    static getProfiles(): Promise<any> {
        return makeRequest('get', Routes.GET_PROFILES);
    }

    static createProfile(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROFILE, data);
    }

    static getParticipants(reference: string): Promise<any> {
        return makeRequest('get', Routes.ASSET_PARTICIPANTS(reference));
    }

    static createManagement(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_MANAGEMENT, data);
    }
}