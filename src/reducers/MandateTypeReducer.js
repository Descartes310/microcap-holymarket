import {
    MANDATE_TYPE,
    MANDATE_TYPE_SUCCESS,
    MANDATE_TYPE_FAILURE,
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

        case MANDATE_TYPE:
            return { ...state, loading: true };

        case MANDATE_TYPE_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case MANDATE_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
