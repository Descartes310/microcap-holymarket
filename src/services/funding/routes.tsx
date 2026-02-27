export const CREATE_FUNDING_OFFER = 'api/fundings/funding-offers';
export const GET_MINE_FUNDING_OFFERS = 'api/fundings/funding-offers/mines';
export const GET_ALL_FUNDING_OFFERS = 'api/fundings/funding-offers/networks';
export const FIND_FUNDING_OFFER_BY_REFERENCE = (reference) => `api/fundings/funding-offers/${reference}/find`;

export const GET_PROPOSITIONS = 'api/fundings/funding-offers/propositions';
export const CREATE_PROPOSITION = 'api/fundings/funding-offers/propositions';
export const FIND_PROPOSITION = (reference) => `api/fundings/funding-offers/propositions/${reference}`;
export const INVITE_CODEV_SUBSCRIBER = (reference) => `api/fundings/funding-offers/deals/${reference}/invite`;

export const GET_DEALS = 'api/fundings/funding-offers/deals';
export const GET_OFFERS = 'api/fundings/funding-offers/offers';
export const GET_REQUESTS = 'api/fundings/funding-offers/requests';

export const GET_DEALS_BY_ACCOUNT = 'api/fundings/funding-offers/deals/by-account';
export const FIND_DEAL = (reference) => `api/fundings/funding-offers/deals/${reference}`;
export const GET_CHILD_DEAL = (reference) => `api/fundings/funding-offers/deals/${reference}/child`;
export const VALIDATE_DEAL = (reference) => `api/fundings/funding-offers/deals/${reference}/validate`;
export const CHANGE_ACCOUNT_DEAL = (reference) => `api/fundings/funding-offers/deals/${reference}/account`;


export const GET_BONDS = 'api/fundings/bonds';
export const ACTIVATE_ACCOUNT = (reference) => `api/fundings/accounts/${reference}/activate`;
export const ACTIVATE_PAGE_ACCOUNT = (reference) => `api/fundings/accounts/${reference}/activate/user`;


export const GET_POLITICS = 'api/products/codevs/investments/politics';
export const GET_PROSPECTUS = 'api/products/codevs/investments/prospectus';
export const GET_STRATEGIES = 'api/products/codevs/investments/strategies';
export const GET_PROGRAMS = 'api/products/codevs/investments/programs';
export const CREATE_POLITIC = 'api/products/codevs/investments/politics';
export const CREATE_PROSPECTUS = 'api/products/codevs/investments/prospectus';
export const CREATE_STRATEGY = 'api/products/codevs/investments/strategies';
export const CREATE_PROGRAM = 'api/products/codevs/investments/programs';
export const GET_ACTIVE_PROSPECTUS = 'api/products/codevs/investments/prospectus/active';
export const ACTIVE_PROSPECTUS = (reference) => `api/products/codevs/investments/prospectus/${reference}`;

export const FIND_POLITIC = (reference) => `api/products/codevs/investments/politics/${reference}`;
export const FIND_STRATEGY = (reference) => `api/products/codevs/investments/strategies/${reference}`;
export const FIND_PROGRAM = (reference) => `api/products/codevs/investments/programs/${reference}`;
export const FIND_PROSPECTUS = (reference) => `api/products/codevs/investments/prospectus/${reference}`;

export const GET_PLACEMENTS = 'api/investments/placements';
export const CREATE_PLACEMENT = 'api/investments/placements';
export const GET_PLACEMENT_DEALS = 'api/investments/placements/deals/availables';