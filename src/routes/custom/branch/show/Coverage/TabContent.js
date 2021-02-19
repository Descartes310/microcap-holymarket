import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { NETWORK } from "Url/frontendUrl";
import { connect } from "react-redux";
import Area from './tabs/area';
import AreaType from './tabs/areaType';
import Partner from './tabs/partner';

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={NETWORK.COVERAGE_TABS.PARTNER} />
                <Route path={NETWORK.COVERAGE_TABS.AREA} component={Area} />
                <Route path={NETWORK.COVERAGE_TABS.AREA_TYPE} component={AreaType} />
                <Route path={NETWORK.COVERAGE_TABS.PARTNER} component={Partner} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
