/**
 * Dasboard Routes
 */
import React from 'react';
import RctAppLayout from 'Components/RctAppLayout';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncEcommerceDashboardComponent,
    AsyncBranchCreate,
    AsyncBranchList,
    AsyncBranchNetworkCoverage,
    AsyncBranchNetworkConfiguration,
    AsyncCatalogProducts,
} from 'Components/AsyncComponent/AsyncComponent';

import Branch from "Models/Branch";
import {useAbility} from "@casl/react";
import {CATALOG, HOME, NETWORK, CATEGORY} from "Url/frontendUrl";
import {AbilityContext} from "Permissions/Can";
import {connect} from "react-redux";
import {setAuthUser} from "Actions/AuthActions";
import {disableAppLoading} from "Actions/AppLoadingAction";
import {loginIntoStore} from "Actions/TokensActions";

const CanRoute = ({ can, component: Component, ...restProps }) => {
    return can
        ? (<Route {...restProps} component={Component} />)
        : (<Redirect to={HOME} />);
};

const Dashboard = ({ match, authUser }) => {
    const ability = useAbility(AbilityContext);

    return (
        <RctAppLayout>
            <div className="dashboard-wrapper">
                <Switch>
                    <Route exact path={HOME} component={AsyncEcommerceDashboardComponent} />

                    <CanRoute
                        exact
                        path={NETWORK.CREATE}
                        component={AsyncBranchCreate}
                        can={ability.can(Branch.permissionsRelated.CREATE, Branch)}
                    />

                    <CanRoute
                        path={NETWORK.LIST}
                        component={AsyncBranchList}
                        can={ability.can(Branch.permissionsRelated.READ, Branch)}
                    />

                    <CanRoute
                        path={NETWORK.CONFIGURATION.SELF}
                        component={AsyncBranchNetworkConfiguration}
                        can={authUser && authUser.isExploitant()}
                    />

                    <CanRoute
                        path={NETWORK.COVERAGE}
                        component={AsyncBranchNetworkCoverage}
                        can={authUser && authUser.isExploitant()}
                    />

                    <CanRoute
                        path={CATALOG.PRODUCT.SELF}
                        component={AsyncCatalogProducts}
                        can={authUser && authUser.isExploitant()}
                    />

                    <CanRoute
                        path={CATEGORY.PRODUCT.SELF}
                        component={AsyncCatalogProducts}
                        can={authUser && authUser.isExploitant()}
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

export default connect(mapStateToProps, {setAuthUser, disableAppLoading, loginIntoStore})(Dashboard);
