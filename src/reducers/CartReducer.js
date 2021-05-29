import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_UPDATE_ITEM,
	CART_CLEAR,
} from "../actions/types";
import Cart from "Models/Cart";

const oldItems = JSON.parse(localStorage.getItem('cartItems'));
const INIT_STATE = new Cart(Array.isArray(oldItems) ? oldItems : []);

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case CART_ADD_ITEM:
			return new Cart([...state.items, action.payload]);

		case CART_REMOVE_ITEM:
			return new Cart(state.items.filter(item => item.id !== action.payload.id));

		case CART_UPDATE_ITEM:
			const items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
			return new Cart(items);

		case CART_CLEAR:
			localStorage.removeItem('cartItems');
			return new Cart([]);

		default:
			return state;

	}
}
