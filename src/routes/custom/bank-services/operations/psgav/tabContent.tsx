import React from 'react';
import Pending from './requests/pending';
import {connect} from "react-redux";
import Draft from './requests/draft';
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import Liquidation from './requests/liquidation';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankOperations = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.OPERATION.PSGAV.LIST} />
                <Route path={BANK.OPERATION.PSGAV.LIST} component={Pending} />
                <Route path={BANK.OPERATION.PSGAV.DRAFT} component={Draft} />
                <Route path={BANK.OPERATION.PSGAV.LIQUIDATION} component={Liquidation} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankOperations)));