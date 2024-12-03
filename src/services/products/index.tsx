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

    static getProductModelDetails(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_MODEL_DETAILS(reference));
    }

    static getProductModels(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_MODELS, data);
    }

    static getProductByModelCode(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_BY_MODEL_CODE, data);
    }

    static findProductModel(reference: any): Promise<any> {
        return makeRequest('get', Routes.FIND_PRODUCT_MODEL(reference));
    }

    static findProductModelAggregations(reference: any): Promise<any> {
        return makeRequest('get', Routes.FIND_AGGREGATION_PRODUCT_MODELS(reference));
    }

    static getProductModelAvailables(): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCT_MODEL_AVAILABLES);
    }

    static createProduct(data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRODUCT, data, config);
    }

    static updateProduct(reference: string, data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_PRODUCT(reference), data, config);
    }

    static updateProductDetails(data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_PRODUCT_DETAILS, data);
    }

    static updateProductModelDetails(data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_PRODUCT_MODEL_DETAILS, data);
    }

    static generateProductTirages(data: any): Promise<any> {
        return makeRequest('post', Routes.TIRAGE_PRODUCT_DETAILS, data);
    }

    static getProducts(data: any = {}): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCTS, data);
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
    
    static createSubscriber(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_SUBSCRIBER, data);
    }
    
    static getTicketByAccount(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_TICKET_BY_ACCOUNT, data);
    }

    static getTickets(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_TICKETS, data);
    }
    
    static getLineByAccount(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_LINE_BY_ACCOUNT, data);
    }

    static changeTicketExigibility(data: any): Promise<any> {
        return makeRequest('post', Routes.CHANGE_TICKET_EXIGIBILITY, data);
    }

    static changeTicketGroup(data: any): Promise<any> {
        return makeRequest('post', Routes.CHANGE_TICKET_GROUP, data);
    }

    static updateCotation(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_COTATION(reference), data);
    }
    
    static getCotations(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_COTATIONS(reference));
    }

    static findTicketByCode(code: string, data = {}): Promise<any> {
        return makeRequest('get', Routes.FIND_TICKET_BY_CODE, {...data, code});
    }

    static findTicketByPeriod(data: any): Promise<any> {
        return makeRequest('get', Routes.FIND_TICKET_BY_PERIOD, data);
    }

    static findMyTickets(): Promise<any> {
        return makeRequest('get', Routes.FIND_MY_TICKETS);
    }

    static findMyCodevs(): Promise<any> {
        return makeRequest('get', Routes.FIND_MY_CODEVS);
    }

    static findTicketsFromProduct(data): Promise<any> {
        return makeRequest('get', Routes.FIND_TICKETS_FROM_PRODUCT, data);
    }

    static createTicketType(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_TICKET_TYPE, data);
    }
    
    static getTicketTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_TICKET_TYPES);
    }

    static getChildTickets(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_CHILD_TICKETS(reference));
    }

    static createChildTicket(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CHILD_TICKETS(reference), data);
    }

    static getCustomCarts(): Promise<any> {
        return makeRequest('get', Routes.GET_CUSTOM_CARTS);
    }

    static createCustomCart(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CUSTOM_CART, data);
    }

    static createDiscount(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DISCOUNT, data);
    }

    static createDiscountModel(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DISCOUNT_MODEL, data);
    }

    static getDiscounts(): Promise<any> {
        return makeRequest('get', Routes.GET_DISCOUNTS);
    }

    static getDiscountModels(): Promise<any> {
        return makeRequest('get', Routes.GET_DISCOUNT_MODELS);
    }

    static getDiscountRequests(): Promise<any> {
        return makeRequest('get', Routes.GET_DISCOUNT_REQUESTS);
    }

    static findDiscount(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_DISCOUNT(reference));
    }

    static getDiscountMembers(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_DISCOUNT_MODEL_MEMBERS(reference));
    }

    static updateDiscount(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_DISCOUNT(reference), data);
    }

    static approvedDiscount(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.APPROVED_DISCOUNT(reference), data);
    }

    static shareDiscountModel(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.SHARE_DISCOUNT_MODEL(reference), data);
    }

    static deleteDiscount(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_DISCOUNT(reference));
    }

    static getDiscountProducts(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_DISCOUNT_PRODUCTS(reference));
    }

    static createDiscountProduct(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DISCOUNT_PRODUCT(reference), data);
    }

    static deleteDiscountProduct(reference: string, data: any): Promise<any> {
        return makeRequest('delete', Routes.DELETE_DISCOUNT_PRODUCT(reference), data);
    }

    static getDiscountModelProducts(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_DISCOUNT_MODEL_PRODUCTS(reference));
    }

    static createDiscountModelProduct(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DISCOUNT_MODEL_PRODUCT(reference), data);
    }

    static deleteDiscountModelProduct(reference: string, data: any): Promise<any> {
        return makeRequest('delete', Routes.DELETE_DISCOUNT_MODEL_PRODUCT(reference), data);
    }


    static createBooking(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_BOOKING, data);
    }

    static getBookings(data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_BOOKINGS, data);
    }

    static getBookingMembers(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_BOOKING_MEMBERS(reference));
    }

    static findBooking(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_BOOKING(reference));
    }

    static findBookingByCode(code: string, data: any): Promise<any> {
        return makeRequest('get', Routes.FIND_BOOKING_BY_CODE(code), data);
    }

    static updateBooking(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_BOOKING(reference), data);
    }

    static deleteBooking(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_BOOKING(reference));
    }

    static shareBooking(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.SHARE_BOOKING(reference), data);
    }

    static createProductDistribution(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_DISTRIBUTION, data);
    }

    static getProductDistributionReceived(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_MY_DISTRIBUTIONS, data);
    }

    static getProductDistributions(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_DISTRIBUTIONS, data);
    }

    static updateProductDistributionPrice(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_DISTRIBUTION_PRICE(reference), data);
    }

    static updateProductDistributionStatus(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_DISTRIBUTION_STATUS(reference), data);
    }

    static createBookingGift(reference: string, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_BOOKING_GIFT(reference), data);
    }

    static getBookingGifts(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_BOOKING_GIFTS(reference));
    }

    static deleteBookingGift(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_BOOKING_GIFT(reference));
    }
}