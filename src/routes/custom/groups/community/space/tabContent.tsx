import React from 'react';
import All from './tabs/all';
import Mines from './tabs/mine';
import Chat from './tabs/chat';
import Request from './tabs/request';
import { connect } from "react-redux";
import { GROUP } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.COMMUNITY.SPACE.MINE} />
                <Route path={GROUP.COMMUNITY.SPACE.ALL} component={All} />
                <Route path={GROUP.COMMUNITY.SPACE.MINE} component={Mines} />
                <Route path={GROUP.COMMUNITY.SPACE.MESSAGE} component={Chat} />
                <Route path={GROUP.COMMUNITY.SPACE.REQUEST} component={Request} />
                {/* <Route path={GROUP.COMMUNITY.SPACE.PENDING} component={Request} /> */}
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
