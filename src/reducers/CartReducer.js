import {
	CART_CLEAR,
	CART_ADD_ITEM,
	CART_INIT_ITEM,
	CART_REMOVE_ITEM,
	CART_UPDATE_ITEM,
	ON_QUANTITY_CHANGE
} from "../actions/types";
import Cart from "Models/Cart";

const INIT_STATE = {
	items: [],
};

export default (state = INIT_STATE, action) => {
	
	const oldItems = JSON.parse(localStorage.getItem('cartItems'));
	const obj = {items: []};

	if (oldItems) {
		obj.data = {items: oldItems ? oldItems : []};
	}

	switch (action.type) {
		case CART_ADD_ITEM:
			obj.data = {items: [...state.items, action.payload]};
			return new Cart(obj);

		case CART_REMOVE_ITEM:
			obj.data = {items: state.items.filter(item => item.id !== action.payload.id)};
			return new Cart(obj);

		case CART_UPDATE_ITEM:
			const items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
			obj.data = {items};
			return new Cart(obj);

		case ON_QUANTITY_CHANGE:
			let newItems = state.items.map(item => item.id === action.payload.id ? {...item, quantity: action.payload.quantity} : item);
			obj.data = {items: newItems};
			return new Cart(obj);

		case CART_CLEAR:
			obj.data = {items: []};
			return new Cart(obj);

		case CART_INIT_ITEM:
			if(obj) {
				if(obj.data) {
					obj.data = {items: []};
				}
			}
			return new Cart(obj);

		default:
			return new Cart(obj);

	}
}
