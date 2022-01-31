import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class ProjectService {

    static getProjects(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECTS);
    }

    static createProject(data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_POST, data, config);
    }

    static getProjectPosts(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_POSTS);
    }

    static createProjectPost(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PROJECT_POST, data);
    }

    static getProjectItems(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_ITEMS);
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
}