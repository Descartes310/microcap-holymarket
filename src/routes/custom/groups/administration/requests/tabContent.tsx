import React from 'react';
import { connect } from "react-redux";
import { GROUP } from "Url/frontendUrl";
import JoinRequests from './tabs/joinRequest';
import InvitationRequest from './tabs/invitationRequest';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.REQUEST.INVITATION} />
                <Route path={GROUP.ADMINISTRATION.REQUEST.JOIN} component={JoinRequests} />
                <Route path={GROUP.ADMINISTRATION.REQUEST.INVITATION} component={InvitationRequest} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
