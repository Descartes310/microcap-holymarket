import React from 'react';
import Markets from "./markets";
import Products from "./products";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Categories from "./categories";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const HolyMarket = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.SHOP.HOLYMARKET.CATEGORIES} />
                <Route path={MARKETPLACE.SHOP.HOLYMARKET.PRODUCTS} component={Products} />
                <Route path={MARKETPLACE.SHOP.HOLYMARKET.MARKETS} component={Markets} />
                <Route path={MARKETPLACE.SHOP.HOLYMARKET.CATEGORIES} component={Categories} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(HolyMarket)));