import React from 'react';
import List from './list';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import Structures from 'Routes/custom/groups/administration/project/financial-structures/list';

const FundingInvestmentProspectus = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.FINANCIAL_STRUCTURES.ITEM.LIST} />
                <Route path={FUNDING.FINANCIAL_STRUCTURES.ITEM.CREATE} component={Create} />
                <Route path={FUNDING.FINANCIAL_STRUCTURES.ITEM.STRUCTURES} render={(props) => <Structures reference={props.match.params.id} type="BIGDEAL" {...props} />} />
                <Route path={FUNDING.FINANCIAL_STRUCTURES.ITEM.LIST} component={List} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FundingInvestmentProspectus)));