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
import Create from './Create';
import PersonalSpace from './personnal-space/index';
import Permission from "Enums/Permissions.tsx";
import CanRoute from "Components/CanRoute";

class Users extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={USERS.USERS.LIST} />
                        {/*<Route path={USERS.USERS_PROFILE.} component={Show} />*/}
                        <Route path={USERS.USERS.PERSONNAL_SPACE} component={PersonalSpace} />
                        <Route path={USERS.USERS.LIST} component={List} />
                        <CanRoute
                            path={USERS.USERS.CREATE}
                            component={Create}
                            permissions={[Permission.users.createOne.name]}
                        />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(Users)));
