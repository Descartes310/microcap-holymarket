import React from 'react';
import InvitationsListType from "./InvitationsListType";
import InvitationType from "Enums/InvitationType";

const InvitationsSend = () => (
    <InvitationsListType
        type={InvitationType.INVITATION_SEND}
    />
);
export default InvitationsSend;
