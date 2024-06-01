export const GET_PRESTATIONS = 'api/cashmanagements/prestations';
export const CREATE_PRESTATION = 'api/cashmanagements/prestations';
export const GET_COVERAGES = 'api/cashmanagements/prestations/coverages';
export const CREATE_COVERAGE = 'api/cashmanagements/prestations/coverages';
export const GET_EFFECTS = (id) => `api/cashmanagements/prestations/${id}/effects`;
export const CREATE_EFFECT = (id) => `api/cashmanagements/prestations/${id}/effects`;
export const GET_PRESTATION_DETAILS = (id) => `api/cashmanagements/prestations/${id}/details`;
export const CREATE_PRESTATION_DETAILS = (id) => `api/cashmanagements/prestations/${id}/details`;
export const ADD_COVERAGE_TO_PRESTATION = (id) => `api/cashmanagements/prestations/coverages/${id}`;
export const GET_COVERAGE_TO_PRESTATIONS = (id) => `api/cashmanagements/prestations/coverages/${id}`;
export const GET_AVAILABLE_COVERAGES = (id) => `api/cashmanagements/prestations/coverages/${id}/availables`;

export const CREATE_MANDATE = 'api/cashmanagements/mandates';
export const CREATE_AGENT = 'api/cashmanagements/mandates/agents';
export const GET_FUND_ACCOUNTS = 'api/cashmanagements/mandates/funding-accounts';
export const GET_POTENTIAL_AGENT = 'api/cashmanagements/mandates/potential-agents';

export const GET_PARTIES = 'api/cashmanagements/parties';
export const GET_CHILD = 'api/cashmanagements/parties/child';
export const GET_COUNTERS = 'api/cashmanagements/parties/counters';
export const CREATE_COUNTER = 'api/cashmanagements/parties/counters';
export const GET_CASHDESKS = 'api/cashmanagements/parties/cashdesks';
export const CREATE_CASHDESK = 'api/cashmanagements/parties/cashdesks';
export const GET_PARTY_COUNTERS = 'api/cashmanagements/parties/potential-counters';
export const GET_INTERMEDIATE_PARTIES = 'api/cashmanagements/parties/intermediates';
export const GET_INTERMEDIATE_BANKS = 'api/cashmanagements/parties/intermediates/banks';


export const GET_SUBSCRIPTIONS = 'api/cashmanagements/subscriptions';
export const CREATE_SUBSCRIPTION = 'api/cashmanagements/subscriptions';
export const GET_MINE_SUBSCRIPTION = 'api/cashmanagements/subscriptions/mine';
export const GET_USER_DOMICILIATIONS = 'api/cashmanagements/subscriptions/accounts';
export const GET_USER_PRESTATIONS = 'api/cashmanagements/subscriptions/prestations';
export const GET_DOMICILIATION_PRESTATIONS = 'api/cashmanagements/subscriptions/prestations/domiciliation';

export const GET_OPERATIONS = 'api/cashmanagements/operations';
export const CREATE_OPERATION = 'api/cashmanagements/operations';
export const PURGE_OPERATIONS = 'api/cashmanagements/operations/purge';
export const ASK_PERMISSION = 'api/cashmanagements/operations/permission';
export const CONFIRM_PERMISSION = 'api/cashmanagements/operations/permission';
export const GET_PENDING_OPERATIONS = 'api/cashmanagements/operations/pending';
export const LIQUID_OPERATION = (id) => `api/cashmanagements/operations/${id}/liquid`;
export const SEND_CONFIRM_OPERATION_OTP = (reference) => `api/sequences/operations/${reference}/otp`;
export const CONFIRM_OPERATION = (reference) => `api/cashmanagements/operations/${reference}/confirm`;
export const FIND_OPERATION_BY_BANK_AUTH = 'api/cashmanagements/operations/find-by-bank-authorization';
export const VALIDATE_OPERATION = (reference) => `api/cashmanagements/operations/${reference}/validate`;

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

export const GET_ADMIN_CHARGE_REQUESTS = 'api/cashmanagements/moneys/charge/requests/all';
export const GET_ADMIN_CHARGE_REQUEST_PENDING = 'api/cashmanagements/moneys/charge/requests/pending';
export const RESPOND_TO_CHARGE_REQUEST = (id) => `api/cashmanagements/moneys/charge/requests/${id}/respond`;

export const CREATE_CHECKBOOK = 'api/cashmanagements/cheques/books';
export const GET_CLIENT_CHECKBOOKS = 'api/cashmanagements/cheques/books/clients';


export const SET_MMS_SETTINGS = 'api/cashmanagements/mms/settings';

export const CHEQUE_TOPIC = 'api/cashmanagements/cheques/topics';

export const CREATE_ORDER_SERVICE_ITEM = 'api/cashmanagements/serviceorders/items';
export const GET_ORDER_SERVICE_ITEMS = 'api/cashmanagements/serviceorders/items';


export const FIND_SERVICE_ORDER_BY_BANK_AUTH = (reference) => `api/cashmanagements/operations/find-order-service/by-bank-auth/${reference}`;


export const LIQUID_SERVICE_ORDER = (reference) => `api/cashmanagements/operations/${reference}/os/liquid`;
export const ARCHIVE_SERVICE_ORDER = (reference) => `api/cashmanagements/operations/${reference}/os/archive`;
export const LIQUIDOPMCM_SERVICE_ORDER = (reference) => `api/cashmanagements/operations/${reference}/os/liquidopmcm`;


export const GET_BL = `api/documents/bl`;
export const CREATE_BL = `api/documents/bl`;
export const BL_OP_AVAILABLE = `api/documents/bl/operations/availables`;
export const UPDATE_BL = (reference) => `api/documents/bl/${reference}/update`;
export const LIQUID_BL = (reference) => `api/documents/bl/${reference}/liquid`;
export const VALIDATE_BL = (reference) => `api/documents/bl/${reference}/validate`;
export const GET_BL_OPERATIONS = (reference) => `api/documents/bl/${reference}/operations`;
export const CHANGE_BL_OPERATIONS = (reference) => `api/documents/bl/${reference}/operations`;