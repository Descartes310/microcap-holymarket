import {
    PACKAGES,
    PACKAGES_SUCCESS,
    PACKAGES_FAILURE,
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

        case PACKAGES:
            return { ...state, loading: true };

        case PACKAGES_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case PACKAGES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
