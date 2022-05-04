import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Injections from './injections';
import { BANK } from 'Url/frontendUrl';
import Extinctions from './extinctions';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankMoney = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.MONEY.INJECTION.SELF} />
                <Route path={BANK.MONEY.INJECTION.SELF} component={Injections} />
                <Route path={BANK.MONEY.EXTINCTION.SELF} component={Extinctions} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankMoney)));