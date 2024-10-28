import React from 'react';
import List from './list/list';
import Create from './list/create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Received from './received/list';
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Distributions = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.STORE.DISTRIBUTION.LIST} />
                <Route path={MARKETPLACE.STORE.DISTRIBUTION.LIST} component={List} />
                <Route path={MARKETPLACE.STORE.DISTRIBUTION.CREATE} component={Create} />
                <Route path={MARKETPLACE.STORE.DISTRIBUTION.RECEIVED} component={Received} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Distributions)));