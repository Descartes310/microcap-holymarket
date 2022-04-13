import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class PrevisionService {

    static getPrevisions(): Promise<any> {
        return makeRequest('get', Routes.GET_PREVISIONS);
    }

    static createPrevision(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PREVISION, data);
    }

    static getPeriods(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_PERIODS(id));
    }

    static createPeriod(id: number, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PERIOD(id), data);
    }

    static getGoals(): Promise<any> {
        return makeRequest('get', Routes.GET_GOALS);
    }

    static createGoal(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_GOAL, data);
    }

    static getUserGoals(): Promise<any> {
        return makeRequest('get', Routes.GET_USER_GOALS);
    }

    static createUserGoal(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_USER_GOAL, data);
    }
}