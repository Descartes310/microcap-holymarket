export const GET_ORDERS = 'api/orders';
export const CREATE_ORDER = 'api/orders';
export const GET_PURCHASES = 'api/orders/purchases';
export const GET_SALES = (id) => `api/orders/${id}/sales`;
export const PAY_ORDER = (id) => `api/orders/${id}/pay/stripe`;