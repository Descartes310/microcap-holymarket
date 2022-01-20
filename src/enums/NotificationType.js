import BaseEnum from './BaseEnum';

export default class NotificationType extends BaseEnum {
    static REGISTRATION = 'REGISTRATION';
    static PIECE_REQUEST = 'PIECE_REQUEST';
    static COMMUNITY_INVITATION = 'COMMUNITY_INVITATION';

    static READ = 'READ';
    static UNREAD = 'UNREAD';
    static DELETED = 'DELETED';
}
