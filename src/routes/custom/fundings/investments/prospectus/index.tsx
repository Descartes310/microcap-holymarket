import React from 'react';
import List from './list';
import Create from './create';
import Details from './details';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FundingInvestmentProspectus = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.INVESTMENT.PROSPECTUS.LIST} />
                <Route path={FUNDING.INVESTMENT.PROSPECTUS.CREATE} component={Create} />
                <Route path={FUNDING.INVESTMENT.PROSPECTUS.LIST} component={List} />
                <Route path={FUNDING.INVESTMENT.PROSPECTUS.DETAILS} component={Details} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingInvestmentProspectus)));