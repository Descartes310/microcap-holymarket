import React from 'react';
import Home from './home';
import Goals from './goals';
import {connect} from "react-redux";
import Previsions from './previsions';
import {injectIntl} from "react-intl";
import { MIPRO } from 'Url/frontendUrl';
import Admininistration from './administration';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Prevision = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MIPRO.HOME.SELF} />
                    <Route path={MIPRO.HOME.SELF} component={Home} />
                    <Route path={MIPRO.GOAL.SELF} component={Goals} />
                    <Route path={MIPRO.PREVISION.SELF} component={Previsions} />
                    <Route path={MIPRO.ADMINISTRATION.SELF} component={Admininistration} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Prevision)));