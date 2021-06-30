/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {USERS} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';
import ListPermission from './user-permission/List';
import SingleProfile from './Profile';
import DisplayProfile from './DisplayProfile'
import UserShowProfile from './UserProfile'

// import Show from './Show';

class UserProfile extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={USERS.USERS_PROFILE.LIST} />
                        {/*<Route path={USERS.USERS_PROFILE.} component={Show} />*/}
                        <Route path={USERS.USERS_PROFILE.SHOW_PROFILE} component={UserShowProfile} />
                        <Route path={USERS.USERS_PROFILE.PROFILE} component={SingleProfile} />
                        <Route path={USERS.USERS_PROFILE.DISPLAY_PROFILE} component={DisplayProfile} />
                        <Route path={USERS.USERS_PROFILE.LIST} component={List} />
                        <Route path={USERS.USERS_PROFILE.USERS_PERMISSION.LIST} component={ListPermission} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(UserProfile)));
