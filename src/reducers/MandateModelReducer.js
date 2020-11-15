import {
    MANDATE_MODEL,
    MANDATE_MODEL_SUCCESS,
    MANDATE_MODEL_FAILURE,
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

        case MANDATE_MODEL:
            return { ...state, loading: true };

        case MANDATE_MODEL_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case MANDATE_MODEL_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
