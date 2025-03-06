import React from 'react';
import List from './list';
import Create from './create';
import Details from './details';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FundingInvestmentPrograms = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.INVESTMENT.PROGRAM.LIST} />
                <Route path={FUNDING.INVESTMENT.PROGRAM.CREATE} component={Create} />
                <Route path={FUNDING.INVESTMENT.PROGRAM.LIST} component={List} />
                <Route path={FUNDING.INVESTMENT.PROGRAM.DETAILS} component={Details} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingInvestmentPrograms)));