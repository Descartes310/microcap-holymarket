import React from 'react';
import Deals from './deals';
import Bourses from './bourses';
import Accounts from './accounts';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Funding = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={FUNDING.ACCOUNT.SELF} />
                    <Route path={FUNDING.ACCOUNT.SELF} component={Accounts} />
                    <Route path={FUNDING.BOURSE.SELF} component={Bourses} />
                    <Route path={FUNDING.BOURSE.DEALS.SELF} component={Deals} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Funding)));