import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Operators from './tabs/operator';
import Brokers from './tabs/broker';
import { NETWORK } from 'Url/frontendUrl';
import Communities from './tabs/community';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Catalogs = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.PARTNERSHIP.COMMUNITY} />
                    <Route path={NETWORK.COVERAGE.PARTNERSHIP.COMMUNITY} component={Communities} />
                    <Route path={NETWORK.COVERAGE.PARTNERSHIP.OPERATOR} component={Operators} />
                    <Route path={NETWORK.COVERAGE.PARTNERSHIP.BROKER} component={Brokers} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Catalogs)));