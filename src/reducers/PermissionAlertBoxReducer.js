/**
 * Auth User Reducers
 */
import {SET_PERMISSION_ALERT_BOX} from 'Actions/types';

/**
 * initial value
 */
const INIT_STATE = true;

export default (state = INIT_STATE, action) => {
    if (action.type === SET_PERMISSION_ALERT_BOX) {
        return action.payload;
    } else {
        return state;
    }
}
