import Pass from './Pass';
import Project from './Project';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { MICROCAP360 } from "Url/frontendUrl";
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const Microcap = ({ match }) => {
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MICROCAP360.MY.PROJECT} />
                <Route path={MICROCAP360.MY.PROJECT} component={Project} />
                <Route path={MICROCAP360.MY.PASS} component={Pass} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(Microcap));
