import React from 'react';
import Agents from './agents';
import Counters from './counters';
import Coverages from './coverages';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import Prestations from './prestations';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankAgent = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BANK.PARTY.COUNTER.SELF} />
                <Route path={BANK.PARTY.AGENT.SELF} component={Agents} />
                <Route path={BANK.PARTY.COUNTER.SELF} component={Counters} />
                <Route path={BANK.PARTY.COVERAGE.SELF} component={Coverages} />
                <Route path={BANK.PARTY.PRESTATION.SELF} component={Prestations} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankAgent)));