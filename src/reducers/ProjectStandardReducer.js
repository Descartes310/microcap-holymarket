import {
    PROJECT_STANDARD,
    PROJECT_STANDARD_SUCCESS,
    PROJECT_STANDARD_FAILURE,
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

        case PROJECT_STANDARD:
            return { ...state, loading: true };

        case PROJECT_STANDARD_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case PROJECT_STANDARD_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
