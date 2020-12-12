import {
    INITIALISATION_PROGRAM,
    INITIALISATION_PROGRAM_SUCCESS,
    INITIALISATION_PROGRAM_FAILURE,
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

        case INITIALISATION_PROGRAM:
            return { ...state, loading: true };

        case INITIALISATION_PROGRAM_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case INITIALISATION_PROGRAM_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
