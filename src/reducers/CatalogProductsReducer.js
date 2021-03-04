import {
    CATALOG_PRODUCTS,
    CATALOG_PRODUCTS_SUCCESS,
    CATALOG_PRODUCTS_FAILURE,
} from 'Actions/types';
import BranchProduct from "Models/BranchProduct";

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

        case CATALOG_PRODUCTS:
            return { ...state, loading: true };

        case CATALOG_PRODUCTS_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(catalog => catalog) };

        case CATALOG_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
