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
}