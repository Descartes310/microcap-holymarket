import {
    INITIALISATION_PROJECTS_CALL,
    INITIALISATION_PROJECTS_CALL_SUCCESS,
    INITIALISATION_PROJECTS_CALL_FAILURE,
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

        case INITIALISATION_PROJECTS_CALL:
            return { ...state, loading: true };

        case INITIALISATION_PROJECTS_CALL_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case INITIALISATION_PROJECTS_CALL_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
