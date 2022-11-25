import MMS from './MMS';
import React from 'react';
import Moneys from './moneys';
import Clients from './clients';
import Charges from './charges';
import Topic from './chequeTopics';
import {connect} from "react-redux";
import Parties from './participants';
import {injectIntl} from "react-intl";
import Operations from './operations';
import { BANK } from 'Url/frontendUrl';
import Intermediary from './intermediary';
import Subscription from './subscriptions';
import OrderServiceItems from './serviceOrderItem';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Bank = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.ADMIN.SELF} />
                <Route path={BANK.MMS.SELF} component={MMS} />
                <Route path={BANK.MONEY.SELF} component={Moneys} />
                <Route path={BANK.ADMIN.SELF} component={Parties} />
                <Route path={BANK.CHARGE.SELF} component={Charges} />
                <Route path={BANK.CLIENT.SELF} component={Clients} />
                <Route path={BANK.CHEQUE_TOPIC.SELF} component={Topic} />
                <Route path={BANK.PARTY.SELF} component={Intermediary} />
                <Route path={BANK.OPERATION.SELF} component={Operations} />
                <Route path={BANK.SUBSCRIPTION.SELF} component={Subscription} />
                <Route path={BANK.ORDERSERVICE.ITEM.SELF} component={OrderServiceItems} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Bank)));