import { AbilityBuilder } from "@casl/ability";
import Branch from "Models/Branch";

export default function defineRulesFor(auth) {
    // const { can, rules } = AbilityBuilder.extract();
    const { can, cannot, rules } = new AbilityBuilder();

    if (auth && auth.user && auth.user.profile && auth.user.profile.permissions) {
        const permissionsName = auth.user.profile.permissions.map(p => p.name);
        const branchPermissions = Object.values(Branch.permissionsRelated);

        branchPermissions.forEach(branchPermission => {
            if (permissionsName.includes(branchPermission)) {
                can(branchPermission, Branch.modelName);
            }
        });
    }
    return rules
}
