import React from 'react';
import {connect} from "react-redux";
import Parameters from './parameters';
import {injectIntl} from "react-intl";
import Prospectus from './prospectus';
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const FinancialStructure = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={FUNDING.FINANCIAL_STRUCTURES.SELF} />
                <Route path={FUNDING.FINANCIAL_STRUCTURES.ITEM.SELF} component={Prospectus} />
                <Route path={FUNDING.FINANCIAL_STRUCTURES.PARAM.SELF} component={Parameters} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(FinancialStructure)));