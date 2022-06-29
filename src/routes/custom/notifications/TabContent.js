import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { NOTIFICATIONS } from "Url/frontendUrl";
import { connect } from "react-redux";
import Unread from './tabs/unread';
import Read from './tabs/read';
import Treated from './tabs/treated';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={NOTIFICATIONS.LIST} />
                <Route path={NOTIFICATIONS.LIST} component={Unread} />
                <Route path={NOTIFICATIONS.READ} component={Read} />
                <Route path={NOTIFICATIONS.TREATED} component={Treated} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
