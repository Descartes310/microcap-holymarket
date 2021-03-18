import React from 'react';
import List from './List';
import ListIdeas from './ListIdeas';
import Create from './Create';
import { connect } from "react-redux";
import {PROJECTS} from "Url/frontendUrl";
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.FOLDERS.PROJECTS.LIST} />
                <Route path={PROJECTS.FOLDERS.PROJECTS.LIST} component={List} />
                <Route path={PROJECTS.FOLDERS.PROJECTS.IDEAS} component={ListIdeas} />
                <Route path={PROJECTS.FOLDERS.PROJECTS.CREATE_IDEAS} component={Create} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
