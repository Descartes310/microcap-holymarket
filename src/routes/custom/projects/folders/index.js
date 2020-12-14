import React from 'react';
import List from './List';
import Create from './Create';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FoldersManagement = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.FOLDERS.LIST} />
                <Route path={PROJECTS.FOLDERS.LIST} component={List} />
                <Route path={PROJECTS.FOLDERS.CREATE} component={Create} />
            </Switch>
        </div>
    );
};

export default withRouter(FoldersManagement);
