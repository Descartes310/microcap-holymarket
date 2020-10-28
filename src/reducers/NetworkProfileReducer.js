/**
 * NetworkProfile Reducers
 */
import {
    NETWORK_PROFILE,
    NETWORK_PROFILE_SUCCESS,
    NETWORK_PROFILE_FAILURE,
    CLEAR_AUTH_USER,
} from 'Actions/types';
import NetworkProfile from "Models/NetworkProfile";

/**
 * initial tokens
 */
const INIT_STATE = {
    data: null,
    error: null,
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case NETWORK_PROFILE:
            return { ...state, loading: true };

        case NETWORK_PROFILE_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(p => new NetworkProfile(p)) };

        case NETWORK_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_AUTH_USER:
            return { ...INIT_STATE };

        default: return { ...state };
    }
}
