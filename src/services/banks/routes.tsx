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
export const GET_CHILD = 'api/cashmanagements/parties/child';
export const GET_COUNTERS = 'api/cashmanagements/parties/counters';
export const CREATE_COUNTER = 'api/cashmanagements/parties/counters';
export const GET_INTERMEDIATE_PARTIES = 'api/cashmanagements/parties/intermediates';
export const GET_INTERMEDIATE_BANKS = 'api/cashmanagements/parties/intermediates/banks';


export const GET_SUBSCRIPTIONS = 'api/cashmanagements/subscriptions';
export const CREATE_SUBSCRIPTION = 'api/cashmanagements/subscriptions';
export const GET_USER_DOMICILIATIONS = 'api/cashmanagements/subscriptions/accounts';
export const GET_USER_PRESTATIONS = 'api/cashmanagements/subscriptions/prestations';

export const GET_OPERATIONS = 'api/cashmanagements/operations';
export const CREATE_OPERATION = 'api/cashmanagements/operations';
export const PURGE_OPERATIONS = 'api/cashmanagements/operations/purge';

export const GET_INJECTIONS = 'api/cashmanagements/moneys/injections';
export const CREATE_INJECTION = 'api/cashmanagements/moneys/injections';
export const GET_EXTINCTIONS = 'api/cashmanagements/moneys/extinctions';
export const CREATE_EXTINCTION = 'api/cashmanagements/moneys/extinctions';

export const GET_EXPLOITATION_CREDITS = 'api/cashmanagements/moneys/exploitation/credits';
export const CREATE_EXPLOITATION_CREDIT = 'api/cashmanagements/moneys/exploitation/credits';

export const GET_COMPENSATION_CREDITS = 'api/cashmanagements/moneys/compensation/credits';
export const CREATE_COMPENSATION_CREDIT = 'api/cashmanagements/moneys/compensation/credits';

export const CREATE_CHARGE_REQUEST = 'api/cashmanagements/moneys/charge/requests';
export const GET_AGENT_CHARGE_REQUESTS = 'api/cashmanagements/moneys/charge/requests';