/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {COMMUNITY_ADMIN} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './list/index';
import ListCharging from './list/charging';
import MemberList from './members/index';
import Invitations from './members/index';


class GroupAdminIndex extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className="mx-4">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={COMMUNITY_ADMIN.VOUCHER.PAYMENT} />
                        <Route path={COMMUNITY_ADMIN.VOUCHER.PAYMENT} component={List} />
                        <Route path={COMMUNITY_ADMIN.VOUCHER.CHARCHING} component={ListCharging} />
                        <Route path={COMMUNITY_ADMIN.MEMBERS.LIST} component={MemberList} />
                        <Route path={COMMUNITY_ADMIN.INVITATIONS.SELF} component={Invitations} />
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

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupAdminIndex)));