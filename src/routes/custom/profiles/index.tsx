import React from 'react';
import Users from './users';
import {connect} from "react-redux";
import Assistance from './assistance';
import {injectIntl} from "react-intl";
import { PROFILE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Profiles = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={PROFILE.USER.SELF} />
                    <Route path={PROFILE.USER.SELF} component={Users} />
                    <Route path={PROFILE.ASSISTANCE.SELF} component={Assistance} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Profiles)));