import React from 'react';
import Clan from './clans';
import Space from './space'
import Management from './management';
import { connect } from "react-redux";
import { GROUP } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const Community = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.COMMUNITY.SPACE.SELF} />
                <Route path={GROUP.COMMUNITY.SPACE.SELF} component={Space} />
                <Route path={GROUP.COMMUNITY.CLAN.SELF} component={Clan} />
                <Route path={GROUP.COMMUNITY.MANAGEMENT.SELF} component={Management} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(Community));