/**
 * Dasboard Routes
 */
import React from 'react';
import RctAppLayout from 'Components/RctAppLayout';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncBranchCreate,
    AsyncBranchList,
    AsyncBranchNetworkCoverage,
    AsyncBranchNetworkConfiguration,
    AsyncCatalogProducts, AsyncUserProfile, AsyncUsers,
} from 'Components/AsyncComponent/AsyncComponent';

import Branch from "Models/Branch";
import {useAbility} from "@casl/react";
import {CATALOG, HOME, NETWORK, CATEGORY, PRODUCT_TYPE, USERS} from "Url/frontendUrl";
import {AbilityContext} from "Permissions/Can";
import {connect} from "react-redux";
import {setAuthUser} from "Actions/AuthActions";
import {disableAppLoading} from "Actions/AppLoadingAction";
import {loginIntoStore} from "Actions/TokensActions";
import {getPermissionOfPath} from "Helpers/helpers";
import Permission from "Enums/permissions";
import HomePage from "Routes/custom/HomePage";

const CanRoute = ({ can, component: Component, path, permissions, ...restProps }) => {
    const ability = useAbility(AbilityContext);
    const _permissions = permissions || getPermissionOfPath(path);
    const _can = _permissions.every(p => ability.can(p, Permission));
    // ability.can(Branch.permissionsRelated.CREATE, Branch);

    return _can
        ? (<Route {...restProps} component={Component} />)
        : (<Redirect to={HOME} />);
};


const Dashboard = ({ match, authUser }) => {
    const ability = useAbility(AbilityContext);

    return (
        <RctAppLayout>
            <div className="dashboard-wrapper">
                <Switch>
                    <Route exact path={HOME} component={HomePage} />

                    <CanRoute
                        exact
                        path={NETWORK.CREATE}
                        permissions={[Permission.branch.createOne.name]}
                        component={AsyncBranchCreate}
                    />

                    <CanRoute
                        path={NETWORK.LIST}
                        permissions={[Permission.branch.list.name]}
                        component={AsyncBranchList}
                        can={ability.can(Branch.permissionsRelated.READ, Branch)}
                    />

                    <CanRoute
                        path={NETWORK.CONFIGURATION.SELF}
                        component={AsyncBranchNetworkConfiguration}
                        permissions={[]}
                    />

                    <CanRoute
                        path={NETWORK.COVERAGE}
                        component={AsyncBranchNetworkCoverage}
                        permissions={[]}
                    />

                    <CanRoute
                        path={CATALOG.PRODUCT.SELF}
                        component={AsyncCatalogProducts}
                        permissions={[]}
                    />

                    <CanRoute
                        path={CATEGORY.PRODUCT.SELF}
                        component={AsyncCatalogProducts}
                        permissions={[]}
                    />

                    <CanRoute
                        path={PRODUCT_TYPE.SELF}
                        component={AsyncCatalogProducts}
                        permissions={[]}
                    />

                    <CanRoute
                        path={USERS.USERS.SELF}
                        component={AsyncUsers}
                        permissions={[]}
                        // permissions={[Permission.branch.createOne.name]}
                        // permissions={[]}
                    />

                    <CanRoute
                        path={USERS.USERS_PROFILE.SELF}
                        component={AsyncUserProfile}
                        permissions={[]}
                        // permissions={[Permission.branch.createOne.name]}
                        // permissions={[]}
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
