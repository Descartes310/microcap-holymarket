import Countries from '../data/countriesSpec.json';

class CountryManager {
    constructor() {
        this.countries = Countries.data;
        // Countries.data.filter(c => c.callingCodes.length === 0);
    }

    countryWithNumberAndFlag = () => {
        return  this.countries.map(c => ({phonePrefixes: c.callingCodes, flag: c.flag, id: c.alpha3Code}));
    };

    countryWithNameAndFlag = () => {
        return  this.countries.map(c => ({name: c.name, flag: c.flag, id: c.alpha3Code}));
    };

    getCountryWithNameAndFlagFromId = (id) => {
        const item = this.countries.find(c => c.alpha3Code === id);
        return item ? {name: item.name, flag: item.flag, id: item.alpha3Code} : {};
    };
}

export default new CountryManager();
