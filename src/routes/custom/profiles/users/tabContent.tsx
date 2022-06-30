import React from 'react';
import Card from './tabs/card';
import Access from './tabs/access';
import { connect } from "react-redux";
import Personal from './tabs/personal';
import { PROFILE } from "Url/frontendUrl";
import Institutions from './tabs/institution';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROFILE.USER.PERSONAL} />
                <Route path={PROFILE.USER.ACCESS} component={Access} />
                <Route path={PROFILE.USER.CARD} component={Card} />
                <Route path={PROFILE.USER.PERSONAL} component={Personal} />
                <Route path={PROFILE.USER.INSTITUTION} component={Institutions} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));