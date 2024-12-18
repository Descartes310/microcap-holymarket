import React from 'react';
import List from './list';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { BROADCAST } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const AllBroadcast = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={BROADCAST.ALL.LIST} />
                <Route path={BROADCAST.ALL.LIST} component={List} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(AllBroadcast)));