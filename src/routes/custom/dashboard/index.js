/**
 * Dasboard Routes
 */
import React, {useEffect} from 'react';
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
    AsyncPionier,
    AsyncUsers,
    AsyncAllUsersAccounts,
    AsyncGetIn,
    AsyncCommunity,
    AsyncProjects,
    AsyncCommunityProject,
    AsyncCatalogSales,
    AsyncComOperationType,
    AsyncComOperation, AsyncComOffer, AsyncGroupAdmin, AsyncProducts, AsyncStore,
    AsyncAccess, AsyncSettingNotifications, AsyncNotifications, AsyncUsersAccounts,
    AsyncActivateBranch, AsyncSampleBranchList,
    AsyncDiscover,
    AsyncSolidarity,
    AsyncMoneyManagement,
    AsyncGallery,
    AsyncCommunitySpace
} from 'Components/AsyncComponent/AsyncComponent';
import Community from "Routes/custom/community";
import Stock from 'Routes/custom/stocks';
import Posts from "Routes/custom/settings/posts";
import Previsions from "Routes/custom/previsions";
import Ressource from "Routes/custom/ressources";
import UnitList from "Routes/custom/settings/units";
import AllUsers from 'Routes/custom/users/all-users/List';
import MyMicrocap from 'Routes/custom/microcap';
import UserProfile from 'Routes/custom/users/user-profile';
import AgentList from "Routes/custom/settings/agents/List";
import PrevisionsAdmin from "Routes/custom/previsions_admin";
import CommunityAdmins from "Routes/custom/communityT/admin";
import PionierList from "Routes/custom/settings/pioniers/List";
import CommunityMembers from "Routes/custom/communityT/members";
import SingleProfile from 'Routes/custom/users/user-profile/Profile';
import PersonalSpace from "Routes/custom/users/users/personnal-space";
import ClientPieceList from "Routes/custom/settings/client_folder/List";
import ConfigurationsList from "Routes/custom/settings/configurations/List";
import CommunityMembersActivities from "Routes/custom/communityT/activities";
import CommunityMembersPostsProjects from "Routes/custom/communityT/postsProjects";
import UpdateInitializationOption from 'Routes/custom/projects/configuration/intialisation-options/Update';

import { useAbility } from "@casl/react";
import {
    CATALOG,
    DISCOVER,
    SOLIDARITY,
    PASS_DETAILS,
    MISSION, VALUES,
    MONEY_MANAGEMENT,
    PIONIERS,
    PREVISIONS_ADMIN,
    GALERY_PROJECT,
    HOME,
    CGU,
    SONDAGE_SECOND,
    SERVICES,
    NETWORK,
    CATEGORY,
    PRODUCT_TYPE,
    USERS,
    COMMUNITY,
    COMMUNITY_ADMIN,
    COMMUNITY_MEMBER,
    PREVISIONS,
    GETIN,
    STOCK,
    SONDAGE_FIRST,
    SONDAGE_SEDOND,
    TERMS,
    PACKAGES,
    RESSOURCE,
    MICROCAP360,
    AGENTS,
    COMMERCIAL_MANAGEMENT, PRODUCT, STORE, ROOT, ACCESS, SETTINGS, NOTIFICATIONS, PROJECTS
} from "Url/frontendUrl";
import { AbilityContext } from "Permissions/Can";
import { connect } from "react-redux";
import { disableAppLoading } from "Actions/AppLoadingAction";
import { loginIntoStore } from "Actions/TokensActions";
import Permission from "Enums/Permissions";
import HomePage from "Routes/custom/HomePage";
import CanRoute from "Components/CanRoute";
import Terms from "./Terms";
import Mission from "./discover/pages/Mission";
import Values from "./Values";
import OfferDetails from './discover/pages/OfferDetails';
import Agents from './discover/pages/Agents';
import SondageFirst from './discover/sondage.js';
import SondageSecond from './discover/sondageResponse.js';
import Services from './discover/pages/Service';
import {onInitCart} from "Actions/CartActions";

const Dashboard = ({ onInitCart }) => {
    const ability = useAbility(AbilityContext);

    useEffect(()=>{
        onInitCart();
    }, []);

    return (
        <RctAppLayout>
            <div className="dashboard-wrapper">
                <Switch>
                    <Route exact path={DISCOVER} component={AsyncDiscover} />
                    <Route exact path={GETIN} component={AsyncGetIn} />
                    <Route exact path={PIONIERS} component={AsyncPionier} />
                    <Route exact path={AGENTS} component={Agents} />
                    <Route exact path={GALERY_PROJECT} component={AsyncGallery} />
                    <Route exact path={ROOT} component={HomePage} />
                    <Route exact path={HOME} component={HomePage} />
                    <Route exact path={MISSION} component={Mission} />
                    <Route exact path={VALUES} component={Values} />
                    <Route exact path={SERVICES} component={Services} />
                    <Route exact path={TERMS} component={Terms} />
                    <Route exact path={SONDAGE_FIRST} component={SondageFirst} />
                    <Route exact path={SONDAGE_SECOND} component={SondageSecond} />
                    <Route exact path={PASS_DETAILS} component={OfferDetails} />
                    <Route exact path={SOLIDARITY} component={AsyncSolidarity} />
                    <Route exact path={MONEY_MANAGEMENT} component={AsyncMoneyManagement} />

                    <CanRoute
                        path={NETWORK.ACTIVATION}
                        component={AsyncActivateBranch}
                        permissions={[]}
                    />


                    <CanRoute
                        path={USERS.ACCOUNTS.ALL}
                        component={AllUsers}
                        permissions={[Permission.users.accounts.viewList.name]}
                    />

                    <CanRoute
                        path={NETWORK.ONGOING_CREATE}
                        component={AsyncSampleBranchList}
                        permissions={[]}
                    />

                    <CanRoute
                        path={PROJECTS.CONFIGURATION.INITIALISATION.UPDATE}
                        component={UpdateInitializationOption}
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
                        path={MICROCAP360.MY.SELF}
                        component={MyMicrocap}
                        permissions={[]}
                    />

                    <CanRoute
                        path={SETTINGS.USERPIECE.SELF}
                        component={ClientPieceList}
                        permissions={[]}
                    />

                    <CanRoute
                        path={SETTINGS.AGENTS.SELF}
                        component={AgentList}
                        permissions={[]}
                    />

                    <CanRoute
                        path={PREVISIONS_ADMIN.SELF}
                        component={PrevisionsAdmin}
                        permissions={[]}
                    />

                    <CanRoute
                        path={PREVISIONS.SELF}
                        component={Previsions}
                        permissions={[]}
                    />

                    <CanRoute
                        path={SETTINGS.PIONIERS.SELF}
                        component={PionierList}
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
                        path={SETTINGS.POST.SELF}
                        component={Posts}
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
                        path={STOCK.SELF}
                        component={Stock}
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
                        path={COMMUNITY.SELF}
                        component={AsyncCommunitySpace}
                        permissions={[]}
                    />

                    <CanRoute
                        path={USERS.USERS.PERSONNAL_SPACE}
                        component={PersonalSpace}
                        permissions={[]}
                    />

                    <CanRoute
                        path={ACCESS.SELF}
                        component={AsyncAccess}
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

export default connect(mapStateToProps, { disableAppLoading, onInitCart, loginIntoStore })(Dashboard);
