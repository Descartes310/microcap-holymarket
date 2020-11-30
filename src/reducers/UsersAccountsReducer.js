import {
    USERS_ACCOUNTS,
    USERS_ACCOUNTS_SUCCESS,
    USERS_ACCOUNTS_FAILURE,
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

        case USERS_ACCOUNTS:
            return { ...state, loading: true };

        case USERS_ACCOUNTS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case USERS_ACCOUNTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
