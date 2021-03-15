import React from 'react';
import { SETTINGS } from "Url/frontendUrl";
import List from './List';
import Create from './Create';
import MotivationList from './ListMotivation';
import CreateMotivation from './CreateMotivation';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const PostProjectsManagement = ({ match }) => {
    return (
        <div className="mx-4 full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={SETTINGS.POST.LIST} />
                <Route path={SETTINGS.POST.LIST} component={List} />
                <Route path={SETTINGS.POST.CREATE} component={Create} />
                <Route path={SETTINGS.POST.MOTIVATION.LIST} component={MotivationList} />
                <Route path={SETTINGS.POST.MOTIVATION.CREATE} component={CreateMotivation} />
            </Switch>
        </div>
    );
};

export default withRouter(PostProjectsManagement);
