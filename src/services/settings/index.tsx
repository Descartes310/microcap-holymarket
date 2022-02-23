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

    static createAgent(datas): Promise<any> {
        return makeRequest('post', Routes.CREATE_AGENT, datas);
    }

    static updateAgent(id, datas): Promise<any> {
        return makeRequest('put', Routes.UPDATE_AGENT(id), datas);
    }

    static updateAgentActive(id): Promise<any> {
        return makeRequest('put', Routes.CHANGE_AGENT_ACTIVE(id));
    }

    static updateAgentMain(id): Promise<any> {
        return makeRequest('put', Routes.CHANGE_AGENT_MAIN(id));
    }
}