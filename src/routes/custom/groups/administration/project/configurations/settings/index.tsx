import React from 'react';
import settings from './settings';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Settings = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.SETTING.SETTING} />
                    <Route path={GROUP.ADMINISTRATION.PROJECT.CONFIGURATION.SETTING.SETTING} component={settings} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Settings)));