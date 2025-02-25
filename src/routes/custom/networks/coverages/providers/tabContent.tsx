import React from 'react';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import { NETWORK } from 'Url/frontendUrl';
import Complementary from './tabs/complementary';
import {withRouter, Switch, Redirect, Route} from "react-router-dom";

const Catalogs = (props) => {
    const { match } = props;
    return (
        <div>
            <>
                <Switch>
                    {/* <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE.PARTNERSHIP.COMPLEMENTARY} /> */}
                    <Route path={NETWORK.COVERAGE.PARTNERSHIP.COMPLEMENTARY} component={Complementary} />
                </Switch>
            </>
        </div>
    );
}

const mapStateToProps = ({ requestGlobalLoader }) => {
    return { requestGlobalLoader }
};

export default connect(mapStateToProps, {})(withRouter(injectIntl(Catalogs)));