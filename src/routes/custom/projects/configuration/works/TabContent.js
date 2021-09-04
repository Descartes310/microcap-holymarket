import React from 'react';
import Simple from './simple';
import Complex from './complex';
import { connect } from "react-redux";
import { PROJECTS } from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.WORKS.SIMPLE.LIST} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.SIMPLE.SELF} component={Simple} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.COMPLEX.SELF} component={Complex} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
