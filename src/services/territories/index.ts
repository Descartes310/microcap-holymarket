import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class TerritoryService {

    static getTerritoryTypes(nature): Promise<any> {
        return makeRequest('get', `${Routes.GET_IMMATRICULATION_TYPES}?nature=${nature}`);
    }

    static getTerritories(type): Promise<any> {
        return makeRequest('get', `${Routes.GET_TERRITORIES}?type=${type}`);
    }

    static getTerritoryChild(data): Promise<any> {
        return makeRequest('get', Routes.GET_TERRITORY_CHILD, data);
    }

    static getAllTerritories(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_TERRITORIES);
    }

    static createTerritory(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_TERRITORY, data);
    }

    static createDetails(id, data): Promise<any> {
        return makeRequest('post', Routes.CREATE_DETAILS(id), data);
    }

    static getTerritoryDetails(id, data): Promise<any> {
        return makeRequest('get', Routes.GET_DETAILS(id), data);
    }
}