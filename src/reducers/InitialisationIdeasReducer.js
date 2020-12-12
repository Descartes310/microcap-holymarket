import {
    INITIALISATION_IDEA,
    INITIALISATION_IDEA_SUCCESS,
    INITIALISATION_IDEA_FAILURE,
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

        case INITIALISATION_IDEA:
            return { ...state, loading: true };

        case INITIALISATION_IDEA_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case INITIALISATION_IDEA_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
