import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {COMMUNITY} from "Url/frontendUrl";
import {connect} from "react-redux";
import Groups from "./groups";
import AllGroups from "./all-groups";
import Invitations from "./invitations";

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={COMMUNITY.GROUPS.ME} />
                <Route path={COMMUNITY.GROUPS.ME} component={Groups} />
                <Route path={COMMUNITY.GROUPS.LIST} component={AllGroups} />
                <Route path={COMMUNITY.INVITATIONS.SELF} component={Invitations} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
