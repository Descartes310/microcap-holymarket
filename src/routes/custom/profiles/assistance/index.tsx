import React from 'react';
import Assist from './assist';
import { connect } from "react-redux";
import { PROFILE } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const UserAssistance = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROFILE.ASSISTANCE.USER} />
                <Route path={PROFILE.ASSISTANCE.USER} component={Assist} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(UserAssistance));