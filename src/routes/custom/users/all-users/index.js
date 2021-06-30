import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {USERS} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';

class UsersAccounts extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={USERS.ACCOUNTS.ALL} />
                        <Route path={USERS.ACCOUNTS.ALL} component={List} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(UsersAccounts)));
