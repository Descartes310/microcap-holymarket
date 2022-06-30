import React from 'react';
import Contract from './contracts';
import {connect} from "react-redux";
import Territory from './territoties';
import {injectIntl} from "react-intl";
import Partnership from './partnerships';
import { NETWORK } from 'Url/frontendUrl';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";
import users from './users';

const Coverage = (props) => {
    const { match } = props;
    return (
        <div className="full-height">
            <>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.TERRITORY.SELF} />
                    <Route path={NETWORK.COVERAGE.TERRITORY.SELF} component={Territory} />
                    <Route path={NETWORK.COVERAGE.CONTRACT.SELF} component={Contract} />
                    <Route path={NETWORK.COVERAGE.PARTNERSHIP.SELF} component={Partnership} />
                    <Route path={NETWORK.COVERAGE.USERS.SELF} component={users} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Coverage)));