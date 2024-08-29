import * as Routes from "./routes";
import { makeRequest } from 'Helpers/helpers';

export default class AccountService {

    static getAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNTS);
    }

    static creditAccount(id, data: any): Promise<any> {
        return makeRequest('post', Routes.CREDIT_ACCOUNT(id), data);
    }

    static debitAccount(id, data: any): Promise<any> {
        return makeRequest('post', Routes.DEBIT_ACCOUNT(id), data);
    }

    static activeAccount(id, data: any): Promise<any> {
        return makeRequest('put', Routes.ACTIVATE_ACCOUNT(id), data);
    }

    static getAccount(id): Promise<any> {
        var regExp = /[a-zA-Z]/g;
        if(!regExp.test(id)) {
            return makeRequest('get', Routes.FIND_ACCOUNT(id));
        } else {
            return makeRequest('get', Routes.FIND_ACCOUNT_BY_REFERENCE('fdg_acc_'+id));
        }
    }

    static getConsolidations(id): Promise<any> {
        var regExp = /[a-zA-Z]/g;
        if(!regExp.test(id)) {
            return makeRequest('get', Routes.FIND_ACCOUNT(id));
        } else {
            return makeRequest('get', Routes.FIND_CONSOLIDATION_BY_REFERENCE(id));
        }
    }

    static getAccountMouvements(id: number, data: any): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNT_MOUVEMENTS(id), data);
    }

    static getAccountByTypes(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNTS_BY_TYPE, data);
    }

    static getAccountBySpeciality(data: any): Promise<any> {
        return makeRequest('get', Routes.GET_ACCOUNTS_BY_SPECIALITY, data);
    }

    static getExternalAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_EXTERNAL_ACCOUNTS);
    }

    static getExternalAccountPotentials(): Promise<any> {
        return makeRequest('get', Routes.GET_EXTERNAL_ACCOUNT_POTENTIALS);
    }

    static createExternalAccount(data: any): Promise<any> {
        return makeRequest('post', Routes.CREATE_EXTERNAL_ACCOUNTS, data);
    }

    static addConsolidation(consolidation: string, consolidated: string): Promise<any> {
        return makeRequest('post', Routes.ADD_CONSOLIDATION(consolidation, consolidated));
    }

    static deleteConsolidation(consolidation: string, consolidated: string): Promise<any> {
        return makeRequest('delete', Routes.REMOVE_CONSOLIDATION(consolidation, consolidated));
    }

    static getAgreements(reference: string): Promise<any> {
        return makeRequest('get', Routes.GET_AGREEMENTS(reference));
    }

    static setAgreement(reference: string, data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.SET_AGREEMENT(reference), data, config);
    }

    static setAgreementTemplate(reference: string, data: any, config: any): Promise<any> {
        return makeRequest('post', Routes.SET_AGREEMENT_TEMPLATE(reference), data, config);
    }

    static getPaymentAccounts(): Promise<any> {
        return makeRequest('get', Routes.GET_PAYMENT_ACCOUNTS);
    }

    static getSynchronisations(id): Promise<any> {
        var regExp = /[a-zA-Z]/g;
        if(!regExp.test(id)) {
            return makeRequest('get', Routes.FIND_ACCOUNT(id));
        } else {
            return makeRequest('get', Routes.FIND_SYNCHRONISATION_BY_REFERENCE(id));
        }
    }

    static addSynchronisation(synchronisation: string, synchronised: string): Promise<any> {
        return makeRequest('post', Routes.ADD_SYNCHRONISATION(synchronisation, synchronised));
    }

    static deleteSynchronisation(synchronisation: string, synchronised: string): Promise<any> {
        return makeRequest('delete', Routes.REMOVE_SYNCHRONISATION(synchronisation, synchronised));
    }

    static getAccountActivationDetails(reference: string): Promise<any> {
        return makeRequest('get', Routes.FIND_ACTIVATION_ACCOUNT_DETAILS(reference));
    }
}