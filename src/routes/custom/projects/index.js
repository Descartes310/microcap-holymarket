import React from 'react';
import {PROJECTS} from "Url/frontendUrl";
import ProjectsManagementList from './self/List';
import ProjectsManagementCreate from './self/Create';
import ProjectConfiguration from './configuration';
import FoldersManagement from './folders';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import CanRoute from "Components/CanRoute";
import Permissions from "Enums/Permissions";

const Projects = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.SELF} />
                <Route path={PROJECTS.CONFIGURATION.SELF} component={ProjectConfiguration} />
                <Route path={PROJECTS.PROJECTS.LIST} component={ProjectsManagementList} />
                <Route path={PROJECTS.PROJECTS.CREATE} component={ProjectsManagementCreate} />
                <CanRoute
                    // permissions={[Permissions.projects.folders.viewList, Permissions.projects.folders.createOne]}
                    path={PROJECTS.FOLDERS.SELF}
                    component={FoldersManagement}
                />
            </Switch>
        </div>
    );
};

export default withRouter(Projects);
