import React from 'react';
import Offers from './offers/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import Propositions from './propositions/list';
import Subscriptions from './subscriptions/list';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FundingBigdeal = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.BIGDEAL.SENT} />
                <Route path={FUNDING.BIGDEAL.SENT} component={Propositions} />
                <Route path={FUNDING.BIGDEAL.RECEIVED} component={Subscriptions} />
                <Route path={FUNDING.BIGDEAL.OFFER} component={Offers} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingBigdeal)));