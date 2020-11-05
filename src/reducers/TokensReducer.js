/**
 * Auth User Reducers
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE
} from 'Actions/types';
import {getAuthToken} from "Helpers/tokens";

const initialTokenValue = getAuthToken();

/**
 * initial state
 */
const INIT_STATE = {
    error: null,
    loading: false,
    data: {
        accessToken: initialTokenValue.accessToken,
        refreshToken: initialTokenValue.refreshToken,
        expiresIn: initialTokenValue.expiresIn,
        tokenType: initialTokenValue.tokenType,
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case SIGNUP_USER:
        case LOGIN_USER:
            return { ...state, loading: true };

        case SIGNUP_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case SIGNUP_USER_FAILURE:
        case LOGIN_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT_USER:
            return { loading: false, error: null, data: null };

        default: return { ...state };
    }
}
