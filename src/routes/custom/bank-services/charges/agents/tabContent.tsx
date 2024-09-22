import React from 'react';
import Requests from './requests';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import Pending from '../admin/requests/pending';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankChargeAgent = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.CHARGE.AGENT.REQUEST.SELF} />
                <Route path={BANK.CHARGE.AGENT.REQUEST.SELF} component={Requests} />
                <Route path={BANK.CHARGE.AGENT.DECHARGE} component={Pending} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankChargeAgent)));