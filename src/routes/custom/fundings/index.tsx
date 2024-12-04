import React from 'react';
import Deals from './deals';
import Bonds from './bonds';
import Bourses from './bourses';
import Accounts from './accounts';
import BigDeals from './bigdeals';
import {connect} from "react-redux";
import Placements from './placements';
import {injectIntl} from "react-intl";
import Investments from './investments';
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Funding = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={FUNDING.ACCOUNT.SELF} />
                    <Route path={FUNDING.ACCOUNT.SELF} component={Accounts} />
                    <Route path={FUNDING.BOURSE.SELF} component={Bourses} />
                    <Route path={FUNDING.BOND.SELF} component={Bonds} />
                    <Route path={FUNDING.INVESTMENT.SELF} component={Investments} />
                    <Route path={FUNDING.BOURSE.DEALS.SELF} component={Deals} />
                    <Route path={FUNDING.BIGDEAL.SELF} component={BigDeals} />
                    <Route path={FUNDING.PLACEMENT.SELF} component={Placements} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Funding)));