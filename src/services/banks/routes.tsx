export const GET_PRESTATIONS = 'api/cashmanagements/prestations';
export const CREATE_PRESTATION = 'api/cashmanagements/prestations';
export const GET_COVERAGES = 'api/cashmanagements/prestations/coverages';
export const CREATE_COVERAGE = 'api/cashmanagements/prestations/coverages';
export const GET_EFFECTS = (id) => `api/cashmanagements/prestations/${id}/effects`;
export const CREATE_EFFECT = (id) => `api/cashmanagements/prestations/${id}/effects`;
export const GET_PRESTATION_DETAILS = (id) => `api/cashmanagements/prestations/${id}/details`;
export const CREATE_PRESTATION_DETAILS = (id) => `api/cashmanagements/prestations/${id}/details`;
export const ADD_COVERAGE_TO_PRESTATION = (id) => `api/cashmanagements/prestations/coverages/${id}`;
export const GET_AVAILABLE_COVERAGES = (id) => `api/cashmanagements/prestations/coverages/${id}/availables`;

export const CREATE_MANDATE = 'api/cashmanagements/mandates';
export const CREATE_AGENT = 'api/cashmanagements/mandates/agents';
export const GET_FUND_ACCOUNTS = 'api/cashmanagements/mandates/funding-accounts';
export const GET_POTENTIAL_AGENT = 'api/cashmanagements/mandates/potential-agents';

export const GET_PARTIES = 'api/cashmanagements/parties';
export const GET_COUNTERS = 'api/cashmanagements/parties/counters';
export const CREATE_COUNTER = 'api/cashmanagements/parties/counters';
export const GET_INTERMEDIATE_PARTIES = 'api/cashmanagements/parties/intermediates';


export const GET_SUBSCRIPTIONS = 'api/cashmanagements/subscriptions';
export const CREATE_SUBSCRIPTION = 'api/cashmanagements/subscriptions';