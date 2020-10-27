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
}
