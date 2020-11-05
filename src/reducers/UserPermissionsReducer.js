/**
 * Auth User Reducers
 */
import {
    USER_PERMISSIONS,
    USER_PERMISSIONS_SUCCESS,
    USER_PERMISSIONS_FAILURE,
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

        case USER_PERMISSIONS:
            return { ...state, loading: true };

        case USER_PERMISSIONS_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(productType => (productType)) };

        case USER_PERMISSIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
