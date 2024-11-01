import React from 'react';
import Shop from './shop';
import Cart from './cart';
import Store from './store';
import Orders from './orders';
import Sales from './orders/sales';
import Checkout from './checkout';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ShopProducts from './shop/products';
import SubOrders from './orders/subOrders';
import Market from './administration/markets';
import { MARKETPLACE } from 'Url/frontendUrl';
import Products from './administration/models';
import Catalogs from './administration/catalogs';
import bookings from './administration/bookings';
import Categories from './administration/categories';
import Commercial from './administration/commercials';
import DiscountModels from './administration/discountModels';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Marketplace = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.CATAlOG.SELF} />
                <Route path={MARKETPLACE.SHOP_PRODUCTS} component={ShopProducts} />
                <Route path={MARKETPLACE.SHOP.SELF} component={Shop} />
                <Route path={MARKETPLACE.CART} component={Cart} />
                <Route path={MARKETPLACE.SALES} component={Sales} />
                <Route path={MARKETPLACE.SUB_ORDERS} component={SubOrders} />
                <Route path={MARKETPLACE.ORDERS} component={Orders} />
                <Route path={MARKETPLACE.STORE.SELF} component={Store} />
                <Route path={MARKETPLACE.CHECKOUT} component={Checkout} />
                <Route path={MARKETPLACE.MARKET.SELF} component={Market} />
                <Route path={MARKETPLACE.MODEL.SELF} component={Products} />
                <Route path={MARKETPLACE.CATAlOG.SELF} component={Catalogs} />
                <Route path={MARKETPLACE.CATEGORY.SELF} component={Categories} />
                <Route path={MARKETPLACE.COMMERCIAL.SELF} component={Commercial} />
                <Route path={MARKETPLACE.DISCOUNT_MODELS.SELF} component={DiscountModels} />
                <Route path={MARKETPLACE.BOOKING.SELF} component={bookings} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Marketplace)));