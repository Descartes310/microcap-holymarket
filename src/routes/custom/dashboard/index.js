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
    AsyncCatalogProducts,
    AsyncUserProfile,
    AsyncUsers,
    AsyncCommunity,
    AsyncCatalogSales,
    AsyncComOperationType,
    AsyncComOperation, AsyncComOffer, AsyncProducts, AsyncStore,
} from 'Components/AsyncComponent/AsyncComponent';
import Community from "Routes/custom/community";


import Branch from "Models/Branch";
import {useAbility} from "@casl/react";
import {
    CATALOG,
    HOME,
    NETWORK,
    CATEGORY,
    PRODUCT_TYPE,
    USERS,
    COMMUNITY,
    PACKAGES,
    COMMERCIAL_MANAGEMENT, PRODUCT, STORE, ROOT
} from "Url/frontendUrl";
import {AbilityContext} from "Permissions/Can";
import {connect} from "react-redux";
import {setAuthUser} from "Actions/AuthActions";
import {disableAppLoading} from "Actions/AppLoadingAction";
import {loginIntoStore} from "Actions/TokensActions";
import {getPermissionOfPath} from "Helpers/helpers";
import Permission from "Enums/Permissions";
import HomePage from "Routes/custom/HomePage";
import CanRoute from "Components/CanRoute";

const Dashboard = ({ match, authUser }) => {
    const ability = useAbility(AbilityContext);

    return (
        <RctAppLayout>
            <div className="dashboard-wrapper">
                <Switch>
                    <Route exact path={ROOT} component={HomePage} />
                    <Route exact path={HOME} component={HomePage} />

                    <CanRoute
                        path={STORE.SELF}
                        component={AsyncStore}
                        permissions={[]}
                    />

                    <CanRoute
                        exact
                        path={NETWORK.CREATE}
                        permissions={[Permission.branch.createOne.name]}
                        component={AsyncBranchCreate}
                    />

                    <CanRoute
                        path={NETWORK.LIST}
                        permissions={[Permission.branch.viewList.name]}
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
                        path={PACKAGES.SELF}
                        component={AsyncCatalogSales}
                        permissions={[]}
                    />

                    <CanRoute
                        path={CATALOG.SALE.SELF}
                        component={AsyncCatalogSales}
                        permissions={[]}
                    />

                    <CanRoute
                        path={COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.SELF}
                        component={AsyncComOffer}
                        permissions={[]}
                    />

                    <CanRoute
                        path={COMMERCIAL_MANAGEMENT.COMMERCIAL_OPERATION_TYPE.SELF}
                        component={AsyncComOperationType}
                        permissions={[]}
                    />

                    <CanRoute
                        path={COMMERCIAL_MANAGEMENT.COMMERCIAL_OPERATION.SELF}
                        component={AsyncComOperation}
                        permissions={[]}
                    />

                    <CanRoute
                        path={USERS.USERS.SELF}
                        component={AsyncUsers}
                        permissions={[Permission.users.viewList.name]}
                    />

                    <CanRoute
                        path={USERS.USERS_PROFILE.SELF}
                        component={AsyncUserProfile}
                        permissions={[Permission.userProfile.viewList.name]}
                    />

                    <CanRoute
                        path={COMMUNITY.SELF}
                        component={Community}
                        // component={AsyncCommunity}
                        permissions={[]}
                    />

                    <CanRoute
                        path={PRODUCT.SELF}
                        component={AsyncProducts}
                        permissions={[]}
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
