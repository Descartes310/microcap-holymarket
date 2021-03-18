/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {COMMUNITY} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import Show from './Show';
import Update from './Update';


class GroupProjectIndex extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={COMMUNITY.PROJECTS.SHOW} />
                        <Route path={COMMUNITY.PROJECTS.SHOW} component={Show} />
                        <Route path={COMMUNITY.PROJECTS.UPDATE} component={Update} />
                    </Switch>
                </>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupProjectIndex)));