/**
 * Auth User Reducers
 */
import {
    USER_PROFILE,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
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

        case USER_PROFILE:
            return { ...state, loading: true };

        case USER_PROFILE_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(productType => (productType)) };

        case USER_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
