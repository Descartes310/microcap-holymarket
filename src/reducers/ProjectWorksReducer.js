import {
    PROJECT_WORKS,
    PROJECT_WORKS_SUCCESS,
    PROJECT_WORKS_FAILURE,
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

        case PROJECT_WORKS:
            return { ...state, loading: true };

        case PROJECT_WORKS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case PROJECT_WORKS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
