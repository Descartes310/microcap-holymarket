import BaseEnum from './BaseEnum';

export default class NotificationType extends BaseEnum {
    static ACTIVATION = 'ACTIVATION';
    static REGISTRATION = 'REGISTRATION';
    static PIECE_REQUEST = 'PIECE_REQUEST';
    static ACTIVATION_PASS = 'ACTIVATION_PASS';
    static CODEV_INVITATION = 'CODEV_INVITATION';
    static COMMUNITY_INVITATION = 'COMMUNITY_INVITATION';
    static CODEV_INVITATION_REQUEST = 'CODEV_INVITATION_REQUEST';
    static ACTIVATE_FUNDING_ACCOUNT = 'ACTIVATE_FUNDING_ACCOUNT';

    static READ = 'READ';
    static UNREAD = 'UNREAD';
    static DELETED = 'DELETED';
}
