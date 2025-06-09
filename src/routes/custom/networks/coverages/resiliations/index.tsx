import React from 'react';
import List from './list';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { NETWORK } from 'Url/frontendUrl';
import { withRouter, Switch, Redirect, Route } from "react-router-dom";

const Resiliations = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Route path={NETWORK.COVERAGE.RESILIATION.LIST} component={List} />
                    <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.RESILIATION.LIST} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Resiliations)));