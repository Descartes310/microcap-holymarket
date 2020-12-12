import React from 'react';
import {PROJECTS} from "Url/frontendUrl";
import List from './List';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectsManagement = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.PROJECTS.LIST} />
                <Route path={PROJECTS.PROJECTS.LIST} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectsManagement);
