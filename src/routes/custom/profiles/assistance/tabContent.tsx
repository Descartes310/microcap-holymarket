import React from 'react';
import Assist from './assist';
import { connect } from "react-redux";
import Creation from './createAccount';
import { PROFILE } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROFILE.ASSISTANCE.USER} />
                <Route path={PROFILE.ASSISTANCE.USER} component={Assist} />
                <Route path={PROFILE.ASSISTANCE.CREATE_ACCOUNT} component={Creation} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));