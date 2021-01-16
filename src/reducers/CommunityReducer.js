/**
 * Auth User Reducers
 */
import {
    COMMUNITY_SPACE_GET_STATUS,
    COMMUNITY_SPACE_SET_STATUS,
    COMMUNITY_SPACE_SET_VALUE
} from 'Actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    data: null,
    error: null,
    status: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case COMMUNITY_SPACE_GET_STATUS:
            return {...state, status: action.payload.status, data: action.payload.data };

        case COMMUNITY_SPACE_SET_STATUS:
            return {...state, status: action.payload};

        case COMMUNITY_SPACE_SET_VALUE:
            return { ...state, data: action.payload };

        default: return { ...state };
    }
}
