import React from 'react';
import List from './List';
import Create from './Create';
import Configuration from './configuration';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectStandard = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.STANDARD.LIST} />
                <Route path={PROJECTS.CONFIGURATION.STANDARD.CREATE} component={Create} />
                <Route path={PROJECTS.CONFIGURATION.STANDARD.LIST} component={List} />
                <Route path={PROJECTS.CONFIGURATION.STANDARD.CONFIGURATION} component={Configuration} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectStandard);
