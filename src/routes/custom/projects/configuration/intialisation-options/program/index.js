import React from 'react';
import List from './../List';
import Create from './../Create';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const ProgramManagement = ({ match }) => {
    return (
        <div className="">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.CONFIGURATION.INITIALISATION.PROGRAM.LIST} />
                <Route path={PROJECTS.CONFIGURATION.INITIALISATION.PROGRAM.CREATE} children={(
                    <Create type={'PROGRAM'} />
                )} />
                <Route path={PROJECTS.CONFIGURATION.INITIALISATION.PROGRAM.LIST} children={(
                    <List type={'PROGRAM'} />
                )} />
            </Switch>
        </div>
    );
};

export default withRouter(ProgramManagement);
