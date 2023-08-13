import React from 'react';
import { connect } from 'react-redux';
import MarketSale from './tabs/market-sale';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from "Url/frontendUrl";
import PrivateSale from './tabs/private-sale';
import ClassicSale from './tabs/classic-sale';
import FinancialSale from './tabs/financial-sale';
import { Redirect, Route, Switch } from 'react-router-dom';

const ShopTabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.SHOP.CLASSIC} />
                <Route path={MARKETPLACE.SHOP.CLASSIC} component={ClassicSale} />
                <Route path={MARKETPLACE.SHOP.PRIVATE} component={PrivateSale} />
                <Route path={MARKETPLACE.SHOP.FINANCIAL} component={FinancialSale} />
                <Route path={MARKETPLACE.SHOP.MARKETS} component={MarketSale} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(ShopTabContent));