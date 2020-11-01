import { AbilityBuilder } from "@casl/ability";
import Branch from "Models/Branch";
import Permission from "Enums/permissions";

export default function defineRulesFor(auth) {
    // const { can, rules } = AbilityBuilder.extract();
    const { can, cannot, rules } = new AbilityBuilder();

    if (auth && auth.user && auth.user.profile && auth.user.profile.permissions) {
        let userPermissions = [];
        try {
            userPermissions = JSON.parse(auth.user.profile.permissions);
        } catch (e) {

        }
        const permissionsName = userPermissions.map(p => p.name);

        // Enable each permission
        permissionsName.forEach(permission => {
            can(permission, Permission);
        });
    }
    return rules
}
