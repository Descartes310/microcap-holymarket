import BaseEnum from './BaseEnum';

export default class UserType extends BaseEnum {
    static EXPLOITANT = 'EXPLOITANT';
    static USER = 'USER';
    static MANAGER = 'MANAGER';
    static ORGANISATION = 'ORGANISATION';
    static PERSON = 'PERSON';
}
