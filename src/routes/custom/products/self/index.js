/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {PRODUCT} from "Url/frontendUrl";

import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import List from './List';
import ProductItemAvailable from './ProductItemAvailable';
import Account from './accounts';
import AccountShow from './accountShow';
import Order from './orders';
import OrderShow from './orderShow';

class Products extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PRODUCT.LIST} />
                        <Route path={PRODUCT.ORDERS_SHOW} component={OrderShow} />
                        <Route path={PRODUCT.ACCOUNT_DETAILS} component={AccountShow} />
                        <Route path={PRODUCT.SHOW} component={ProductItemAvailable} />
                        <Route path={PRODUCT.SHOW_ACCOUNT} component={Account} />
                        <Route path={PRODUCT.ORDERS} component={Order} />
                        <Route path={PRODUCT.LIST} component={List} />
                    </Switch>
                </>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Products)));
