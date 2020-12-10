import React from 'react';
import List from './List';
import Create from './Create';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectWorks = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.WORKS.LIST} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.CREATE} component={Create} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.LIST} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectWorks);
