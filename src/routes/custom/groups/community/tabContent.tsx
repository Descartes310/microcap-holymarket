import React from 'react';
import All from './tabs/all';
import Mines from './tabs/mine';
import Request from './tabs/request';
import { connect } from "react-redux";
import { GROUP } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.COMMUNITY.MINE} />
                <Route path={GROUP.COMMUNITY.MINE} component={Mines} />
                <Route path={GROUP.COMMUNITY.ALL} component={All} />
                <Route path={GROUP.COMMUNITY.REQUEST} component={Request} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
