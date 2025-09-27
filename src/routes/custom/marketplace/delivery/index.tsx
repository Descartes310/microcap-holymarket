import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Zone from './delivery-zones';
import { MARKETPLACE } from 'Url/frontendUrl';
import Administration from './administration';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Delivery = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.DELIVERY.SELF} />
                    <Route path={MARKETPLACE.DELIVERY.ADMINISTRATION.SELF} component={Administration} />
                    <Route path={MARKETPLACE.DELIVERY.ZONE.SELF} component={Zone} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Delivery)));