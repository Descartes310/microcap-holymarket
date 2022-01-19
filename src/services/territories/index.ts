import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class TerritoryService {

    static getTerritoryTypes(nature): Promise<any> {
        return makeRequest('get', `${Routes.GET_IMMATRICULATION_TYPES}?nature=${nature}`);
    }

    static getTerritories(type): Promise<any> {
        return makeRequest('get', `${Routes.GET_TERRITORIES}?type=${type}`);
    }
}