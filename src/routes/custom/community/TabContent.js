import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {COMMUNITY_MEMBER} from "Url/frontendUrl";
import {connect} from "react-redux";
import Groups from "./groups";
import AllGroups from "./all-groups";
import Invitations from "./invitations";

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={COMMUNITY_MEMBER.GROUPS.ME} />
                <Route path={COMMUNITY_MEMBER.GROUPS.ME} component={Groups} />
                <Route path={COMMUNITY_MEMBER.GROUPS.LIST} component={AllGroups} />
                <Route path={COMMUNITY_MEMBER.INVITATIONS.SELF} component={Invitations} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
