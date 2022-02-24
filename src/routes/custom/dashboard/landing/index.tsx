import React from 'react';
import Home from './discover/home';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { LANDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Landing = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={LANDING.HOME} />
                    <Route path={LANDING.HOME} component={Home} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Landing)));