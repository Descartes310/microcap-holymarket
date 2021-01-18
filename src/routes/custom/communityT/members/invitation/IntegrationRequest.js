import React from 'react';
import InvitationsListType from "./InvitationsListType";
import InvitationType from "Enums/InvitationType";

const IntegrationRequest = () => (
    <InvitationsListType
        type={InvitationType.REQUEST}
    />
);

export default IntegrationRequest;
