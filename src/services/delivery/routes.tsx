export const GET_PARCELS = 'api/deliveries/parcels';
export const GET_DELIVERIES = 'api/deliveries';
export const GET_DELIVERY_PARCELS = (reference) => `api/deliveries/${reference}/parcels`;
export const DELETE_DELIVERY_PARCEL = (reference) => `api/deliveries/${reference}/parcels`;
export const CREATE_DELIVERY_PARCEL = 'api/deliveries/delivery-parcels';
export const CREATE_DELIVERY = 'api/deliveries';
export const UPDATE_DELIVERY_STATUS = (reference) => `api/deliveries/${reference}/status`;