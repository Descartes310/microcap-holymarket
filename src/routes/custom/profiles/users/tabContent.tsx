import React from 'react';
import Card from './tabs/card';
import Access from './tabs/access';
import { connect } from "react-redux";
import Contact from './tabs/contacts';
import Personal from './tabs/personal';
import { PROFILE } from "Url/frontendUrl";
import Institutions from './tabs/institution';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import accounts from './tabs/accounts';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROFILE.USER.PERSONAL} />
                <Route path={PROFILE.USER.ACCESS} component={Access} />
                <Route path={PROFILE.USER.CARD} component={Card} />
                <Route path={PROFILE.USER.CONTACT} component={Contact} />
                <Route path={PROFILE.USER.PERSONAL} component={Personal} />
                <Route path={PROFILE.USER.ACCOUNTS} component={accounts} />
                <Route path={PROFILE.USER.INSTITUTION} component={Institutions} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));