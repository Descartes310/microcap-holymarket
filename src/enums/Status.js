import BaseEnum from './BaseEnum';

export default class Status extends BaseEnum {
    static EMPTY = 'EMPTY';
    static PENDING = 'PENDING';
    static ACCEPTED = 'ACCEPTED';
    static REJECTED = 'REJECTED';
    static CANCELLED = 'CANCELLED';
    static CONFIRMED = 'CONFIRMED';
    static SUSPENDED = 'SUSPENDED';
}
