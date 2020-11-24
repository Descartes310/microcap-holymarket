/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {SETTINGS} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';
import Create from './Create';

class Notifications extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={SETTINGS.NOTIFICATION.SERVICE.LIST} />
                        <Route path={SETTINGS.NOTIFICATION.SERVICE.LIST} component={List} />
                        <Route path={SETTINGS.NOTIFICATION.SERVICE.CREATE} component={Create} />
                        {/*<CanRoute
                            path={USERS.USERS.CREATE}
                            component={Create}
                            permissions={[Permission.users.createOne.name]}
                        />*/}
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(Notifications)));
