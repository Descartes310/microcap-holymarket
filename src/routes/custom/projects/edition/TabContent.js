import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {PROJECTS} from "Url/frontendUrl";
import {connect} from "react-redux";
import Article from "./article";
import Illustration from "./illustration";

const TabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                {/* <Redirect exact from={`${match.url}/`} to={PROJECTS.PROJECTS.EDITION.SELF} /> */}
                <Route path={PROJECTS.PROJECTS.EDITION.ARTICLE} component={Article} />
                <Route path={PROJECTS.PROJECTS.EDITION.ILLUSTRATION} component={Illustration} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
