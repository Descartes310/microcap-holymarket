import api from 'Api';
import {AUTH, SYSTEM_OBJECT, joinBaseUrlWithParams, BRANCH} from "Url/backendUrl";

export const getResidenceCountries = () => {
    return new Promise((resolve, reject) => {
        api.get(AUTH.COUNTRY.LIST)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
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

export const getOrganisationPosts = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.ORGANISATION_POST)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const sendResetPasswordLink = (email) => {
    return new Promise((resolve, reject) => {
        /*const url = joinBaseUrlWithParams(AUTH.RESET_PASSWORD.LINK, [{
            param: 'email',
            value: email,
        }]);*/
        const url = AUTH.RESET_PASSWORD.LINK + `?email=${email}`;

        api.get(url)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const resetPassword = (data) => {
    return new Promise((resolve, reject) => {
        api.post(AUTH.RESET_PASSWORD.MAIN, data)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createBranch = (data, config) => {
    return new Promise((resolve, reject) => {
        api.post(BRANCH.CREATE, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};
