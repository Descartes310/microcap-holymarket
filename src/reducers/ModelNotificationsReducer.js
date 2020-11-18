import {
    NOTIFICATION_MODEL,
    NOTIFICATION_MODEL_SUCCESS,
    NOTIFICATION_MODEL_FAILURE,
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
        case NOTIFICATION_MODEL:
            return { ...state, loading: true };

        case NOTIFICATION_MODEL_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case NOTIFICATION_MODEL_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
