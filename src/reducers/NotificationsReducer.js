import {
    NOTIFICATION,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_FAILURE,
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

        case NOTIFICATION:
            return { ...state, loading: true };

        case NOTIFICATION_SUCCESS:
            return { ...state, loading: false, data: action.payload };
            // return { ...state, loading: false, data: action.payload.map(notification => new Notification(notification))};

        case NOTIFICATION_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
