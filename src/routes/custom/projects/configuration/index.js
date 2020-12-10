import React from 'react';
import ProjectWorks from './works';
import ProjectStandard from './standard';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProjectConfiguration = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.WORKS.SELF} />
                <Route path={PROJECTS.CONFIGURATION.WORKS.SELF} component={ProjectWorks} />
                <Route path={PROJECTS.CONFIGURATION.STANDARD.SELF} component={ProjectStandard} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectConfiguration);
