import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class UnitService {

    static getUnits(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_UNITS, data);
    }

    static createUnit(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_UNIT, data);
    }

    static getTypeUnits(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_UNIT_TYPES, data);
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

    static getCurrencies(): Promise<any> {
        return makeRequest('get', Routes.GET_CURRENCIES);
    }

    static createCurrency(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CURRENCY, data);
    }

}