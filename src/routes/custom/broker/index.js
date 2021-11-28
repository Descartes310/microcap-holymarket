import React from 'react';
import Agency from './agencies';
import { BROKER } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Broker = ({ match }) => {
    return (
        <div className="mx-sm-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROKER.AGENCIES.SELF} />
                <Route path={BROKER.AGENCIES.SELF} component={Agency} />
            </Switch>
        </div>
    );
};

export default withRouter(Broker);
