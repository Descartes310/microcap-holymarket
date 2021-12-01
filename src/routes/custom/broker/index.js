import React from 'react';
import Users from './users';
import Agencies from './agencies';
import Counters from './counters';
import Cashdesks from './cashdesks';
import { BROKER } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Broker = ({ match }) => {
    return (
        <div className="mx-sm-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROKER.AGENCIES.SELF} />
                <Route path={BROKER.AGENCIES.SELF} component={Agencies} />
                <Route path={BROKER.COUNTERS.SELF} component={Counters} />
                <Route path={BROKER.CASHDESKS.SELF} component={Cashdesks} />
                <Route path={BROKER.USERS.SELF} component={Users} />
            </Switch>
        </div>
    );
};

export default withRouter(Broker);
