import api from 'Api';
import {AUTH, SYSTEM_OBJECT, joinBaseUrlWithParams} from "../services/backendRoute";
import CountryManager from "Helpers/CountryManager";

export const getResidenceCountries = (shouldReject = false) => {
    return new Promise((resolve, reject) => {
        api.get(AUTH.COUNTRY.LIST)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
    /*return new Promise((resolve, reject) => {
        setTimeout(() => {
            !shouldReject ? resolve(CountryManager.countryWithNameAndFlag().slice(0, 10).map(c => c.name)) : reject();
        }, 3000);
    });*/
};

export const getOperators = (country) => {
    return new Promise((resolve, reject) => {
        const url = joinBaseUrlWithParams(AUTH.COUNTRY.OPERATORS, [{
            param: 'country',
            value: country,
        }]);
        api.get(url)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getIdentificationType = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.IDENTIFICATION)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getRegistrationType = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.REGISTRATION_TYPE)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getOrganisationTypes = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.ORGANISATION)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};
