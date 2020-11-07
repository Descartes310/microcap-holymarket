import {
    COMMERCIAL_OPERATION,
    COMMERCIAL_OPERATION_SUCCESS,
    COMMERCIAL_OPERATION_FAILURE,
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

        case COMMERCIAL_OPERATION:
            return { ...state, loading: true };

        case COMMERCIAL_OPERATION_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case COMMERCIAL_OPERATION_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
