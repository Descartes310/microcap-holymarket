import React from 'react';
import Politics from './politics';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Strategies from './strategies';
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FundingInvestment = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.INVESTMENT.SELF} />
                <Route path={FUNDING.INVESTMENT.STRATEGY.SELF} component={Strategies} />
                <Route path={FUNDING.INVESTMENT.POLITIC.SELF} component={Politics} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingInvestment)));