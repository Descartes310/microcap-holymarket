import React from 'react';
import List from './self/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import ListConfig from './configuration/list';
import UpdateConfig from './configuration/update';
import CreateConfig from './configuration/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Payments = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.STORE.PAYMENT.LIST} />
                <Route path={MARKETPLACE.STORE.PAYMENT.CONFIGURATION.LIST} component={ListConfig} />
                <Route path={MARKETPLACE.STORE.PAYMENT.CONFIGURATION.UPDATE} component={UpdateConfig} />
                <Route path={MARKETPLACE.STORE.PAYMENT.CONFIGURATION.CREATE} component={CreateConfig} />
                <Route path={MARKETPLACE.STORE.PAYMENT.LIST} component={List} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Payments)));