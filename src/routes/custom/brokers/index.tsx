import React from 'react';
import Agencies from './agencies';
import Counters from './counters';
import Cashdesks from './cashdesks';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BROKER } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Broker = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={BROKER.AGENCY.SELF} />
                    <Route path={BROKER.AGENCY.SELF} component={Agencies} />
                    <Route path={BROKER.COUNTER.SELF} component={Counters} />
                    <Route path={BROKER.CASHDESK.SELF} component={Cashdesks} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Broker)));