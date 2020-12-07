import {
    SAMPLE_BRANCHES,
    SAMPLE_BRANCHES_SUCCESS,
    SAMPLE_BRANCHES_FAILURE,
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

        case SAMPLE_BRANCHES:
            return { ...state, loading: true };

        case SAMPLE_BRANCHES_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case SAMPLE_BRANCHES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
