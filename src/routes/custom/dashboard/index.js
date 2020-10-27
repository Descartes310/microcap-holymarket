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
    AsyncBranchList
} from 'Components/AsyncComponent/AsyncComponent';

import Branch from "Models/Branch";
import {useAbility} from "@casl/react";
import {HOME, NETWORK} from "Url/frontendUrl";
import {AbilityContext} from "Permissions/Can";

const CanRoute = ({ can, component: Component, ...restProps }) => {
    return can
        ? (<Route {...restProps} component={Component} />)
        : (<Redirect to={HOME} />);
};

const Dashboard = ({ match }) => {
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
                        exact
                        path={NETWORK.LIST}
                        component={AsyncBranchList}
                        can={ability.can(Branch.permissionsRelated.READ, Branch)}
                    />

                    <Redirect to={HOME} />
                </Switch>
            </div>
        </RctAppLayout>
    )
};

export default Dashboard;
