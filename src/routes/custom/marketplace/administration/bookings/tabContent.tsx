import React from 'react';
import List from './self/list';
import Create from './self/create';
import Update from './self/update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Bookings = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.BOOKING.LIST} />
                    <Route path={MARKETPLACE.BOOKING.UPDATE} component={Update} />
                    <Route path={MARKETPLACE.BOOKING.CREATE} component={Create} />
                    <Route path={MARKETPLACE.BOOKING.LIST} component={List} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Bookings)));