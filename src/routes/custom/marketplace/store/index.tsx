import React from 'react';
import Orders from './orders';
import Products from './products';
import Purchases from './purchases';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Store = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.STORE.PRODUCT.SELF} />
                    <Route path={MARKETPLACE.STORE.ORDER.SELF} component={Orders} />
                    <Route path={MARKETPLACE.STORE.PRODUCT.SELF} component={Products} />
                    <Route path={MARKETPLACE.STORE.PURCHASE.SELF} component={Purchases} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Store)));