import {
    COM_INVITATIONS_PENDING,
    COM_INVITATIONS_PENDING_SUCCESS,
    COM_INVITATIONS_PENDING_FAILURE,
} from 'Actions/types';
import Community from "Models/Community";

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

        case COM_INVITATIONS_PENDING:
            return { ...state, loading: true };

        case COM_INVITATIONS_PENDING_SUCCESS:
            return { ...state, loading: false, data: action.payload.map(userCommunity => ({...userCommunity, id: userCommunity.invitationId, group: new Community(userCommunity.group)})) };

        case COM_INVITATIONS_PENDING_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}
