import {
    MANDATE,
    MANDATE_SUCCESS,
    MANDATE_FAILURE,
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

        case MANDATE:
            return { ...state, loading: true };

        case MANDATE_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case MANDATE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
