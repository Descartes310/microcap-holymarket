import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { RESSOURCE } from "Url/frontendUrl";
import { connect } from "react-redux";
import Vouchers from './vouchers';
import Pieces from './pieces';

const TabContent = ({ match }) => {
    return (
        <div className="vh-100">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={RESSOURCE.VOUCHERS} />
                <Route path={RESSOURCE.VOUCHERS} component={Vouchers} />
                <Route path={RESSOURCE.PIECES} component={Pieces} />
            </Switch>
        </div>
    )
};

export default connect(() => ({}), {})(withRouter(TabContent));
