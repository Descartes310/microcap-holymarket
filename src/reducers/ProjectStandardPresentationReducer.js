import {
    PROJECT_STANDARD_PRESENTATION,
    PROJECT_STANDARD_PRESENTATION_SUCCESS,
    PROJECT_STANDARD_PRESENTATION_FAILURE,
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

        case PROJECT_STANDARD_PRESENTATION:
            return { ...state, loading: true };

        case PROJECT_STANDARD_PRESENTATION_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case PROJECT_STANDARD_PRESENTATION_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
