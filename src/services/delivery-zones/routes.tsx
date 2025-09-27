export const GET_DELIVERY_ZONES = 'api/delivery-zones';
export const CREATE_DELIVERY_ZONE = 'api/delivery-zones';
export const FIND_DELIVERY_ZONE = (reference: string) => `api/delivery-zones/${reference}`;
export const UPDATE_DELIVERY_ZONE = (reference: string) => `api/delivery-zones/${reference}`;

export const GET_AVAILABLE_DELIVERS = 'api/deliveries/availables';