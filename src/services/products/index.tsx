import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class ProductService {

    static getCategories(): Promise<any> {
        return makeRequest('get', Routes.GET_CATEGORIES);
    }

    static createCategory(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CATEGORY, data);
    }

    static createProductModel(data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRODUCT_MODEL, data, config);
    }

    static getProductModels(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_MODELS, data);
    }

    static findProductModel(reference: any): Promise<any> {
        return makeRequest('get', Routes.FIND_PRODUCT_MODEL(reference));
    }

    static getProductModelAvailables(): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_MODEL_AVAILABLES);
    }

    static createProduct(data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRODUCT, data, config);
    }

    static createCodevProduct(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_PRODUCT_MODEL, data);
    }

    static updateProductDetails(data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_PRODUCT_DETAILS, data);
    }

    static getProducts(): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCTS);
    }

    static getShopProducts(data): Promise<any> {
        return makeRequest('get', Routes.GET_SHOP_PRODUCTS, data);
    }

    static getShopProductModels(data): Promise<any> {
        return makeRequest('get', Routes.GET_SHOP_PRODUCT_MODELS, data);
    }

    static changeProductStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.CHANGE_PRODUCT_STATUS(id));
    }

    static findProduct(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_PRODUCT(reference));
    }

    static getCodevOptionTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_OPTION_TYPE);
    }

    static getCodevOptions(): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_OPTION);
    }

    static createCodevOptionType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_OPTION_TYPE, data);
    }

    static createCodevOption(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_OPTION, data);
    }

    static getCodevSupportOptionTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_SUPPORT_OPTION_TYPE);
    }

    static getCodevSupportOptions(): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_SUPPORT_OPTION);
    }

    static createCodevSupportOptionType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_SUPPORT_OPTION_TYPE, data);
    }

    static createCodevSupportOption(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_SUPPORT_OPTION, data);
    }

    static createIndivision(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_INDIVIVIONS, data);
    }

    static getFreeTirages(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_FREE_TIRAGE, data);
    }

    static getLinesByDate(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_LINE_BY_DATE, data);
    }

}