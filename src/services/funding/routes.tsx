export const CREATE_FUNDING_OFFER = 'api/fundings/funding-offers';
export const GET_MINE_FUNDING_OFFERS = 'api/fundings/funding-offers/mines';
export const GET_ALL_FUNDING_OFFERS = 'api/fundings/funding-offers/networks';
export const FIND_FUNDING_OFFER_BY_REFERENCE = (reference) => `api/fundings/funding-offers/${reference}/find`;

export const GET_PROPOSITIONS = 'api/fundings/funding-offers/propositions';
export const CREATE_PROPOSITION = 'api/fundings/funding-offers/propositions';
export const FIND_PROPOSITION = (reference) => `api/fundings/funding-offers/propositions/${reference}`;

export const GET_DEALS = 'api/fundings/funding-offers/deals';
export const GET_DEALS_BY_ACCOUNT = 'api/fundings/funding-offers/deals/by-account';
export const FIND_DEAL = (reference) => `api/fundings/funding-offers/deals/${reference}`;
export const VALIDATE_DEAL = (reference) => `api/fundings/funding-offers/deals/${reference}/validate`;
export const CHANGE_ACCOUNT_DEAL = (reference) => `api/fundings/funding-offers/deals/${reference}/account`;


export const GET_BONDS = 'api/fundings/bonds';

export const ACTIVATE_ACCOUNT = (reference) => `api/fundings/accounts/${reference}/activate`;