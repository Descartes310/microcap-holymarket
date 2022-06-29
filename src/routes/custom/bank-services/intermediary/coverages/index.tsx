import React from 'react';
import List from './list';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BANK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const BankPartyCoverage = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={BANK.PARTY.COVERAGE.LIST} />
                    <Route path={BANK.PARTY.COVERAGE.LIST} component={List} />
                    <Route path={BANK.PARTY.COVERAGE.CREATE} component={Create} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(BankPartyCoverage)));