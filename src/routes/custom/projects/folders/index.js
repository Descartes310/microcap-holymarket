import React from 'react';
import List from './projects';
import ReactionList from './reactions/List';
import ReactionCreate from './reactions/Create';
import Show from './Show';
import Gallery from './Gallery';
import Update from './Update';
import Create from './Create';
import Works from './works';
import Work from './Work';
import {PROJECTS} from "Url/frontendUrl";
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FoldersManagement = ({ match }) => {
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PROJECTS.FOLDERS.PROJECTS.SELF} />
                <Route path={PROJECTS.FOLDERS.PROJECTS.SELF} component={List} />
                <Route path={PROJECTS.FOLDERS.WORKS.SELF} component={Works} />
                <Route path={PROJECTS.FOLDERS.REACTIONS.LIST} component={ReactionList} />
                <Route path={PROJECTS.FOLDERS.REACTIONS.CREATE} component={ReactionCreate} />
                <Route path={PROJECTS.FOLDERS.CREATE} component={Create} />
                <Route path={PROJECTS.FOLDERS.UPDATE} component={Update} />
                <Route path={PROJECTS.FOLDERS.WORK} component={Work} />
                <Route path={PROJECTS.FOLDERS.GALLERY} component={Gallery} />
                <Route path={PROJECTS.FOLDERS.SHOW} component={Show} />
            </Switch>
        </div>
    );
};

export default withRouter(FoldersManagement);
