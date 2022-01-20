import React from "react";
import {useAbility} from "@casl/react";
import {Route, Redirect} from "react-router-dom";
import {AbilityContext} from "Permissions/Can";
import {getPermissionOfPath} from "Helpers/helpers";
import Permission from "Enums/Permissions";
import {HOME} from "Url/frontendUrl";

const CanRoute = ({ can, component: Component, path, permissions, ...restProps }) => {
    const ability = useAbility(AbilityContext);
    const _permissions = permissions || getPermissionOfPath(path);
    let _can = _permissions.every(p => ability.can(p, Permission));
    _can = (can !== null && can !== undefined) ? can && _can : _can;

    return _can
        ? (<Route {...restProps} component={Component} />)
        : (<Redirect to={HOME} />);
};

export default CanRoute;
