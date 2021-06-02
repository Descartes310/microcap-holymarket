import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_UPDATE_ITEM,
	CART_CLEAR,
	CART_INIT_ITEM
} from "../actions/types";
import Cart from "Models/Cart";
const isObject = (obj) => {
	return Object.prototype.toString.call(obj) === '[object Object]';
};
const oldItems = localStorage.getItem('cartItems');
const newOb = (isObject(oldItems) || oldItems === undefined) ? oldItems : "{}" ;
const object = {
    data:newOb,
    auth: null
};
const INIT_STATE = new Cart(object);
export default (state = INIT_STATE, action) => {
    const obj = {};
	switch (action.type) {

		case CART_ADD_ITEM:
		    obj.data = [...state.items[action.authId], action.payload];
            obj.auth = action.authId;
			return new Cart(obj);

		case CART_REMOVE_ITEM:
            obj.data = state.items[action.authId].filter(item => item.id !== action.payload.id);
            obj.auth = action.authId;
            return new Cart(obj);

		case CART_UPDATE_ITEM:
			const items = state.items[action.authId].map(item => item.id === action.payload.id ? action.payload : item);
            obj.data = items;
            obj.auth = action.authId;
			return new Cart(obj);

		case CART_CLEAR:
			localStorage.removeItem("cartItems");
            obj.data = delete state.items[action.authId] ;
            obj.auth = action.authId;
			return new Cart([]);

		case  CART_INIT_ITEM:
            const oldItems = JSON.parse(localStorage.getItem('cartItems'));
			const objectCart = {};

			if(oldItems[action.authId] === null || oldItems) {
                objectCart[action.authId] = [];
            } else {

                objectCart[action.authId] = oldItems[action.authId];
                console.log("objectCart",objectCart)
            }

            obj.data = objectCart;
            obj.auth = action.authId;
			return new Cart(obj);

		default:
			return state;

	}
}
