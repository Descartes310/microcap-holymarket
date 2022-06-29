import React from 'react';
import Dashboard from './dashboard';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MIPRO } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Home = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MIPRO.HOME.DASHBOARD} />
                <Route path={MIPRO.HOME.DASHBOARD} component={Dashboard} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Home)));