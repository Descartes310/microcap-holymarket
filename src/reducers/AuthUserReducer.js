/**
 * Auth User Reducers
 */
import {
    SET_AUTH_USER,
    SET_AUTH_USER_SUCCESS,
    SET_AUTH_USER_FAILURE,
    CLEAR_AUTH_USER,
} from 'Actions/types';
import { saveSettings } from 'Helpers/tokens';
import { setSyntheticTrailingComments } from 'typescript';

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

        case SET_AUTH_USER:
            return { ...state, loading: true };

        case SET_AUTH_USER_SUCCESS:
            saveSettings(action.payload.currency);
            return { ...state, loading: false, data: action.payload };

        case SET_AUTH_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_AUTH_USER:
            return { ...INIT_STATE };

        default: return { ...state };
    }
}
