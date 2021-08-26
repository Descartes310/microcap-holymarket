import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {COMMUNITY} from "Url/frontendUrl";
import {connect} from "react-redux";
import ListMembers from "./list";
import Invitations from "./invitation";

const TabContent = ({ match }) => {
    return (
        <div className="full-height pt-10 px-20">
            <Switch>
                {/* <Redirect exact from={`${match.url}/`} to={COMMUNITY_MEMBER.GROUPS.ME} /> */}
                <Route path={COMMUNITY.MEMBERS.LIST} component={ListMembers} />
                <Route path={COMMUNITY.MEMBERS.INVITATION} component={Invitations} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
