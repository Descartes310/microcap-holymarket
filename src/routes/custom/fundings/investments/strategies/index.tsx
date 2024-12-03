import React from 'react';
import List from './list';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FundingInvestmentStrategies = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.INVESTMENT.STRATEGY.LIST} />
                <Route path={FUNDING.INVESTMENT.STRATEGY.CREATE} component={Create} />
                <Route path={FUNDING.INVESTMENT.STRATEGY.LIST} component={List} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingInvestmentStrategies)));