import React from 'react';
import List from './list';
import Update from './update';
import Create from './create';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { MARKETPLACE } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const UserAccountTypeCategories = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={MARKETPLACE.MARKET.LIST} />
                    <Route path={MARKETPLACE.MARKET.LIST} component={List} />
                    <Route path={MARKETPLACE.MARKET.CREATE} component={Create} />
                    <Route path={MARKETPLACE.MARKET.UPDATE} component={Update} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(UserAccountTypeCategories)));