import React from 'react';
import InvitationsListType from "./InvitationsListType";
import InvitationType from "Enums/InvitationType";

const InvitationsReceived = () => (
    <InvitationsListType
        title= {"Demande d'adhésion reçus"}
        type={InvitationType.INVITATION}
    />
);

export default InvitationsReceived;
