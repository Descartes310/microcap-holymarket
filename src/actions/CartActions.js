import {
	CART_ADD_ITEM,
	CART_UPDATE_ITEM,
	CART_REMOVE_ITEM, CART_CLEAR
} from './types';

export const onAddItemToCart = (item) => ({
	type: CART_ADD_ITEM,
	payload: item
});

export const deleteItemFromCart = (item) => ({
	type: CART_REMOVE_ITEM,
	payload: item
});

export const onUpdateItemToCart = (item) => ({
	type: CART_UPDATE_ITEM,
	payload: item
});

export const onClearCart = () => ({
	type: CART_CLEAR,
});
