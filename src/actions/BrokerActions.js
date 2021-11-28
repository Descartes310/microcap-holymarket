import api from 'Api';
import { BROKER } from "Url/backendUrl";
import { makeRequest } from '../helpers/helpers';
import { joinBaseUrlWithParams } from './independentActions';

export const getBrokerAgencies = () => {
    return makeRequest('get', BROKER.AGENCIES.LIST);
};

export const getBrokerAccounts = () => {
    return makeRequest('get', BROKER.SELF.ACCOUNTS);
};

export const createbrokerAgency = (data) => {
    return makeRequest('post', BROKER.AGENCIES.CREATE, data);
};