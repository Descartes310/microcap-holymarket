import React from 'react';
import List from './List';
import Create from './Create';
import Mouvements from './Mouvements';
import { BROKER } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BrokerAgency = ({ match }) => {
    return (
        <div className="mx-sm-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROKER.COUNTERS.LIST} />
                <Route path={BROKER.COUNTERS.CREATE} component={Create} />
                <Route path={BROKER.COUNTERS.MOUVEMENTS} component={Mouvements} />
                <Route path={BROKER.COUNTERS.LIST} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(BrokerAgency);
