import React from 'react';
import Roles from './roles';
import Members from './members';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const GroupAdministration = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.MEMBER.SELF} />
                    <Route path={GROUP.ADMINISTRATION.MEMBER.SELF} component={Members} />
                    <Route path={GROUP.ADMINISTRATION.ROLE.SELF} component={Roles} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(GroupAdministration)));