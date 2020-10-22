/**
 * Auth User Reducers
 */
import {
    ENABLE_APP_LOADING,
    DISABLE_APP_LOADING
} from 'Actions/types';

/**
 * initial tokens
 */
const INIT_STATE = true;

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case ENABLE_APP_LOADING:
            return true;

        case DISABLE_APP_LOADING:
            return false;

        default: return state;
    }
}
