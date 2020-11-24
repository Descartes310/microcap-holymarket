import {
    NOTIFICATION_SERVICE,
    NOTIFICATION_SERVICE_SUCCESS,
    NOTIFICATION_SERVICE_FAILURE,
} from 'Actions/types';
import Notification from "Models/Notification";

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
        case NOTIFICATION_SERVICE:
            return { ...state, loading: true };

        case NOTIFICATION_SERVICE_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(n => new Notification(n)) };

        case NOTIFICATION_SERVICE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
