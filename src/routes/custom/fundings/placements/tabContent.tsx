import React from 'react';
import Items from './items';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import Oportunities from './oportunities/list';
import StrategyList from '../investments/strategies/list';
import StrategyCreate from '../investments/strategies/create';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FundingPlacement = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.PLACEMENT.ITEM.SELF} />
                <Route path={FUNDING.PLACEMENT.STRATEGY.LIST} component={StrategyList} />
                <Route path={FUNDING.PLACEMENT.STRATEGY.CREATE} component={StrategyCreate} />
                <Route path={FUNDING.PLACEMENT.OPORTUNIY.SELF} component={Oportunities} />
                <Route path={FUNDING.PLACEMENT.ITEM.SELF} component={Items} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingPlacement)));