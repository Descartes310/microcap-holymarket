/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    COMMUNITY_SPACE_GET_STATUS,
    COMMUNITY_SPACE_SET_STATUS,
    COMMUNITY_SPACE_SET_VALUE
} from 'Actions/types';

export const statusCommunitySpaceStatus = (data) => (dispatch) => {
    // Persist data into store
    dispatch({ type: COMMUNITY_SPACE_SET_STATUS, payload: data });
};

export const setCommunitySpaceData = (data) => (dispatch) => {
    // Persist data into store
    dispatch({ type: COMMUNITY_SPACE_SET_VALUE, payload: data });
};