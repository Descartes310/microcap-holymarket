import { makeRequest } from '../helpers/helpers';
import { BROKER, joinBaseUrlWithParamsId } from "Url/backendUrl";

export const getBrokerAgencies = () => {
    return makeRequest('get', BROKER.AGENCIES.LIST);
};

export const getBrokerAgency = (id) => {
    const url = joinBaseUrlWithParamsId(BROKER.AGENCIES.FIND, id);
    return makeRequest('get', url);
};

export const getBrokerAccounts = () => {
    return makeRequest('get', BROKER.SELF.ACCOUNTS);
};

export const createBrokerAgency = (data) => {
    return makeRequest('post', BROKER.AGENCIES.CREATE, data);
};

export const getAgencyCounters = () => {
    return makeRequest('get', BROKER.COUNTERS.LIST);
};

export const getAgencyCounter = (id) => {
    const url = joinBaseUrlWithParamsId(BROKER.COUNTERS.FIND, id);
    return makeRequest('get', url);
};

export const createAgencyCounter = (data) => {
    return makeRequest('post', BROKER.COUNTERS.CREATE, data);
};

export const getCounterCashdesks = () => {
    return makeRequest('get', BROKER.CASHDESKS.LIST);
};

export const createCounterCashdesk = (data) => {
    return makeRequest('post', BROKER.CASHDESKS.CREATE, data);
};

export const creditCounterCashdesk = (id, data) => {
    const url = joinBaseUrlWithParamsId(BROKER.CASHDESKS.CREDIT, id);
    return makeRequest('post', url, data);
};

export const getCounterCashdesk = (id) => {
    const url = joinBaseUrlWithParamsId(BROKER.CASHDESKS.FIND, id);
    return makeRequest('get', url);
};