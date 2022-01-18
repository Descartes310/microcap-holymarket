import Countries from '../data/countriesSpec.json';

class CountryManager {
    constructor() {
        this.countries = Countries;
        // Countries.data.filter(c => c.callingCodes.length === 0);
    }

    countryWithNumberAndFlag = () => {
        return  this.countries.map(c => ({phonePrefixes: c.callingCodes, flag: c.flag, id: c.alpha3Code})).filter(c => c.phonePrefixes[0]);
    };

    get optionsNameAndFlag() {
        return this.countryWithNameAndFlag();
    };

    get optionsNumberAndFlag() {
        return this.countryWithNumberAndFlag();
    };

    filterOptionsNameAndFlag = (candidate, input) => {
        if (input) {
            return candidate.data.name.toLowerCase().includes(input.toLowerCase());
        }
        return true;
    };

    filterOptionsCodeAndFlag = (candidate, input) => {
        if (input) {
            return candidate.data.phonePrefixes[0].toLowerCase().startsWith(input.toLowerCase());
        }
        return true;
    };

    countryWithNameAndFlag = () => {
        return  this.countries.map(c => ({name: c.name, flag: c.flag, id: c.alpha3Code}));
    };

    getCountryWithNameAndFlagFromId = (id) => {
        const item = this.countries.find(c => c.alpha3Code === id);
        return item ? {name: item.name, flag: item.flag, id: item.alpha3Code} : {};
    };

    getCountryFromId = (id) => {
        const item = this.countries.find(c => c.alpha3Code === id);
        return item ? {...item, phonePrefixes: item.callingCodes} : {};
    };
}

export default new CountryManager();
