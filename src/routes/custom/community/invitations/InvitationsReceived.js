import React from 'react';
import InvitationsListType from "./InvitationsListType";
import InvitationType from "Enums/InvitationType";

const InvitationsReceived = () => (
    <InvitationsListType
        type={InvitationType.INVITATION}
    />
);

export default InvitationsReceived;
