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

    static getIndivisionsByDate(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_INDIVISION_BY_DATE, data);
    }

    static getIndivisionsByProduct(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_INDIVISION_BY_PRODUCT, data);
    }

    static getIndivisionsByLine(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_INDIVISION_BY_LINE, data);
    }

    static getTicketsByIndivision(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_TICKET_BY_INDIVISION, data);
    }

    static getCodevDetails(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_DETAILS, data);
    }

    static createCodevDetails(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_DETAILS, data);
    }

    static createCodevSimpleOption(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_SIMPLE_OPTION, data);
    }

    static createCodevOptionDetails(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_OPTION_DETAILS(reference), data);
    }

    static getCodevOptionDetails(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_OPTION_DETAILS(reference));
    }

    static createCodevConfigOption(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CONFIG_OPTION, data);
    }

    static getCodevConfigOptions(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_CONFIG_OPTIONS, data);
    }

    static createCodevTypeSupportOption(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_TYPE_SUPPORT_OPTION, data);
    }

    static createCodevTypeOptionTitle(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CODEV_TYPE_OPTION_TITLE, data);
    }

    static getCodevTypeSupportOptions(): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_TYPE_SUPPORT_OPTION);
    }

    static getCodevTypeOptionTitles(): Promise<any> {
        return makeRequest('get', Routes.GET_CODEV_TYPE_OPTION_TITLE);
    }

    static generateCodevTirage(data: any): Promise<any> {
        return makeRequest('post', Routes.GENERATE_TIRAGES, data);
    }

    static deleteLineBooking(data: any): Promise<any> {
        return makeRequest('delete', Routes.DELETE_LINE_BOOKING, data);
    }

    static deleteIndivisionBooking(data: any): Promise<any> {
        return makeRequest('delete', Routes.DELETE_INDIVISION_BOOKING, data);
    }

    static createLineBooking(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_LINE_BOOKING, data);
    }

    static createIndivisionBooking(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_INDIVISION_BOOKING, data);
    }

    static getParticipantsByOrderRef(data: any): Promise<any> {
        return makeRequest('get', Routes.CODEV_PARTICIPANTS, data);
    }

    static inviteCodevSubscriber(data: any): Promise<any> {
        return makeRequest('post', Routes.CODEV_INVITE_PARTICIPANT, data);
    }

    static responseToInviteCodevSubscriber(data: any): Promise<any> {
        return makeRequest('post', Routes.CODEV_INVITE_PARTICIPANT_RESPONSE, data);
    }

    static getLineGlobalInfo(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_LINE_GLOBAL_INFO, data);
    }

    static getLineSupports(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_LINE_SUPPORTS, data);
    }

    static createSubscriber(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_SUBSCRIBER, data);
    }


}