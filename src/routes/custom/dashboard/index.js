/**
 * Dasboard Routes
 */
import React, { useEffect } from 'react';
import RctAppLayout from 'Components/RctAppLayout';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncBroker,
    AsyncGroups,
    AsyncLanding,
    AsyncProfile,
    AsyncFundings,
    AsyncSettings,
    AsyncProjects,
    AsyncNetworks,
    AsyncMarketplace,
    AsyncNotifications,
    AsyncUserAccountTypes,
} from 'Components/AsyncComponent/AsyncComponent';

import { useAbility } from "@casl/react";
import {
    ROOT,
    HOME,
    TERMS,
    GROUP,
    BROKER,
    PROFILE,
    MISSION, 
    SETTING,
    FUNDING,
    LANDING,
    PROJECT,
    NETWORK,
    SERVICES,
    MARKETPLACE,
    NOTIFICATIONS,
    USER_ACCOUNT_TYPE,
} from "Url/frontendUrl";

import { connect } from "react-redux";
import CanRoute from "Components/CanRoute";
import HomePage from "Routes/custom/HomePage";
import { onInitCart } from "Actions/CartActions";
import { AbilityContext } from "Permissions/Can";
import { loginIntoStore } from "Actions/TokensActions";
import { disableAppLoading } from "Actions/AppLoadingAction";

const Dashboard = ({ onInitCart }) => {
    const ability = useAbility(AbilityContext);

    useEffect(() => {
        onInitCart();
    }, []);

    return (
        <RctAppLayout>
            <div className="dashboard-wrapper">
                <Switch>
                    <Route exact path={ROOT} component={HomePage} />
                    <Route exact path={HOME} component={HomePage} />

                    <Route path={LANDING.SELF} component={AsyncLanding} />
                    
                    <CanRoute
                        permissions={[]}
                        path={USER_ACCOUNT_TYPE.SELF}
                        component={AsyncUserAccountTypes}
                    />
                    <CanRoute
                        permissions={[]}
                        path={NOTIFICATIONS.SELF}
                        component={AsyncNotifications}
                    />
                    <CanRoute
                        permissions={[]}
                        path={GROUP.SELF}
                        component={AsyncGroups}
                    />
                    <CanRoute
                        permissions={[]}
                        path={PROFILE.SELF}
                        component={AsyncProfile}
                    />
                    <CanRoute
                        permissions={[]}
                        path={MARKETPLACE.SELF}
                        component={AsyncMarketplace}
                    />
                    <CanRoute
                        permissions={[]}
                        path={SETTING.SELF}
                        component={AsyncSettings}
                    />
                    <CanRoute
                        permissions={[]}
                        path={PROJECT.SELF}
                        component={AsyncProjects}
                    />
                    <CanRoute
                        permissions={[]}
                        path={FUNDING.SELF}
                        component={AsyncFundings}
                    />
                    <CanRoute
                        permissions={[]}
                        path={NETWORK.SELF}
                        component={AsyncNetworks}
                    />
                    <CanRoute
                        permissions={[]}
                        path={BROKER.SELF}
                        component={AsyncBroker}
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
