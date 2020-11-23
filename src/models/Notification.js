import ProfileType from 'Models/ProfileType';
import Status from "Enums/Status";
import UserType from "Enums/UserType";
import moment from "moment";

export default class Notification {
    constructor(notification) {
        Object.assign(this, notification);
        this.createdAt = moment(this.createdAt);
    }

}
