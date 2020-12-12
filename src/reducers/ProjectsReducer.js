import {
    PROJECTS,
    PROJECTS_SUCCESS,
    PROJECTS_FAILURE,
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

        case PROJECTS:
            return { ...state, loading: true };

        case PROJECTS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case PROJECTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
