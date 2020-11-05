/**
 * Auth User Reducers
 */
import {
    PRODUCT_TYPE,
    PRODUCT_TYPE_SUCCESS,
    PRODUCT_TYPE_FAILURE,
} from 'Actions/types';
import ProductType from "Models/ProductType";

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

        case PRODUCT_TYPE:
            return { ...state, loading: true };

        case PRODUCT_TYPE_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(productType => new ProductType(productType)) };

        case PRODUCT_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
