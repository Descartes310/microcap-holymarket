import React from 'react';
import List from './List';
import Show from './Show';
import Works from './works';
import Update from './Update';
import Create from './Create';
import { connect } from "react-redux";
import {PROJECTS} from "Url/frontendUrl";
import ReactionList from './reactions/List';
import ReactionCreate from './reactions/Create';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.FOLDERS.LIST} />
                <Route path={PROJECTS.FOLDERS.LIST} component={List} />
                <Route path={PROJECTS.FOLDERS.WORKS.SELF} component={Works} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
