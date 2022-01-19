import BaseEnum from './BaseEnum';

export default class Territories extends BaseEnum {
    static COMMERCIAL = 'COMMERCIAL';
    static REGLEMENTARY = 'REGLEMENTARY';
    static INTERN_TO_INTERN = 'INTERN_TO_INTERN';
    static INTERN_TO_ORGANISATION = 'INTERN_TO_ORGANISATION';
    static SCOLARY = 'SCOLARY';
    static ADMINISTRATION = 'ADMINISTRATION';

    static MAINLAND = "MAINLAND";
    static MAINLAND_REGION = "MAINLAND_REGION";
    static COUNTRY = "COUNTRY";
    static COUNTRY_REGION = "COUNTRY_REGION";
    static CITY = "CITY";
    static STREET = "STREET";
}
