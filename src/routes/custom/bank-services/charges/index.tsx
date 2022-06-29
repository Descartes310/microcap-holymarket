import React from 'react';
import Admin from './admin';
import Agents from './agents';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankCharge = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.CHARGE.AGENT.SELF} />
                <Route path={BANK.CHARGE.AGENT.SELF} component={Agents} />
                <Route path={BANK.CHARGE.INTERMEDIARY.REQUEST.SELF} component={Admin} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankCharge)));