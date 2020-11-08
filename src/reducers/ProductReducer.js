import {
    PRODUCT,
    PRODUCT_SUCCESS,
    PRODUCT_FAILURE,
} from 'Actions/types';

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

        case PRODUCT:
            return { ...state, loading: true };

        case PRODUCT_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
