import {
    SET_CURRENT_COMMUNITY,
    SET_CURRENT_COMMUNITY_SUCCESS,
    SET_CURRENT_COMMUNITY_FAILURE,
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

        case SET_CURRENT_COMMUNITY:
            return { ...state, loading: true };

        case SET_CURRENT_COMMUNITY_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case SET_CURRENT_COMMUNITY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
