import React from 'react';
import { COMMUNITY_ADMIN } from "Url/frontendUrl";
import List from './List';
import Supervision from './supervision/index';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const OperatorList = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={COMMUNITY_ADMIN.OPERATOR.LIST} />
                <Route path={COMMUNITY_ADMIN.OPERATOR.LIST} component={List} />
                <Route path={COMMUNITY_ADMIN.OPERATOR.SUPERVISION.SELF} component={Supervision} />
            </Switch>
        </div>
    );
};

export default withRouter(OperatorList);
