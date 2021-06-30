import {
	ON_DELETE_ITEM_FROM_CART,
	ON_QUANTITY_CHANGE,
	ON_ADD_ITEM_TO_CART
} from "../actions/types";
import update from 'react-addons-update';

const INIT_STATE = {
	cart: [
	],
	newCartItem: {
		objectID: "",
		name: "",
		image: "",
		description: "",
		brand: "",
		price: null,
		productQuantity: null,
		totalPrice: null
	},
}

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case ON_DELETE_ITEM_FROM_CART:
			let index = state.cart.indexOf(action.payload)
			return update(state, {
				cart: {
					$splice: [[index, 1]]
				}
			});

		case ON_QUANTITY_CHANGE:
			let cartItemIndex = state.cart.indexOf(action.payload.cartItem);
			return update(state, {
				cart: {
					[cartItemIndex]: {
						productQuantity: { $set: action.payload.quantity },
						totalPrice: { $set: action.payload.cartItem.price * action.payload.quantity }
					}
				}
			});

		case ON_ADD_ITEM_TO_CART:
			let newCartItem = {
				objectID: action.payload.objectID,
				name: action.payload.name,
				image: action.payload.image,
				description: action.payload.description,
				brand: action.payload.brand,
				price: action.payload.price,
				productQuantity: 1,
				totalPrice: action.payload.price
			};
			return update(state, {
				cart: {
					$push: [newCartItem]
				}
			})

		default:
			return { ...state };

	}
}
