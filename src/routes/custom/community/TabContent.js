import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {COMMUNITY_MEMBER} from "Url/frontendUrl";
import {connect} from "react-redux";
import Groups from "./groups";
import Chat from "./chats";
import AllGroups from "./all-groups";
import Pending from "./pending-groups";
import Favourites from "./favourites";
import Invitations from "./groups/invitation"

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={COMMUNITY_MEMBER.GROUPS.ME} />
                <Route path={COMMUNITY_MEMBER.GROUPS.ME} component={Groups} />
                <Route path={COMMUNITY_MEMBER.GROUPS.LIST} component={AllGroups} />
                <Route path={COMMUNITY_MEMBER.GROUPS.CHAT} component={Chat} />
                <Route path={COMMUNITY_MEMBER.GROUPS.PENDING} component={Pending} />
                <Route path={COMMUNITY_MEMBER.GROUPS.FAVOURITES} component={Favourites} />
                <Route path={COMMUNITY_MEMBER.INVITATIONS.SELF} component={Invitations} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
