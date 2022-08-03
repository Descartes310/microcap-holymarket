import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class SettingService {

    static getUserFileTypes(): Promise<any> {
        return makeRequest('get', Routes.GET_USER_FILES);
    }

    static createUserFileType(data, config): Promise<any> {
        return makeRequest('post', Routes.CREATE_USER_FILE, data, config);
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

    static getBlogTopics(isParent = false): Promise<any> {
        return makeRequest('get', Routes.GET_BLOG_TOPICS, {parent: isParent});
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
}