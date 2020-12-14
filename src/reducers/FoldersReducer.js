import {
    FOLDERS,
    FOLDERS_SUCCESS,
    FOLDERS_FAILURE,
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

        case FOLDERS:
            return { ...state, loading: true };

        case FOLDERS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case FOLDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
