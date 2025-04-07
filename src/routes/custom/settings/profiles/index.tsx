import React from 'react';
import Update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { SETTING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Profiles = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={SETTING.PROFILE.UPDATE} />
                    <Route path={SETTING.PROFILE.UPDATE} component={Update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Profiles)));