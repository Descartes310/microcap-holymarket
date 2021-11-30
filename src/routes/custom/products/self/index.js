/**
 * Employ Payroll
 */
import React, { Component } from 'react';
// intl messages
import {connect} from "react-redux";
import List from './List';
import Order from './orders';
import Account from './accounts';
import OrderShow from './orderShow';
import {injectIntl} from "react-intl";
import {PRODUCT} from "Url/frontendUrl";
import AccountShow from './accountShow';
import AccountLogs from './accountLogs';
import OperatorOrders from './ordersOperator';
import ProductDetails from './productDetails';
import UnapprovedOrders from './unapprovedOrders';
import UpdateAccount from './accounts/UpdateAccount';
import ProductItemAvailable from './ProductItemAvailable';
import UncompleteAccounts from './accounts/UncompleteAccounts';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

class Products extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="full-height">
                <>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={PRODUCT.LIST} />
                        <Route path={PRODUCT.UPDATE_UNCOMPLETE_ACCOUNTS} component={UpdateAccount} />
                        <Route path={PRODUCT.UNCOMPLETE_ACCOUNTS} component={UncompleteAccounts} />
                        <Route path={PRODUCT.ORDERS_SHOW} component={OrderShow} />
                        <Route path={PRODUCT.ACCOUNT_LOGS} component={AccountLogs} />
                        <Route path={PRODUCT.ACCOUNT_DETAILS} component={AccountShow} />
                        <Route path={PRODUCT.SHOW} component={ProductItemAvailable} />
                        <Route path={PRODUCT.SHOW_ACCOUNT} component={Account} />
                        <Route path={PRODUCT.DETAILS} component={ProductDetails} />
                        <Route path={PRODUCT.UNAPPROVED_ORDERS} component={UnapprovedOrders} />
                        <Route path={PRODUCT.OPERATOR_ORDERS} component={OperatorOrders} />
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
