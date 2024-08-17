import React from 'react';
import List from './self/list';
import Create from './self/create';
import Update from './self/update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Product from './components/products';
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Discounts = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.STORE.DISCOUNT.LIST} />
                    <Route path={MARKETPLACE.STORE.DISCOUNT.PRODUCTS} component={Product} />
                    <Route path={MARKETPLACE.STORE.DISCOUNT.UPDATE} component={Update} />
                    <Route path={MARKETPLACE.STORE.DISCOUNT.CREATE} component={Create} />
                    <Route path={MARKETPLACE.STORE.DISCOUNT.LIST} component={List} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Discounts)));