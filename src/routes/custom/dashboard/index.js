/**
 * Dasboard Routes
 */
import React, { useEffect } from 'react';
import RctAppLayout from 'Components/RctAppLayout';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncMarketplace
} from 'Components/AsyncComponent/AsyncComponent';

import {
    ROOT,
    HOME,
    MARKETPLACE,
} from "Url/frontendUrl";

import { connect } from "react-redux";
import CanRoute from "Components/CanRoute";
import HomePage from "Routes/custom/HomePage";
import { onInitCart } from "Actions/CartActions";
import { loginIntoStore } from "Actions/TokensActions";
import { disableAppLoading } from "Actions/AppLoadingAction";

const Dashboard = ({ onInitCart }) => {

    useEffect(() => {
        onInitCart();
        console.log("JE SUIS DANS LE DASHBOARD")
    }, []);

    return (
        <RctAppLayout>
            <div className="dashboard-wrapper">
                <Switch>
                    <Route exact path={ROOT} component={HomePage} />
                    <Route exact path={HOME} component={HomePage} />
                    <CanRoute
                        permissions={[]}
                        path={MARKETPLACE.SELF}
                        component={AsyncMarketplace}
                    />

                    <Redirect to={HOME} />

                </Switch>
            </div>
        </RctAppLayout>
    )
};

const mapStateToProps = ({ authUser, tokens, appLoading }) => {
    return { tokens, authUser: authUser.data, appLoading };
};

export default connect(mapStateToProps, { disableAppLoading, onInitCart, loginIntoStore })(Dashboard);
