import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_UPDATE_ITEM,
	CART_CLEAR,
	CART_INIT_ITEM
} from "../actions/types";
import Cart from "Models/Cart";
 const oldCartItemChecked = (oldItems) => {
     return oldItems
         && typeof oldItems === "object"
         && !Array.isArray(oldItems)
}
const INIT_STATE = {
    items: [],
};
export default (state = INIT_STATE, action) => {
    const obj = {
        data: {},
    };

	switch (action.type) {
		case CART_ADD_ITEM:
		    obj.data[action.authId] = [...state.items, action.payload];
            obj.auth = action.authId;
			return new Cart(obj);

		case CART_REMOVE_ITEM:
            obj.data[action.authId] = state.items.filter(item => item.id !== action.payload.id);
            obj.auth = action.authId;
            return new Cart(obj);

		case CART_UPDATE_ITEM:
			const items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
            obj.data[action.authId] = items;
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

			if (oldItems && oldItems[action.authId] === null) {
                objectCart[action.authId] = oldItems[action.authId];
            } else {
                objectCart[action.authId] = [];
                console.log("objectCart",objectCart)
            }

            obj.data = objectCart;
            obj.auth = action.authId;
			return new Cart(obj);

		default:
			return state;

	}
}
