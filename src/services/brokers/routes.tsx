export const GET_AGENCIES = 'api/brokers/agencies';
export const CREATE_AGENCY = 'api/brokers/agencies';
export const GET_AGENCIES_BY_BROKER = 'api/brokers/agencies/find-by-broker';

export const GET_COUNTERS = 'api/brokers/counters';
export const CREATE_COUNTER = 'api/brokers/counters';
export const GET_COUNTERS_BY_AGENCY = 'api/brokers/counters/agencies';
export const GET_COUNTERS_BY_AGENCY_WITHOUT_CTO = 'api/brokers/counters/agencies/without-cto';

export const GET_CASHDESKS = 'api/brokers/cashdesks';
export const CREATE_CASHDESK = 'api/brokers/cashdesks';
export const CREDIT_CASHDESK = (id) => `api/brokers/cashdesks/${id}/credit`;