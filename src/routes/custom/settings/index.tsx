import React from 'react';
import Units from './units';
import UserFiles from './user-files';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { SETTING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Setting = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={SETTING.UNIT.SELF} />
                <Route path={SETTING.UNIT.SELF} component={Units} />
                <Route path={SETTING.USER_FILE.SELF} component={UserFiles} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Setting)));