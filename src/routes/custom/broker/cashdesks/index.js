import React from 'react';
import List from './List';
import Users from './Users';
import Create from './Create';
import Mouvements from './Mouvements';
import { BROKER } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BrokerAgency = ({ match }) => {
    return (
        <div className="mx-sm-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROKER.CASHDESKS.LIST} />
                <Route path={BROKER.CASHDESKS.CREATE} component={Create} />
                <Route path={BROKER.CASHDESKS.MOUVEMENTS} component={Mouvements} />
                <Route path={BROKER.CASHDESKS.USERS} component={Users} />
                <Route path={BROKER.CASHDESKS.LIST} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(BrokerAgency);
