export const GET_ACCOUNTS = 'api/fundings/accounts';
export const FIND_ACCOUNT = (id) => `api/fundings/accounts/${id}`;
export const GET_BIGDEAL_ACCOUNTS = 'api/fundings/accounts/bigdeals';
export const GET_PAYMENT_ACCOUNTS = 'api/fundings/accounts/payments';
export const GET_ACCOUNTS_BY_TYPE = 'api/fundings/accounts/by-types';
export const DEBIT_ACCOUNT = (id) => `api/fundings/accounts/${id}/debit`;
export const CREDIT_ACCOUNT = (id) => `api/fundings/accounts/${id}/credit`;
export const ACTIVATE_ACCOUNT = (id) => `api/fundings/accounts/${id}/activate`;
export const GET_ACCOUNTS_BY_SPECIALITY = 'api/fundings/accounts/by-speciality';
export const PROVISIONING = (id) => `api/fundings/accounts/${id}/provisioning`;
export const CANTONATE_ACCOUNT = (id) => `api/fundings/accounts/${id}/cantonate`;
export const GET_ACCOUNT_MOUVEMENTS = (id) => `api/fundings/accounts/${id}/mouvements`;
export const FIND_ACCOUNT_BY_REFERENCE = (reference) => `api/fundings/accounts/reference/${reference}`;
export const FIND_ACTIVATION_ACCOUNT_DETAILS = (reference) => `api/fundings/accounts/${reference}/details/activation`;

export const GET_ACTIVABLE_ACCOUNTS = 'api/fundings/accounts/activable';

export const GET_EXTERNAL_ACCOUNTS = 'api/fundings/accounts/externals';
export const CREATE_EXTERNAL_ACCOUNTS = 'api/fundings/accounts/externals';
export const GET_SUBSCRIPTION_ACCOUNTS = 'api/fundings/accounts/subscriptions';
export const GET_EXTERNAL_ACCOUNT_POTENTIALS = 'api/fundings/accounts/externals/available';

export const FIND_CONSOLIDATION_BY_REFERENCE = (reference) => `api/fundings/accounts/${reference}/consolidations`;
export const ADD_CONSOLIDATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/consolidate/${reference2}`;
export const REMOVE_CONSOLIDATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/consolidate/${reference2}`;

export const FIND_SYNCHRONISATION_BY_REFERENCE = (reference) => `api/fundings/accounts/${reference}/synchronisation`;
export const ADD_SYNCHRONISATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/synchronise/${reference2}`;
export const REMOVE_SYNCHRONISATION = (reference1, reference2) => `api/fundings/accounts/${reference1}/synchronise/${reference2}`;

export const SET_AGREEMENT = (reference) => `api/fundings/accounts/${reference}/agreements`;
export const GET_AGREEMENTS = (reference) => `api/fundings/accounts/${reference}/agreements`;
export const SET_AGREEMENT_TEMPLATE = (reference) => `api/fundings/accounts/${reference}/agreements/templates`;

export const CREATE_CARNET_JOURNAL = (reference) => `api/fundings/accounts/${reference}/journal`;

export const FIND_ACCOUNT_BY_NUMBER_AND_KEY = (number, key) => `api/fundings/accounts/search/${number}/key/${key}`;

export const GET_ACCOUNT_PROFILES = 'api/fundings/accounts/profiles';
export const GET_ACCOUNT_ALL_PROFILES = 'api/fundings/accounts/profiles/all';