import React from 'react';
import List from './List';
import Create from './Create';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectStandardPresentation = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.LIST} />
                <Route path={PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.CREATE} component={Create} />
                <Route path={PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.LIST} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectStandardPresentation);
