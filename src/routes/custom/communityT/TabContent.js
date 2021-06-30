import React from 'react';
import Groups from "./groups";
import AllGroups from "./all-groups";
import { connect } from "react-redux";
import { COMMUNITY_MEMBER } from "Url/frontendUrl";
import { Scrollbars } from 'react-custom-scrollbars';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const TabContent = ({ match }) => {
    return (
        <div className="list-wrap">
            <Scrollbars
                className="rct-scroll"
                autoHide
                style={{ height: 'calc(100vh - 128px)' }}
            >
                <React.Fragment>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={COMMUNITY_MEMBER.GROUPS.ME} />
                        <Route path={COMMUNITY_MEMBER.GROUPS.ME} component={Groups} />
                        <Route path={COMMUNITY_MEMBER.GROUPS.LIST} component={AllGroups} />
                        {/* <Route path={COMMUNITY_MEMBER.INVITATIONS.SELF} component={Invitations} /> */}
                    </Switch>
                </React.Fragment>
            </Scrollbars>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
