import React from 'react';
import { COMMUNITY_ADMIN } from "Url/frontendUrl";
import List from './List';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const Supervision = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={COMMUNITY_ADMIN.OPERATOR.SUPERVISION.COMMUNITIES} />
                <Route path={COMMUNITY_ADMIN.OPERATOR.SUPERVISION.COMMUNITIES} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(Supervision);
