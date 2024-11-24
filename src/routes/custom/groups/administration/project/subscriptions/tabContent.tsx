import React from 'react';
import Mines from './mines/list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { GROUP } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const SubscriptionsTab = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.SELF} />
                <Route path={GROUP.ADMINISTRATION.PROJECT.SUBSCRIPTIONS.LIST} component={Mines} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(SubscriptionsTab)));