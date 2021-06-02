import List from './list/index';
import {connect} from "react-redux";
import PostList from './postes/index';
import Project from './projet/Create';
import {injectIntl} from "react-intl";
import React, { Component } from 'react';
import MemberList from './members/index';
import Invitations from './members/index';
import ListCharging from './list/charging';
import OperatorList from './operator/index';
import RubriqueList from './rubriques/index';
import {COMMUNITY_ADMIN} from "Url/frontendUrl";
import { Scrollbars } from 'react-custom-scrollbars';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

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
                    <div className="rct-scroll pt-70 mt-2">
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={COMMUNITY_ADMIN.VOUCHER.PAYMENT} />
                            <Route path={COMMUNITY_ADMIN.VOUCHER.PAYMENT} component={List} />
                            <Route path={COMMUNITY_ADMIN.VOUCHER.CHARCHING} component={ListCharging} />
                            <Route path={COMMUNITY_ADMIN.MEMBERS.LIST} component={MemberList} />
                            <Route path={COMMUNITY_ADMIN.POST.SELF} component={PostList} />
                            <Route path={COMMUNITY_ADMIN.PROJECT.CREATE} component={Project} />
                            <Route path={COMMUNITY_ADMIN.RUBRIQUE.SELF} component={RubriqueList} />
                            <Route path={COMMUNITY_ADMIN.OPERATOR.SELF} component={OperatorList} />
                            <Route path={COMMUNITY_ADMIN.INVITATIONS.SELF} component={Invitations} />
                        </Switch>
                    </div>
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
