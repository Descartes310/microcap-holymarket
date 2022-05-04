import React from 'react';
import Moneys from './moneys';
import Clients from './clients';
import Parties from './participants';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Operations from './operations';
import { BANK } from 'Url/frontendUrl';
import Intermediary from './intermediary';
import Subscription from './subscriptions';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Bank = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.ADMIN.SELF} />
                <Route path={BANK.MONEY.SELF} component={Moneys} />
                <Route path={BANK.ADMIN.SELF} component={Parties} />
                <Route path={BANK.CLIENT.SELF} component={Clients} />
                <Route path={BANK.PARTY.SELF} component={Intermediary} />
                <Route path={BANK.OPERATION.SELF} component={Operations} />
                <Route path={BANK.SUBSCRIPTION.SELF} component={Subscription} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Bank)));