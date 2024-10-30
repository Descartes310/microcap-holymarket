import React from 'react';
import List from './self/list';
import Create from './self/create';
import Update from './self/update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Requests from './self/requests';
import Members from './components/members';
import Products from './components/products';
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const DiscountModels = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.DISCOUNT_MODELS.LIST} />
                    <Route path={MARKETPLACE.DISCOUNT_MODELS.PRODUCTS} component={Products} />
                    <Route path={MARKETPLACE.DISCOUNT_MODELS.MEMBERS} component={Members} />
                    <Route path={MARKETPLACE.DISCOUNT_MODELS.UPDATE} component={Update} />
                    <Route path={MARKETPLACE.DISCOUNT_MODELS.CREATE} component={Create} />
                    <Route path={MARKETPLACE.DISCOUNT_MODELS.REQUEST} component={Requests} />
                    <Route path={MARKETPLACE.DISCOUNT_MODELS.LIST} component={List} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(DiscountModels)));