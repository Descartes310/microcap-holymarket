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

    static getProductModelAvailables(): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_MODEL_AVAILABLES);
    }

    static createProduct(data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRODUCT, data, config);
    }

    static getProducts(): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCTS);
    }

    static getShopProducts(data): Promise<any> {
        return makeRequest('get', Routes.GET_SHOP_PRODUCTS, data);
    }

    static changeProductStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.CHANGE_PRODUCT_STATUS(id));
    }
}