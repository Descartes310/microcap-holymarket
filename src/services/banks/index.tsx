import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';


export default class BankService {

    static getPrestations(): Promise<any> {
        return makeRequest('get', Routes.GET_PRESTATIONS);
    }

    static getFundAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_FUND_ACCOUNTS);
    }

    static createPrestation(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRESTATION, data);
    }

    static createMandate(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_MANDATE, data);
    }

    static getIntermediateParty(): Promise<any> {
        return makeRequest('get', Routes.GET_INTERMEDIATE_PARTIES);
    }

    static getIntermediateBanks(): Promise<any> {
        return makeRequest('get', Routes.GET_INTERMEDIATE_BANKS);
    }

    static getPotentialAgents(): Promise<any> {
        return makeRequest('get', Routes.GET_POTENTIAL_AGENT);
    }

    static createAgent(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_AGENT, data);
    }

    static getAgents(): Promise<any> {
        return makeRequest('get', Routes.GET_PARTIES);
    }

    static createCounter(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COUNTER, data);
    }

    static getCounters(): Promise<any> {
        return makeRequest('get', Routes.GET_COUNTERS);
    }

    static createEffect(id: number, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_EFFECT(id), data);
    }

    static getEffects(id: number): Promise<any> {
        return makeRequest('get', Routes.GET_EFFECTS(id));
    }

    static createSubscription(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_SUBSCRIPTION, data);
    }

    static getSubscriptions(): Promise<any> {
        return makeRequest('get', Routes.GET_SUBSCRIPTIONS);
    }

    static getCoverages(): Promise<any> {
        return makeRequest('get', Routes.GET_COVERAGES);
    }

    static getAvailableCoverages(prestationId: number): Promise<any> {
        return makeRequest('get', Routes.GET_AVAILABLE_COVERAGES(prestationId));
    }

    static createCoverage(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COVERAGE, data);
    }

    static addCoverageToPrestation(id, data: any): Promise<any> {
        return makeRequest('post', Routes.ADD_COVERAGE_TO_PRESTATION(id), data);
    }

    static getPrestationDetails(prestationId: number): Promise<any> {
        return makeRequest('get', Routes.GET_PRESTATION_DETAILS(prestationId));
    }

    static addDetailsToPrestation(id, data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_PRESTATION_DETAILS(id), data);
    }

    static getUserPrestations(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_USER_PRESTATIONS, {reference});
    }

    static getUserAccounts(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_USER_DOMICILIATIONS, {reference});
    }

    static createOperation(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_OPERATION, data);
    }

    static getOperations(): Promise<any> {
        return makeRequest('get', Routes.GET_OPERATIONS);
    }

    static purgeOperations(data: any): Promise<any> {
        return makeRequest('put', Routes.PURGE_OPERATIONS, data);
    }

    static createInjection(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_INJECTION, data);
    }

    static getInjections(): Promise<any> {
        return makeRequest('get', Routes.GET_INJECTIONS);
    }

    static createExtinction(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_EXTINCTION, data);
    }

    static getExtinctions(): Promise<any> {
        return makeRequest('get', Routes.GET_EXTINCTIONS);
    }

    static createExploitationCredit(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_EXPLOITATION_CREDIT, data);
    }

    static getExploitationCredits(): Promise<any> {
        return makeRequest('get', Routes.GET_EXPLOITATION_CREDITS);
    }

    static createCompensationCredit(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_COMPENSATION_CREDIT, data);
    }

    static getCompensationCredits(): Promise<any> {
        return makeRequest('get', Routes.GET_COMPENSATION_CREDITS);
    }

    static createChargeRequest(data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CHARGE_REQUEST, data, config);
    }

    static getAgentChargeRequests(): Promise<any> {
        return makeRequest('get', Routes.GET_AGENT_CHARGE_REQUESTS);
    }

    static getChild(): Promise<any> {
        return makeRequest('get', Routes.GET_CHILD);
    }

    static getAdminChargeRequests(): Promise<any> {
        return makeRequest('get', Routes.GET_ADMIN_CHARGE_REQUESTS);
    }

    static getAdminChargeRequestPending(): Promise<any> {
        return makeRequest('get', Routes.GET_ADMIN_CHARGE_REQUEST_PENDING);
    }

    static respondToChargeRequest(id: number, status: boolean): Promise<any> {
        return makeRequest('put', Routes.RESPOND_TO_CHARGE_REQUEST(id), {status});
    }

    static liquidOperation(id: number, reference): Promise<any> {
        return makeRequest('put', Routes.LIQUID_OPERATION(id), {liquid_reference: reference});
    }

    static getMineSubscriptions(): Promise<any> {
        return makeRequest('get', Routes.GET_MINE_SUBSCRIPTION);
    }

    static getClientCheckBooks(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_CLIENT_CHECKBOOKS, {client_reference: "cashm_client_"+reference});
    }

    static createCheckBook(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_CHECKBOOK, data);
    }

    static setMMSSettings(data: any): Promise<any> {
        return makeRequest('post', Routes.SET_MMS_SETTINGS, data);
    }
}