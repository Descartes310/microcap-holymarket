export const GET_ACCOUNTS = 'api/fundings/accounts';
export const FIND_ACCOUNT = (id) => `api/fundings/accounts/${id}`;
export const GET_ACCOUNTS_BY_TYPE = 'api/fundings/accounts/by-types';
export const DEBIT_ACCOUNT = (id) => `api/fundings/accounts/${id}/debit`;
export const CREDIT_ACCOUNT = (id) => `api/fundings/accounts/${id}/credit`;
export const ACTIVATE_ACCOUNT = (id) => `api/fundings/accounts/${id}/activate`;
export const GET_ACCOUNT_MOUVEMENTS = (id) => `api/fundings/accounts/${id}/mouvements`;
export const FIND_ACCOUNT_BY_REFERENCE = (reference) => `api/fundings/accounts/reference/${reference}`;