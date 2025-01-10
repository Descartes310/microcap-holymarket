import React from 'react';
import List from './list';
import History from './history';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { SUPERVISION } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const OperationSupervision = (props) => {
    const { match } = props;
    return (
        <div>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={SUPERVISION.OPERATIONS.PENDING} />
                <Route path={SUPERVISION.OPERATIONS.LIST} component={History} />
                <Route path={SUPERVISION.OPERATIONS.PENDING} component={List} />
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(OperationSupervision)));