import {
    COMMERCIAL_OFFER,
    COMMERCIAL_OFFER_SUCCESS,
    COMMERCIAL_OFFER_FAILURE,
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

        case COMMERCIAL_OFFER:
            return { ...state, loading: true };

        case COMMERCIAL_OFFER_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case COMMERCIAL_OFFER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
