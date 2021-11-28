import api from 'Api';
import { makeRequest } from '../helpers/helpers';
import { BROKER, joinBaseUrlWithParamsId } from "Url/backendUrl";

export const getBrokerAgencies = () => {
    return makeRequest('get', BROKER.AGENCIES.LIST);
};

export const getBrokerAccounts = () => {
    return makeRequest('get', BROKER.SELF.ACCOUNTS);
};

export const createBrokerAgency = (data) => {
    return makeRequest('post', BROKER.AGENCIES.CREATE, data);
};

export const getAgencyCounters = (id) => {
    const url = joinBaseUrlWithParamsId(BROKER.AGENCIES.COUNTERS, id);
    return makeRequest('get', url);
};

export const createAgencyCounter = (data) => {
    return makeRequest('post', BROKER.COUNTERS.CREATE, data);
};

export const getCounterCashdesks = (id) => {
    const url = joinBaseUrlWithParamsId(BROKER.COUNTERS.CASHDESKS, id);
    return makeRequest('get', url);
};