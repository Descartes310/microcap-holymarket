import React from 'react';
import List from './list';
import Chain from './chain';
import Create from './create';
import Update from './update';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import ChainCreate from './chainCreate';
import { USER_ACCOUNT_TYPE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const UserAccountTypes = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={USER_ACCOUNT_TYPE.TYPE.LIST} />
                    <Route path={USER_ACCOUNT_TYPE.TYPE.LIST} component={List} />
                    <Route path={USER_ACCOUNT_TYPE.TYPE.CHAIN_CREATE} component={ChainCreate} />
                    <Route path={USER_ACCOUNT_TYPE.TYPE.CHAIN} component={Chain} />
                    <Route path={USER_ACCOUNT_TYPE.TYPE.CREATE} component={Create} />
                    <Route path={USER_ACCOUNT_TYPE.TYPE.UPDATE} component={Update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(UserAccountTypes)));