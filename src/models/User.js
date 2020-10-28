import ProfileType from 'Models/ProfileType';
import Status from "Enums/Status";

export default class User {
    userType;
    commercialName;
    lastName;
    firstName;

    constructor(user) {
        Object.assign(this, user);
    }

    get userName() {
        return this.user.userType === null ? this.commercialName : `${this.lastName} ${this.firstName}`;
    }

    isExploitant = () => {
        return this.user && this.user.profile && this.user.profile.name === ProfileType.EXPLOITANT;
    };

    isManager = () => {
        return this.user && this.user.profile && this.user.profile.name === ProfileType.PLATFORM_MANAGER;
    };

    hasNetworkProfileConfigurationStarted = () => {
        return this.isExploitant() && this.branch.status !== Status.EMPTY;
    };

    isNetworkProfileConfigurationFinished = () => {
        return this.isExploitant() && this.branch.status === Status.CONFIRMED;
    };

    isNetworkProfileConfigurationPending = () => {
        return this.isExploitant() && this.branch.status === Status.PENDING;
    };
}
