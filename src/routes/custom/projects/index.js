import React from 'react';
import {PROJECTS} from "Url/frontendUrl";
import ProjectsManagementList from './self/List';
import ProjectsManagementCreate from './self/Create';
import ProjectConfiguration from './configuration';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Projects = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.SELF} />
                <Route path={PROJECTS.CONFIGURATION.SELF} component={ProjectConfiguration} />
                <Route path={PROJECTS.PROJECTS.LIST} component={ProjectsManagementList} />
                <Route path={PROJECTS.PROJECTS.CREATE} component={ProjectsManagementCreate} />
            </Switch>
        </div>
    );
};

export default withRouter(Projects);
