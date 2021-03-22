import Show from './Show';
import Update from './Update';
import React, { Component } from 'react';
import { COMMUNITY } from "Url/frontendUrl";
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";


const FoldersManagement = ({ match }) => {

    return (
        <div className="list-wrap">
            <Scrollbars
                className="rct-scroll"
                autoHide
                style={{ height: 'calc(100vh - 128px)', position: 'unset', padding: 24 }}
            >
                <React.Fragment>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={COMMUNITY.PROJECTS.SHOW} />
                        <Route path={COMMUNITY.PROJECTS.SHOW} component={Show} />
                        <Route path={COMMUNITY.PROJECTS.UPDATE} component={Update} />
                    </Switch>
                </React.Fragment>
            </Scrollbars>
        </div>
    );
}


export default withRouter(FoldersManagement);
