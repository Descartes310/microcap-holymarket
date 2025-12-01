import React from 'react';
import Standard from './create';
import { connect } from "react-redux";
import { BANK } from "Url/frontendUrl";
import Regularisation from "./regularisationAssistance";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.OPERATION.CREATE.STANDARD} />
                <Route path={BANK.OPERATION.CREATE.STANDARD} component={Standard} />
                <Route path={BANK.OPERATION.CREATE.REGULARISATION} component={Regularisation} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));