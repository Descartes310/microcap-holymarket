/**
     * Redux Action To display or not permission alert box
 */
import {SET_PERMISSION_ALERT_BOX} from "Actions/types";

export const setPermissionAlertBox = (shouldNotDisplay) => (dispatch) => {
    dispatch({ type: SET_PERMISSION_ALERT_BOX, payload: shouldNotDisplay });
};

export const permissionMiddleware = (havePermission) => (dispatch) => {
    if (!havePermission) {
        dispatch(setPermissionAlertBox(true));
    }
};
