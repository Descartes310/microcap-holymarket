export const GET_UNITS = 'api/settings/units';
export const CREATE_UNIT = 'api/settings/units';
export const CHANGE_UNIT_STATUS = (id) => `api/settings/units/${id}/status`;

export const GET_UNIT_TYPES = 'api/settings/units/types';
export const CREATE_UNIT_TYPE = 'api/settings/units/types';
export const GET_UNITS_BY_TYPE = (id) => `api/settings/units/types/${id}/units`;

export const GET_CURRENCIES = 'api/settings/units/currencies';
export const CREATE_CURRENCY = 'api/settings/units/currencies';
export const UPDATE_CURRENCY = (reference) => `api/settings/units/${reference}/currencies`;
export const FIND_CURRENCY = (reference) => `api/settings/units/${reference}/currencies`;