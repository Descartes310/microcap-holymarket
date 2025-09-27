import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import PendingProductsList from './pending-products/list';
import ParcelsList from './parcels/list';
import DeliveriesList from './deliveries/list';

const DeliveryAdministration = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={MARKETPLACE.DELIVERY.ADMINISTRATION.PENDING_PRODUCTS} />
                <Route path={MARKETPLACE.DELIVERY.ADMINISTRATION.PENDING_PRODUCTS} component={PendingProductsList} />
                <Route path={MARKETPLACE.DELIVERY.ADMINISTRATION.PARCELS} component={ParcelsList} />
                <Route path={MARKETPLACE.DELIVERY.ADMINISTRATION.DELIVERIES} component={DeliveriesList} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(DeliveryAdministration)));