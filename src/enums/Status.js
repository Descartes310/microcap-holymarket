import BaseEnum from './BaseEnum';

export default class Status extends BaseEnum {
    static PENDING = 'PENDING';
    static CANCELLED = 'CANCELLED';
    static ACCEPTED = 'ACCEPTED';
    static EMPTY = 'EMPTY';
    static CONFIRMED = 'CONFIRMED';
}
