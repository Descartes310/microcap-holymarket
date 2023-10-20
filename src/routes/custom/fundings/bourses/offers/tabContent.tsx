import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import MineOffers from './mines/list';
import CreateOffer from './mines/create';
import { FUNDING } from 'Url/frontendUrl';
import NetworkOffers from './networks/list'; 
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BourseOffer = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.BOURSE.OFFER.MINE} />
                <Route path={FUNDING.BOURSE.OFFER.CREATE_MINE} component={CreateOffer} />
                <Route path={FUNDING.BOURSE.OFFER.MINE} component={MineOffers} />
                <Route path={FUNDING.BOURSE.OFFER.LIST} component={NetworkOffers} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BourseOffer)));