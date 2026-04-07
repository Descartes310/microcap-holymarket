import React from 'react';
import MarketSale from './markets';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from "Url/frontendUrl";
import { Redirect, Route, Switch } from 'react-router-dom';

const ShopTabContent = ({ match }) => {
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.SHOP.HOLYMARKET.MARKETS} />
                <Route path={MARKETPLACE.SHOP.HOLYMARKET.MARKETS} component={MarketSale} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(ShopTabContent));