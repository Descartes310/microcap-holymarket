import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {COMMUNITY_ADMIN} from "Url/frontendUrl";
import {connect} from "react-redux";
import ListMembers from "./list";
import Invitations from "./invitation";

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                {/* <Redirect exact from={`${match.url}/`} to={COMMUNITY_MEMBER.GROUPS.ME} /> */}
                <Route path={COMMUNITY_ADMIN.INVITATIONS.SELF} component={Invitations} />
                <Route path={COMMUNITY_ADMIN.MEMBERS.LIST} component={ListMembers} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
