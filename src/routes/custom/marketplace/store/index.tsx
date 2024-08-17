import React from 'react';
import Orders from './orders';
import Options from './options';
import Tickets from './tickets';
import Products from './products';
import Discounts from './discounts';
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
                    <Route path={MARKETPLACE.STORE.OPTION.SELF} component={Options} />
                    <Route path={MARKETPLACE.STORE.TICKET.SELF} component={Tickets} />
                    <Route path={MARKETPLACE.STORE.DISCOUNT.SELF} component={Discounts} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Store)));