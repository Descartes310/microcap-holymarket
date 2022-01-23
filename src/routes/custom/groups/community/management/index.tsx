import React from 'react';
import Create from './create';
import { connect } from "react-redux";
import { GROUP } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const Management = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.COMMUNITY.MANAGEMENT.CREATE} />
                <Route path={GROUP.COMMUNITY.MANAGEMENT.CREATE} component={Create} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(Management));