import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { NETWORK } from 'Url/frontendUrl';
import Complementary from './tabs/complementary';
import Specialized from './tabs/specialized';
import {withRouter, Switch, Route} from "react-router-dom";

const Providers = () => {
    return (
        <div>
            <Switch>
                <Route path={NETWORK.COVERAGE.PARTNERSHIP.COMPLEMENTARY} component={Complementary} />
                <Route path={NETWORK.COVERAGE.PARTNERSHIP.PROVIDER_SPE} component={Specialized} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Providers)));