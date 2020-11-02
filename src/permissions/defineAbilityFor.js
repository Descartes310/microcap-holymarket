import { AbilityBuilder } from "@casl/ability";
import Permission from "Enums/Permissions";

export default function defineRulesFor(auth) {
    const { can, cannot, rules } = new AbilityBuilder();

    if (auth && auth.user && auth.user.profile && auth.user.profile.permissions) {
        let userPermissions = [];
        try {
            userPermissions = auth.user.profile.permissions.map(p => ({...p, types: JSON.parse(p.types)}));
        } catch (e) {}
        const permissionsName = userPermissions.map(p => p.name);

        // Enable each permission
        permissionsName.forEach(permission => {
            can(permission, Permission);
        });
    }
    return rules
}
