import React from 'react';
import List from './../List';
import Create from './../Create';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectsCallManagement = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.INITIALISATION.PROJECTS_CALL.LIST} />
                <Route path={PROJECTS.CONFIGURATION.INITIALISATION.PROJECTS_CALL.CREATE} children={(
                    <Create type={'APP'} />
                )} />
                <Route path={PROJECTS.CONFIGURATION.INITIALISATION.PROJECTS_CALL.LIST} children={(
                    <List type={'APP'} />
                )} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectsCallManagement);
