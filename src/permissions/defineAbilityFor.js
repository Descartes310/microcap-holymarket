import Permission from "Enums/Permissions.tsx";
import { AbilityBuilder } from "@casl/ability";

export default function defineRulesFor(auth) {
    const { can, rules } = new AbilityBuilder();

    if (auth) {
        const permissionsName = auth.permissionNames;
        permissionsName.forEach(permission => {
            can(permission, Permission);
        });
    }

    return rules
}
