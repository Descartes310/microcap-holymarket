import {
    USER_COMMUNITIES_ADMIN,
    USER_COMMUNITIES_ADMIN_SUCCESS,
    USER_COMMUNITIES_ADMIN_FAILURE,
} from 'Actions/types';
import Community from "Models/Community";

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

        case USER_COMMUNITIES_ADMIN:
            return { ...state, loading: true };

        case USER_COMMUNITIES_ADMIN_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(userCommunities => new Community(userCommunities)) };

        case USER_COMMUNITIES_ADMIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
