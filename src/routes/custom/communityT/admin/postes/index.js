import React from 'react';
import { COMMUNITY_ADMIN } from "Url/frontendUrl";
import List from './List';
import Create from './Create';
import MotivationList from './ListMotivation';
import CreateMotivation from './CreateMotivation';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const PostProjectsManagement = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={COMMUNITY_ADMIN.POST.LIST} />
                <Route path={COMMUNITY_ADMIN.POST.LIST} component={List} />
                <Route path={COMMUNITY_ADMIN.POST.CREATE} component={Create} />
                <Route path={COMMUNITY_ADMIN.POST.MOTIVATION.LIST} component={MotivationList} />
                <Route path={COMMUNITY_ADMIN.POST.MOTIVATION.CREATE} component={CreateMotivation} />
            </Switch>
        </div>
    );
};

export default withRouter(PostProjectsManagement);
