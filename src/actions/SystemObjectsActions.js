import {SYSTEM_OBJECT} from "Url/backendUrl";
import {SYS_PRODUCT_NATURE, SYS_TIME_UNIT} from "Actions/types";
import {makeActionRequest} from "Actions/GeneralActions";

export const getSysProductNature = () => (dispatch) => {
    const url = `${SYSTEM_OBJECT.PRODUCT_NATURE}`;
    return makeActionRequest('get', url, SYS_PRODUCT_NATURE, dispatch);
};

export const getSysTimeUnit = () => (dispatch) => {
    const url = `${SYSTEM_OBJECT.TIME_UNIT}`;
    return makeActionRequest('get', url, SYS_TIME_UNIT, dispatch);
};
