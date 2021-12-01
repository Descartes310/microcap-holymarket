import React from 'react';
import List from './List';
import { BROKER } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BrokerUsers = ({ match }) => {
    return (
        <div className="mx-sm-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROKER.USERS.LIST} />
                <Route path={BROKER.USERS.LIST} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(BrokerUsers);
