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
    AsyncComOperation, AsyncComOffer, AsyncGroupAdmin, AsyncProducts, AsyncStore,
    AsyncAccess, AsyncSettingNotifications, AsyncNotifications, AsyncUsersAccounts,
    AsyncActivateBranch, AsyncSampleBranchList,
    AsyncDiscover
} from 'Components/AsyncComponent/AsyncComponent';
import Community from "Routes/custom/community";

import CommunityMembersActivities from "Routes/custom/communityT/activities";
import CommunityMembers from "Routes/custom/communityT/members";
import CommunityAdmins from "Routes/custom/communityT/admin";
import CommunityMembersPostsProjects from "Routes/custom/communityT/postsProjects";
import ClientPieceList from "Routes/custom/settings/client_folder/List";
import ConfigurationsList from "Routes/custom/settings/configurations/List";
import UnitList from "Routes/custom/settings/units";
import Ressource from "Routes/custom/ressources";
import PersonalSpace from "Routes/custom/users/users/personnal-space";
import SingleProfile from 'Routes/custom/users/user-profile/Profile';
import UserProfile from 'Routes/custom/users/user-profile';

import { useAbility } from "@casl/react";
import {
    CATALOG,
    DISCOVER,
    HOME,
    NETWORK,
    CATEGORY,
    PRODUCT_TYPE,
    USERS,
    COMMUNITY,
    COMMUNITY_ADMIN,
    COMMUNITY_MEMBER,
    PACKAGES,
    RESSOURCE,
    COMMERCIAL_MANAGEMENT, PRODUCT, STORE, ROOT, ACCESS, SETTINGS, NOTIFICATIONS, PROJECTS
} from "Url/frontendUrl";
import { AbilityContext } from "Permissions/Can";
import { connect } from "react-redux";
import { disableAppLoading } from "Actions/AppLoadingAction";
import { loginIntoStore } from "Actions/TokensActions";
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
                        path={RESSOURCE.SELF}
                        component={Ressource}
                        permissions={[]}
                    />

                    <CanRoute
                        path={SETTINGS.USERPIECE.SELF}
                        component={ClientPieceList}
                        permissions={[]}
                    />

                    <CanRoute
                        path={SETTINGS.CONFIGS.SELF}
                        component={ConfigurationsList}
                        permissions={[]}
                    />

                    <CanRoute
                        path={SETTINGS.UNITS.SELF}
                        component={UnitList}
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
                        component={UserProfile}
                        permissions={[]}
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
                        path={COMMUNITY_ADMIN.SELF}
                        component={CommunityAdmins}
                        permissions={[]}
                    />


                    <CanRoute
                        path={USERS.USERS.PERSONNAL_SPACE}
                        component={PersonalSpace}
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

                    <CanRoute
                        path={USERS.USERS_PROFILE.PROFILE}
                        component={SingleProfile}
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

export default connect(mapStateToProps, { disableAppLoading, loginIntoStore })(Dashboard);
