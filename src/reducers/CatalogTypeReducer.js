/**
 * Auth User Reducers
 */
import {
    CATALOG_TYPE,
    CATALOG_TYPE_SUCCESS,
    CATALOG_TYPE_FAILURE,
} from 'Actions/types';
import Catalog from "Models/Catalog";

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

        case CATALOG_TYPE:
            return { ...state, loading: true };

        case CATALOG_TYPE_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(catalog => new Catalog(catalog)) };

        case CATALOG_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
