import React from 'react';
import { COMMUNITY_ADMIN } from "Url/frontendUrl";
import List from './List';
import Create from './Create';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const PostProjectsManagement = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={COMMUNITY_ADMIN.RUBRIQUE.LIST} />
                <Route path={COMMUNITY_ADMIN.RUBRIQUE.LIST} component={List} />
                <Route path={COMMUNITY_ADMIN.RUBRIQUE.CREATE} component={Create} />
            </Switch>
        </div>
    );
};

export default withRouter(PostProjectsManagement);
