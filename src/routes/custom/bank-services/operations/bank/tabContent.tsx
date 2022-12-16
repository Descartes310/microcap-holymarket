import React from 'react';
import All from './requests/list';
import {connect} from "react-redux";
import Draft from './requests/draft';
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import Pending from './requests/pending';
import Liquidation from './requests/liquidation';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankOperations = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.OPERATION.BANK.LIST} />
                <Route path={BANK.OPERATION.BANK.LIST} component={All} />
                <Route path={BANK.OPERATION.BANK.DRAFT} component={Draft} />
                <Route path={BANK.OPERATION.BANK.PENDING} component={Pending} />
                <Route path={BANK.OPERATION.BANK.LIQUIDATION} component={Liquidation} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankOperations)));