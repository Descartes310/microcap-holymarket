import React from 'react';
import List from './List';
import Show from './Show';
import Create from './Create';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FoldersManagement = ({ match }) => {
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.FOLDERS.LIST} />
                <Route path={PROJECTS.FOLDERS.LIST} component={List} />
                <Route path={PROJECTS.FOLDERS.CREATE} component={Create} />
                <Route path={PROJECTS.FOLDERS.SHOW} component={Show} />
            </Switch>
        </div>
    );
};

export default withRouter(FoldersManagement);
