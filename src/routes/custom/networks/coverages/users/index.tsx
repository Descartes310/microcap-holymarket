import React from 'react';
import List from './list';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { NETWORK } from 'Url/frontendUrl';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const Users = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Route path={NETWORK.COVERAGE.USERS.LIST} component={List} />
                    <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.USERS.LIST} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Users)));