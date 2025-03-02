import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class ProjectService {

    static getProjects(data: any = {}): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECTS, data);
    }

    static getGroupProjects(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECTS_BY_GROUP);
    }

    static getProjectById(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT(id));
    }

    static getProjectByReference(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_BY_REFERENCE(reference));
    }

    static createProject(data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_POST, data, config);
    }

    static updateProject(id: number, data: any, config: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_PROJECT(id), data, config);
    }

    static getProjectPosts(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_POSTS);
    }

    static createProjectPost(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_POST, data);
    }

    static getProjectItems(types): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_ITEMS, {types});
    }

    static getProjectValues(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_ITEMS_BY_PROJECT(reference));
    }

    static getProjectMyItems(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_MINE_ITEMS);
    }

    static createProjectItem(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_ITEM, data);
    }

    static getProjectInitializations(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_INITIALIZATIONS, data);
    }

    static createProjectInitialization(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_INITIALIZATION, data);
    }

    static getProjectInitializationItems(id): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_INITIALIZATION_ITEMS(id));
    }

    static createProjectInitializationItem(id, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_INITIALIZATION_ITEM(id), data);
    }

    static getProjectActivities(id, data): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_ACTIVITIES(id), data);
    }

    static createProjectActivity(id, data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_ACTIVITY(id), data, config);
    }

    static createComplexProjectItem(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_ITEM_COMPLEX, data);
    }

    static updateComplexProjectItem(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_PROJECT_ITEM_COMPLEX(id), data);
    }

    static getTableStructure(id): Promise<any> {
        return makeRequest('get', Routes.GET_TABLE_STRUCTURE(id));
    }

    static getTableValues(datas): Promise<any> {
        return makeRequest('get', Routes.GET_TABLE_DATAS, datas);
    }

    static getProjectGallery(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_GALLERY);
    }

    static createTableDatas(datas): Promise<any> {
        return makeRequest('post', Routes.CREATE_TABLE_DATAS, datas);
    }

    static activeProjectActivity(id): Promise<any> {
        return makeRequest('post', Routes.ACTIVE_PROJECT_ACTIVITIES(id), {});
    }

    static getAttributes(): Promise<any> {
        return makeRequest('get', Routes.GET_ATTRIBUTES);
    }

    static findAttribute(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_ATTRIBUTE(reference));
    }

    static createAttribute(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_ATTRIBUTE, data);
    }

    static updateAttribute(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_ATTRIBUTE(reference), data);
    }

    static getAttributeProperties(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PROPERTIES, data);
    }

    static getAttributeFullProperties(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_FULL_PROPERTIES, data);
    }

    static createProperty(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROPERTY, data);
    }

    static getProducts(data: any = null): Promise<any> {
        return makeRequest('get', Routes.GET_PRODUCTS, data);
    }

    static addProduct(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRODUCT, data);
    }

    static getProjectSubscriptions(data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_SUBSCRIPTIONS, data);
    }

    static getAllProjectSubscriptions(data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_PROJECT_SUBSCRIPTIONS, data);
    }

    static getValidateProjectSubscription(reference: string, data): Promise<any> {
        return makeRequest('put', Routes.VALIDATE_PROJECT_SUBSCRIPTION(reference), data);
    }

    static getAllProjects(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_PROJECTS);
    }

    static createProjectSubscription(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_SUBSCRIPTION, data);
    }

    static createProjectSetting(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_SETTINGS, data);
    }

    static createSettingDetails(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_SETTING_DETAILS, data);
    }

    static getProjectSetting(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_SETTINGS, data);
    }

    static getSettingDetails(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_SETTING_DETAILS, data);
    }

    static getProjectInvestments(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_INVESTMENT, data);
    }

    static getProjectSubscriptionSupports(reference: string, data: any = {}): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_SUBSCRIPTION_SUPPORTS(reference), data);
    }

    static createInvestment(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_INVESTMENT, data);
    }

    static updateDataTableInvestment(id: number, data: any): Promise<any> {
        return makeRequest('post', Routes.UPDATE_DATA_TABLE_INVESTMENT(id), data);
    }

    static getProjectRules(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_RULES, data);
    }

    static createProjectRule(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_RULES, data);
    }

    static deleteProjectRule(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_PROJECT_RULES, {reference});
    }

    static getProjectPrevisions(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_PREVISIONS, data);
    }

    static createProjectPrevision(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_PREVISIONS, data);
    }

    static deleteProjectPrevision(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_PROJECT_PREVISIONS, {reference});
    }
}