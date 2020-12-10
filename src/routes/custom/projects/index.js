import React from 'react';
import {PROJECTS} from "Url/frontendUrl";
import ProjectConfiguration from './configuration';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Projects = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.SELF} />
                <Route path={PROJECTS.CONFIGURATION.SELF} component={ProjectConfiguration} />
            </Switch>
        </div>
    );
};

export default withRouter(Projects);
