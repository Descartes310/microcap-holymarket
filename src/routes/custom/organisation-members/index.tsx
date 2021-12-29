import List from './List';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import React from 'react';
import { ORGANISATIONS } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import Profiles from './profiles';

const OrganisationMembers = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={ORGANISATIONS.USERS.LIST} />
                    <Route path={ORGANISATIONS.USERS.LIST} component={List} />
                    <Route path={ORGANISATIONS.PROFILES.SELF} component={Profiles} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(OrganisationMembers)));
