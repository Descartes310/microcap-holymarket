import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { PRODUCT } from "Url/frontendUrl";
import { connect } from "react-redux";
import ClassicSale from './marketplace/classicSale';
import PrivateSale from './marketplace/privateSale';
import FinancialSale from './marketplace/financialSale';
import MicrocapProduct from './marketplace/microcapSale';

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={PRODUCT.CLASSIC_SALES} />
                <Route path={PRODUCT.CLASSIC_SALES} component={ClassicSale} />
                <Route path={PRODUCT.PRIVATE_SALES} component={PrivateSale} />
                <Route path={PRODUCT.MICROCAP_PRODUCT} component={MicrocapProduct} />
                <Route path={PRODUCT.FINANCIAL_SALES} component={FinancialSale} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
