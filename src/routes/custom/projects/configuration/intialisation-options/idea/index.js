import React from 'react';
import List from './../List';
import Create from './../Create';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const IdeaManagement = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.INITIALISATION.IDEA.LIST} />
                <Route path={PROJECTS.CONFIGURATION.INITIALISATION.IDEA.CREATE} children={(
                    <Create type={'IDEA'} />
                )} />
                <Route path={PROJECTS.CONFIGURATION.INITIALISATION.IDEA.LIST} children={(
                    <List type={'IDEA'} />
                )} />
            </Switch>
        </div>
    );
};

export default withRouter(IdeaManagement);
