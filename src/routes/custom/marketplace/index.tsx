import React from 'react';
import Shop from './shop';
import Cart from './cart';
import Orders from './orders';
import Sales from './orders/sales';
import Checkout from './checkout';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ShopProducts from './shop/markets';
import SubOrders from './orders/subOrders';
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Marketplace = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.SHOP.SELF} />
                <Route path={MARKETPLACE.SHOP_PRODUCTS} component={ShopProducts} />
                <Route path={MARKETPLACE.SHOP.SELF} component={Shop} />
                <Route path={MARKETPLACE.CART} component={Cart} />
                <Route path={MARKETPLACE.SALES} component={Sales} />
                <Route path={MARKETPLACE.SUB_ORDERS} component={SubOrders} />
                <Route path={MARKETPLACE.ORDERS} component={Orders} />
                <Route path={MARKETPLACE.CHECKOUT} component={Checkout} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Marketplace)));