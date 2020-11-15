import {
    BRANCH_USERS,
    BRANCH_USERS_SUCCESS,
    BRANCH_USERS_FAILURE,
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

        case BRANCH_USERS:
            return { ...state, loading: true };

        case BRANCH_USERS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case BRANCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
