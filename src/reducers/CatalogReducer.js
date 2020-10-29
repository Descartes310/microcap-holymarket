/**
 * Auth User Reducers
 */
import {
    CATALOG,
    CATALOG_SUCCESS,
    CATALOG_FAILURE,
} from 'Actions/types';
import Catalog from "Models/Catalog";

/**
 * initial tokens
 */
const INIT_STATE = {
    data: null,
    error: null,
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case CATALOG:
            return { ...state, loading: true };

        case CATALOG_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(catalog => new Catalog(catalog)) };

        case CATALOG_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
