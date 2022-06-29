import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class CatalogService {

    static getCatalogs(data): Promise<any> {
        return makeRequest('get', Routes.GET_CATALOGS, data);
    }

    static createCatalog(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CATALOG, data);
    }

    static changeCatalogStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.CHANGE_CATALOG_STATUS(id));
    }

    static getCatalogProducts(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_CATALOG_PRODUCTS(id));
    }

    static addCatalogProducts(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.ADD_CATALOG_PRODUCTS(id), data);
    }

    static deleteCatalogProduct(id: number, data: any): Promise<any> {
        return makeRequest('delete', Routes.DELETE_CATALOG_PRODUCT(id), data);
    }
}