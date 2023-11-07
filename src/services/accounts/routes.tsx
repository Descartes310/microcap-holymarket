export const GET_ACCOUNTS = 'api/fundings/accounts';
export const FIND_ACCOUNT = (id) => `api/fundings/accounts/${id}`;
export const GET_PAYMENT_ACCOUNTS = 'api/fundings/accounts/payments';
export const GET_ACCOUNTS_BY_TYPE = 'api/fundings/accounts/by-types';
export const DEBIT_ACCOUNT = (id) => `api/fundings/accounts/${id}/debit`;
export const CREDIT_ACCOUNT = (id) => `api/fundings/accounts/${id}/credit`;
export const ACTIVATE_ACCOUNT = (id) => `api/fundings/accounts/${id}/activate`;
export const GET_ACCOUNTS_BY_SPECIALITY = 'api/fundings/accounts/by-speciality';
export const GET_ACCOUNT_MOUVEMENTS = (id) => `api/fundings/accounts/${id}/mouvements`;
export const FIND_ACCOUNT_BY_REFERENCE = (reference) => `api/fundings/accounts/reference/${reference}`;

export const GET_EXTERNAL_ACCOUNTS = 'api/fundings/accounts/externals';
export const CREATE_EXTERNAL_ACCOUNTS = 'api/fundings/accounts/externals';

export const FIND_CONSOLIDATION_BY_REFERENCE = (reference) => `api/fundings/accounts/${reference}/consolidations`;
export const ADD_CONSOLIDATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/consolidate/${reference2}`;
export const REMOVE_CONSOLIDATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/consolidate/${reference2}`;

export const FIND_SYNCHRONISATION_BY_REFERENCE = (reference) => `api/fundings/accounts/${reference}/synchronisation`;
export const ADD_SYNCHRONISATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/synchronise/${reference2}`;
export const REMOVE_SYNCHRONISATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/synchronise/${reference2}`;

export const SET_AGREEMENT = (reference) => `api/fundings/accounts/${reference}/agreements`;
export const GET_AGREEMENTS = (reference) => `api/fundings/accounts/${reference}/agreements`;
export const SET_AGREEMENT_TEMPLATE = (reference) => `api/fundings/accounts/${reference}/agreements/templates`;