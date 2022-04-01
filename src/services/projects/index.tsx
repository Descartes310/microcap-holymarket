import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class ProjectService {

    static getProjects(): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECTS);
    }

    static getProjectById(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT(id));
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

    static getProjectItems(types): Promise<any> {
        return makeRequest('get', Routes.GET_PROJECT_ITEMS, {types});
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
}