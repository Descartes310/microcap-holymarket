import React from 'react';
import List from './List';
import Create from './Create';
import Update from './Update';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectWorks = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.WORKS.SIMPLE.LIST} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.SIMPLE.LIST} component={List} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.SIMPLE.CREATE} component={Create} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.SIMPLE.UPDATE} component={Update} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectWorks);
