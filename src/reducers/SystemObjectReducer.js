import {
    SYS_PRODUCT_NATURE,
    SYS_PRODUCT_NATURE_SUCCESS,
    SYS_PRODUCT_NATURE_FAILURE,
    SYS_TIME_UNIT, SYS_TIME_UNIT_SUCCESS, SYS_TIME_UNIT_FAILURE,
} from 'Actions/types';

/**
 * initial state
 */
const INIT_STATE = {
    productNature: {
        data: null,
        error: null,
        loading: false
    },
    timeUnit: {
        data: null,
        error: null,
        loading: false
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case SYS_PRODUCT_NATURE:
            return {...state, productNature: { ...state, loading: true }};

        case SYS_PRODUCT_NATURE_SUCCESS:
            return {...state, productNature: { ...state, loading: false, data: action.payload }};

        case SYS_PRODUCT_NATURE_FAILURE:
            return {...state, productNature: { ...state, loading: false, error: action.payload }};

        case SYS_TIME_UNIT:
            return {...state, timeUnit: { ...state, loading: true }};

        case SYS_TIME_UNIT_SUCCESS:
            return {...state, timeUnit: { ...state, loading: false, data: action.payload }};

        case SYS_TIME_UNIT_FAILURE:
            return {...state, timeUnit: { ...state, loading: false, error: action.payload }};


        default: return { ...state };
    }
}
