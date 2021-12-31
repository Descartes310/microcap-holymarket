import ProfileType from 'Models/ProfileType';
import Status from "Enums/Status";
import UserType from "Enums/UserType";
import { getFilePath } from "Helpers/helpers";

export default class User {
    // userType;
    id: number;
    commercialName: string;
    lastName: string;
    firstName: string;
    user: any

    constructor(user) {
        Object.assign(this, user);
    }

    get userName() {
        return this.user.userType === UserType.ORGANISATION || this.user.userType === null
            ? this.commercialName : `${this.lastName} ${this.firstName}`;
    }

    get userType() {
        if (this.isExploitant()) return UserType.EXPLOITANT;
        if (this.isManager()) return UserType.MANAGER;

        return UserType.USER;
    }

    get branchId() {
        return this.user.branch.id;
    }

    get avatar() {
        return this.user.avatar ? getFilePath(this.user.avatar) : require('Assets/avatars/profile.jpg');
    }

    isExploitant = () => {
        return this.user && this.user.profile && this.user.profile.name === ProfileType.EXPLOITANT;
    };

    isManager = () => {
        return this.user && this.user.profile && this.user.profile.name === ProfileType.PLATFORM_MANAGER;
    };

    hasNetworkProfileConfigurationStarted = () => {
        return this.isExploitant() && this.user.branch.status === Status.EMPTY;
    };

    isNetworkProfileConfigurationFinished = () => {
        return this.isExploitant() && this.user.branch.status === Status.CONFIRMED;
    };

    isNetworkProfileConfigurationPending = () => {
        return this.isExploitant() && this.user.branch.status === Status.PENDING;
    };

    /**
     * Return boolean to indicate if a user get a permissions or
     * at least one permissions or all permissions of a given permission or permissions list
     * @param permissions String | Array<String>
     * @param some indicate whether the user should have at least one permission ot all permissions
     * @returns {boolean}
     */
    hasPermissions = (permissions, some = true) => {
        const userPermissions = this.user.profile.permissions.map(p => p.name);

        if (permissions && (typeof permissions === 'string' || Array.isArray(permissions))) {
            // If the array is empty then the user have permissions since there is no restrictions to that
            if (permissions.length === 0) return true;

            if (Array.isArray(permissions)) {
                return some
                    ? userPermissions.some(p => permissions.includes(p))
                    : userPermissions.every(p => permissions.includes(p));
            } else {
                return permissions.includes(permissions);
            }
        }

        return false;
    };
}
