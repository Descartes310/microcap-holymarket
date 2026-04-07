import {
    CART_CLEAR,
	CART_ADD_ITEM,
    CART_INIT_ITEM,
	CART_UPDATE_ITEM,
	CART_REMOVE_ITEM,
	ON_QUANTITY_CHANGE,
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

export const onChangeProductQuantity = (quantity, id) => ({
	type: ON_QUANTITY_CHANGE,
	payload: { id, quantity }
});

export const onClearCart = () => ({
	type: CART_CLEAR
});

export const onInitCart = () => ({
	type: CART_INIT_ITEM
});