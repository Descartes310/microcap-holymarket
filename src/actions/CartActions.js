import {
	CART_ADD_ITEM,
	CART_UPDATE_ITEM,
	CART_REMOVE_ITEM,
    CART_CLEAR,
    CART_INIT_ITEM
} from './types';
import store from "../store";

export const onAddItemToCart = (item) => ({
	type: CART_ADD_ITEM,
	authId: store.getState().authUser.data.id,
	payload: item
});

export const deleteItemFromCart = (item) => ({
	type: CART_REMOVE_ITEM,
	authId: store.getState().authUser.data.id,
	payload: item
});

export const onUpdateItemToCart = (item) => ({
	type: CART_UPDATE_ITEM,
	authId: store.getState().authUser.data.id,
	payload: item
});

export const onClearCart = () => ({
	type: CART_CLEAR,
	authId: store.getState().authUser.data.id,
});

export const onInitCart = () => ({
	type: CART_INIT_ITEM,
	authId: store.getState().authUser.data.id,
});