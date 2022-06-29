import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UnitService {

    static getUnits(): Promise<any> {
        return makeRequest('get', Routes.GET_UNITS);
    }

    static createUnit(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_UNIT, data);
    }

    static getTypeUnits(): Promise<any> {
        return makeRequest('get', Routes.GET_UNIT_TYPES);
    }

    static createTypeUnit(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_UNIT_TYPE, data);
    }

    static changeUnitStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.CHANGE_UNIT_STATUS(id));
    }

    static getUnitByType(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_UNITS_BY_TYPE(id));
    }
}