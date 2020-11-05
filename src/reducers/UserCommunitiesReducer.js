import {
    USER_COMMUNITIES,
    USER_COMMUNITIES_SUCCESS,
    USER_COMMUNITIES_FAILURE,
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

        case USER_COMMUNITIES:
            return { ...state, loading: true };

        case USER_COMMUNITIES_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(userCommunities => new Community(userCommunities)) };

        case USER_COMMUNITIES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
