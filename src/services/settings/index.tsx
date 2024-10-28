import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class SettingService {

    static getUserFileTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_USER_FILES);
    }

    static getAllUserFileTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_USER_FILES);
    }

    static updateUserFileTypes(reference): Promise<any> {
        return makeRequest('put', Routes.UPDATE_USER_FILE_TYPE(reference));
    }

    static requiredUserFileTypes(reference): Promise<any> {
        return makeRequest('put', Routes.REQUIRED_USER_FILE_TYPE(reference));
    }

    static createUserFileType(data, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_USER_FILE, data, config);
    }

    static createFileTranscriptionModel(reference, data): Promise<any> {
        return makeRequest('post', Routes.CREATE_FILE_MODEL(reference), data);
    }

    static createFileTranscriptionItem(reference, data): Promise<any> {
        return makeRequest('post', Routes.CREATE_FILE_MODEL_ITEM(reference), data);
    }

    static getFileModels(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_FILE_MODELS(reference));
    }

    static getFileItems(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_FILE_MODEL_ITEMS(reference));
    }

    static updateFileTranscriptionModel(reference, data): Promise<any> {
        return makeRequest('put', Routes.UPDATE_FILE_MODEL(reference), data);
    }

    static updateFileTranscriptionItem(reference, data): Promise<any> {
        return makeRequest('put', Routes.UPDATE_FILE_MODEL_ITEM(reference), data);
    }

    static deleteFileModel(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_FILE_MODEL(reference));
    }

    static deleteFileItem(reference: string): Promise<any> {
        return makeRequest('delete', Routes.DELETE_FILE_MODEL_ITEM(reference));
    }

    static getAgents(datas): Promise<any> {
        return makeRequest('get', Routes.GET_AGENTS, datas);
    }

    static createAgent(datas, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_AGENT, datas, config);
    }

    static updateAgent(id, datas, config): Promise<any> {
        return makeRequest('put', Routes.UPDATE_AGENT(id), datas, config);
    }

    static updateAgentActive(id): Promise<any> {
        return makeRequest('put', Routes.CHANGE_AGENT_ACTIVE(id));
    }

    static updateAgentMain(id): Promise<any> {
        return makeRequest('put', Routes.CHANGE_AGENT_MAIN(id));
    }


    static getEvents(): Promise<any> {
        return makeRequest('get', Routes.GET_EVENTS);
    }

    static getBlogTopics(isParent = false, personal = false): Promise<any> {
        return makeRequest('get', Routes.GET_BLOG_TOPICS, {parent: isParent, personal});
    }

    static createBlogTopic(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_BLOG_TOPIC, data);
    }

    static updateBlogTopic(id, data): Promise<any> {
        return makeRequest('put', Routes.UPDATE_BLOG_TOPIC(id), data);
    }

    static findBlogTopic(id): Promise<any> {
        return makeRequest('get', Routes.FIND_BLOG_TOPIC(id));
    }

    static createEvent(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_EVENT, data);
    }

    static getAllArticles(): Promise<any> {
        return makeRequest('get', Routes.GET_ALL_ARTICLES);
    }

    static getMyArticles(data = {}): Promise<any> {
        return makeRequest('get', Routes.GET_USER_ARTICLES, data);
    }

    static createArticle(data, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_ARTICLE, data, config);
    }

    static getActiveArticles(): Promise<any> {
        return makeRequest('get', Routes.GET_ACTIVE_ARTICLES);
    }

    static getArticleDetails(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_ARTICLE_DETAILS(id));
    }

    static updateArticleStatus(id: number): Promise<any> {
        return makeRequest('put', Routes.UPDATE_ARTICLE_STATUS(id));
    }

    static createImmatriculation(data): Promise<any> {
        return makeRequest('post', Routes.CREATE_IMMATRICULATION, data);
    }

    static getImmatriculations(): Promise<any> {
        return makeRequest('get', Routes.GET_IMMATRICULATIONS);
    }

    static getImmatriculationsByTerritory(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_IMMATRICULATIONS_BY_TERRITORY, data);
    }

    static findImmatriculation(id: number): Promise<any> {
        return makeRequest('get', Routes.FIND_IMMATRICULATION(id));
    }

    static updateImmatriculation(id: number, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_IMMATRICULATION(id), data);
    }

    static updateUserFileType(id, datas, config): Promise<any> {
        return makeRequest('put', Routes.UPDATE_USER_TYPE(id), datas, config);
    }

    static findUserFileType(id): Promise<any> {
        return makeRequest('get', Routes.FIND_USER_TYPE(id));
    }

    static getMessageTemplates(): Promise<any> {
        return makeRequest('get', Routes.GET_MESSAGE_TEMPLATES);
    }

    static findMessageTemplate(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_MESSAGE_TEMPLATE(reference));
    }

    static createMessageTemplate(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_MESSAGE_TEMPLATE, data);
    }

    static updateMessageTemplate(reference: string, data: any): Promise<any> {
        return makeRequest('put', Routes.UPDATE_MESSAGE_TEMPLATE(reference), data);
    }

    static generateCode(data: any): Promise<any> {
        return makeRequest('get', Routes.GENERATE_CODE, data);
    }
}