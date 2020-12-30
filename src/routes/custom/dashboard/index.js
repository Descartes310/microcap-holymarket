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
    AsyncProjects,
    AsyncCatalogSales,
    AsyncComOperationType,
    AsyncComOperation, AsyncComOffer, AsyncProducts, AsyncStore,
    AsyncAccess, AsyncSettingNotifications, AsyncNotifications, AsyncUsersAccounts,
    AsyncActivateBranch, AsyncSampleBranchList,
    AsyncDiscover
} from 'Components/AsyncComponent/AsyncComponent';
import Community from "Routes/custom/community";

import CommunityMembersActivities from "Routes/custom/communityT/activities";
import CommunityMembers from "Routes/custom/communityT/members";
import CommunityMembersPostsProjects from "Routes/custom/communityT/postsProjects";

import Branch from "Models/Branch";
import {useAbility} from "@casl/react";
import {
    CATALOG,
    DISCOVER,
    HOME,
    NETWORK,
    CATEGORY,
    PRODUCT_TYPE,
    USERS,
    COMMUNITY,
    COMMUNITY_MEMBER,
    PACKAGES,
    COMMERCIAL_MANAGEMENT, PRODUCT, STORE, ROOT, ACCESS, SETTINGS, NOTIFICATIONS, PROJECTS
} from "Url/frontendUrl";
import {AbilityContext} from "Permissions/Can";
import {connect} from "react-redux";
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
                    <Route exact path={DISCOVER} component={AsyncDiscover} />
                    <Route exact path={ROOT} component={HomePage} />
                    <Route exact path={HOME} component={HomePage} />

                    <CanRoute
                        path={NETWORK.ACTIVATION}
                        component={AsyncActivateBranch}
                        permissions={[]}
                    />

                    <CanRoute
                        path={NETWORK.ONGOING_CREATE}
                        component={AsyncSampleBranchList}
                        permissions={[]}
                    />

                    <CanRoute
                        path={USERS.ACCOUNTS.SELF}
                        component={AsyncUsersAccounts}
                        permissions={[Permission.users.accounts.viewList.name]}
                    />

                    <CanRoute
                        path={SETTINGS.NOTIFICATION.SELF}
                        component={AsyncSettingNotifications}
                        permissions={[]}
                    />

                    <CanRoute
                        path={NOTIFICATIONS.SELF}
                        component={AsyncNotifications}
                        permissions={[]}
                    />

                    <CanRoute
                        permissions={[]}
                        path={PROJECTS.SELF}
                        component={AsyncProjects}
                    />

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
                        // can={ability.can(Branch.permissionsRelated.READ, Branch)}
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
                        path={USERS.USERS_PROFILE.SELF}
                        component={AsyncUserProfile}
                        permissions={[Permission.userProfile.viewList.name]}
                    />

                    <CanRoute
                        path={USERS.USERS.SELF}
                        component={AsyncUsers}
                        permissions={[Permission.users.viewList.name]}
                    />

                    <CanRoute
                        path={COMMUNITY_MEMBER.SELF}
                        component={Community}
                        // component={AsyncCommunity}
                        permissions={[]}
                    />

                    <CanRoute
                        path={COMMUNITY.POST_PROJECT.SELF}
                        component={CommunityMembersPostsProjects}
                        permissions={[]}
                    />

                    <CanRoute
                        path={COMMUNITY.MEMBERS.SELF}
                        component={CommunityMembers}
                        permissions={[]}
                    />

                    <CanRoute
                        path={COMMUNITY.ACTIVITY.SELF}
                        component={CommunityMembersActivities}
                        permissions={[]}
                    />

                    <CanRoute
                        path={ACCESS.SELF}
                        component={AsyncAccess}
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

export default connect(mapStateToProps, {disableAppLoading, loginIntoStore})(Dashboard);
