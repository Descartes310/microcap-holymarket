/**
 * Dasboard Routes
 */
import React, { useEffect } from 'react';
import RctAppLayout from 'Components/RctAppLayout';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncGetIn,
    AsyncGroups,
    AsyncPionier,
    AsyncGallery,
    AsyncProfile,
    AsyncDiscover,
    AsyncSolidarity,
    AsyncNotifications,
    AsyncMoneyManagement,
    AsyncUserAccountTypes,
} from 'Components/AsyncComponent/AsyncComponent';

import { useAbility } from "@casl/react";
import {
    ROOT,
    HOME,
    GETIN,
    TERMS,
    GROUP,
    AGENTS,
    VALUES,
    PROFILE,
    MISSION, 
    PIONIERS,
    DISCOVER,
    SERVICES,
    SOLIDARITY,
    PASS_DETAILS,
    SONDAGE_FIRST,
    NOTIFICATIONS,
    SONDAGE_SECOND,
    GALERY_PROJECT,
    MONEY_MANAGEMENT,
    USER_ACCOUNT_TYPE,
} from "Url/frontendUrl";

import Terms from "./Terms";
import Values from "./Values";
import { connect } from "react-redux";
import Permission from "Enums/Permissions";
import CanRoute from "Components/CanRoute";
import Agents from './discover/pages/Agents';
import HomePage from "Routes/custom/HomePage";
import Mission from "./discover/pages/Mission";
import Services from './discover/pages/Service';
import { onInitCart } from "Actions/CartActions";
import SondageFirst from './discover/sondage.js';
import { AbilityContext } from "Permissions/Can";
import { loginIntoStore } from "Actions/TokensActions";
import OfferDetails from './discover/pages/OfferDetails';
import SondageSecond from './discover/sondageResponse.js';
import { disableAppLoading } from "Actions/AppLoadingAction";

const Dashboard = ({ onInitCart }) => {
    const ability = useAbility(AbilityContext);

    useEffect(() => {
        console.log('Je suis dans le index ici !')
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
