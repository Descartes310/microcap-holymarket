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
import PostList from './postes/index';
import Project from './projet/Create';
import RubriqueList from './rubriques/index';
import { Scrollbars } from 'react-custom-scrollbars';


class GroupAdminIndex extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className="list-wrap">
            <Scrollbars
                className="rct-scroll"
                autoHide
                style={{ height: 'calc(100vh - 128px)', position: 'unset', padding: 24 }}
            >
                <React.Fragment>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={COMMUNITY_ADMIN.VOUCHER.PAYMENT} />
                        <Route path={COMMUNITY_ADMIN.VOUCHER.PAYMENT} component={List} />
                        <Route path={COMMUNITY_ADMIN.VOUCHER.CHARCHING} component={ListCharging} />
                        <Route path={COMMUNITY_ADMIN.MEMBERS.LIST} component={MemberList} />
                        <Route path={COMMUNITY_ADMIN.POST.SELF} component={PostList} />
                        <Route path={COMMUNITY_ADMIN.PROJECT.CREATE} component={Project} />
                        <Route path={COMMUNITY_ADMIN.RUBRIQUE.SELF} component={RubriqueList} />
                        <Route path={COMMUNITY_ADMIN.INVITATIONS.SELF} component={Invitations} />
                    </Switch>
                </React.Fragment>
            </Scrollbars>
        </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupAdminIndex)));