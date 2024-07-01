import React from 'react';

import { connect } from "react-redux";
import { PROFILE } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Assist from './assist';
import Creation from './createAccount';

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