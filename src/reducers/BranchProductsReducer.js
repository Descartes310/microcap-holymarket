import {
    BRANCH_PRODUCT,
    BRANCH_PRODUCT_SUCCESS,
    BRANCH_PRODUCT_FAILURE,
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

        case BRANCH_PRODUCT:
            return { ...state, loading: true };

        case BRANCH_PRODUCT_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(product => product) };
            // return { ...state, loading: false, data: action.payload.map(catalog => new BranchProduct(catalog)) };

        case BRANCH_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
