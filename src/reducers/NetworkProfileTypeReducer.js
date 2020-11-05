/**
 * NetworkProfile Reducers
 */
import {
    NETWORK_PROFILE_TYPE,
    NETWORK_PROFILE_TYPE_SUCCESS,
    NETWORK_PROFILE_TYPE_FAILURE,
    CLEAR_AUTH_USER,
} from 'Actions/types';
import NetworkProfileType from "Models/NetworkProfileType";

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

        case NETWORK_PROFILE_TYPE:
            return { ...state, loading: true };

        case NETWORK_PROFILE_TYPE_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(p => new NetworkProfileType(p)) };

        case NETWORK_PROFILE_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_AUTH_USER:
            return { ...INIT_STATE };

        default: return { ...state };
    }
}
