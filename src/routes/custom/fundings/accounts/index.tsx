import React from 'react';
import List from './list';
import Details from './details';
import journal from './journal';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { FUNDING } from 'Url/frontendUrl';
import consolidations from './consolidations';
import synchronisations from './synchronisations';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Accounts = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={FUNDING.ACCOUNT.LIST} />
                    <Route path={FUNDING.ACCOUNT.LIST} component={List} />
                    <Route path={FUNDING.ACCOUNT.DETAILS} component={Details} />
                    <Route path={FUNDING.ACCOUNT.JOURNALS} component={journal} />
                    <Route path={FUNDING.ACCOUNT.CONSOLIDATIONS} component={consolidations} />
                    <Route path={FUNDING.ACCOUNT.SYNCHRONISATIONS} component={synchronisations} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Accounts)));