/**
 * Auth User Reducers
 */
import {
    CATEGORY_PRODUCTS,
    CATEGORY_PRODUCTS_SUCCESS,
    CATEGORY_PRODUCTS_FAILURE,
} from 'Actions/types';
import CategoryProducts from "Models/CategoryProducts";

/**
 * initial state
 */
const INIT_STATE = {
    data: null,
    error: null,
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case CATEGORY_PRODUCTS:
            return { ...state, loading: true };

        case CATEGORY_PRODUCTS_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(catalog => new CategoryProducts(catalog)) };

        case CATEGORY_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
