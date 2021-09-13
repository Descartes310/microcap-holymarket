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
                <Redirect exact from={`${match.url}/`} to={PROJECTS.FOLDERS.WORKS.LIST} />
                <Route path={PROJECTS.FOLDERS.WORKS.CREATE} component={Create} />
                <Route path={PROJECTS.FOLDERS.WORKS.UPDATE} component={Update} />
                <Route path={PROJECTS.FOLDERS.WORKS.LIST} component={List} />
            </Switch>
        </div>
    );
};

export default withRouter(ProjectWorks);
