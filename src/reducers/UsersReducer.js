/**
 * Auth User Reducers
 */
import {
    USERS,
    USERS_SUCCESS,
    USERS_FAILURE,
} from 'Actions/types';
import User from "Models/User";

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

        case USERS:
            return { ...state, loading: true };

        case USERS_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(user => new User(user)) };

        case USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
