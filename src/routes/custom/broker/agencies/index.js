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
                <Redirect exact from={`${match.url}/`} to={BROKER.AGENCIES.LIST} />
                <Route path={BROKER.AGENCIES.LIST} component={List} />
                <Route path={BROKER.AGENCIES.CREATE} component={Create} />
                <Route path={BROKER.AGENCIES.MOUVEMENTS} component={Mouvements} />
            </Switch>
        </div>
    );
};

export default withRouter(BrokerAgency);
