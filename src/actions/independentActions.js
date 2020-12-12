import api from 'Api';
import {
    AUTH,
    SYSTEM_OBJECT,
    joinBaseUrlWithParams,
    BRANCH,
    NETWORK_PROFILE,
    CATALOGS,
    CATEGORY_PRODUCTS,
    PRODUCT_TYPE,
    USER_PROFILE, NETWORK_PROFILE_TYPE, USERS,
    COMMUNITY, PACKAGES, COMMERCIAL_MANAGEMENT, joinBaseUrlWithParamsId,
    ORDER, SALES, GENERIC_OBJECT,
    ACCESS, NOTIFICATIONS, NOTIFICATIONS as NOTIFICATIONS_API, PROJECTS
} from "Url/backendUrl";
import {SET_CURRENT_COMMUNITY, SET_CURRENT_COMMUNITY_SUCCESS} from "Actions/types";

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

export const createNetworkProfilePartnership = (data, config) => {
    return new Promise((resolve, reject) => {
        api.post(NETWORK_PROFILE.PARTNERSHIP.CREATE, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createAssistantConfiguration = (data, config) => {
    return new Promise((resolve, reject) => {
        api.post(NETWORK_PROFILE.PARTNERSHIP.ASSISTANT.CREATE, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getNetworkProfile = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.NETWORK_PROFILE_TYPE)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createNetworkProfile = (data) => {
    return new Promise((resolve, reject) => {
        api.post(NETWORK_PROFILE.CREATE, data)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

const makeRequest = (verb, url, data = null, config = {}) => {
    return new Promise((resolve, reject) => {
        api[verb](url, data)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const setNetworkProfileConfigurationState = (shouldStart, id) => {
    const url = joinBaseUrlWithParams(BRANCH.CONFIGURATION[shouldStart ? 'START' : 'STOP'], [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('put', url);
};

export const getNetworkProfilePartnership = (branchId) => {
    return new Promise((resolve, reject) => {
        api.get(NETWORK_PROFILE.PARTNERSHIP.GET_ALL)
            .then(result => {
                const partner = result.data.filter(p => p.branch.id === branchId);
                resolve(partner);
            })
            .catch(error => reject(error));
    });
};

export const getAllNetworkProfilePartnershipForOneBranch = (branchId) => {
    return makeRequest('get', `${NETWORK_PROFILE.PARTNERSHIP.BRANCH_ALL}?branch_id=${branchId}`);
};

export const getAllAssistantForOneBranch = (branchId) => {
    return makeRequest('get', `${NETWORK_PROFILE.PARTNERSHIP.ASSISTANT.LIST}?branch_id=${branchId}`);
};

export const setActiveCatalog = (catalogId) => {
    const url = joinBaseUrlWithParams(CATALOGS.ACTIVATE, [{
        param: 'id',
        value: catalogId,
    }]);
    return makeRequest('get', url);
};

export const createCatalog = (data, branchId) => {
    const url = `${CATALOGS.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const addProductsToOneCatalog = (data, catalogId, branchId) => {
    let url = joinBaseUrlWithParams(CATALOGS.TYPE_PRODUCTS.ADD, [{
        param: 'id',
        value: catalogId,
    }]);
    url = `${url}?type_products=${encodeURIComponent(data)}`;
    return makeRequest('post', url, null, {shouldSkipDataParsing: true});
};

export const removeProductsToOneCatalog = (data, catalogId, branchId) => {
    let url = joinBaseUrlWithParams(CATALOGS.TYPE_PRODUCTS.REMOVE, [{
        param: 'id',
        value: catalogId,
    }]);
    url = `${url}?type_products=${encodeURIComponent(data)}`;
    return makeRequest('post', url, null, {shouldSkipDataParsing: true});
};

export const getOneCatalog = (catalogId) => {
    let url = joinBaseUrlWithParams(CATALOGS.GET_ONE, [{
        param: 'id',
        value: catalogId,
    }]);
    return makeRequest('get', url);
};

export const createCategoryProducts = (data, branchId) => {
    const url = `${CATEGORY_PRODUCTS.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createProductType = (data, branchId) => {
    const url = `${PRODUCT_TYPE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createUserProfile = (data, branchId) => {
    const url = `${USER_PROFILE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createNetworkProfileType = (data, branchId) => {
    const url = `${NETWORK_PROFILE_TYPE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createUsers = (data, branchId) => {
    const url = `${USERS.CREATE.PERSON}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createCommunityNonConventionated = (data, branchId) => {
    const url = `${COMMUNITY.USER.CREATE.NON_CONVENTIONAL}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const searchUsers = (data) => {
    const url = `${USERS.SEARCH}?email=${data}`;
    return makeRequest('get', url);
};

export const sendManyInvitations = (groupId, usersId) => {
    let url = joinBaseUrlWithParams(COMMUNITY.INVITATIONS.SEND.MANY, [{
            param: 'group_id',
            value: groupId,
    }]);
    url = `${url}?users=${encodeURIComponent(usersId)}`;
    return makeRequest('get', url);
};

export const sendRequestInvitation = (groupId) => {
    let url = joinBaseUrlWithParams(COMMUNITY.INVITATIONS.SEND.REQUEST, [{
        param: 'group_id',
        value: groupId,
    }]);
    return makeRequest('get', url);
};

export const acceptInvitation = (invitationId) => {
    const url = joinBaseUrlWithParams(COMMUNITY.INVITATIONS.ACCEPT, [{
        param: 'invitation_id',
        value: invitationId,
    }]);
    return makeRequest('put', url);
};

export const cancelInvitation = (invitationId) => {
    const url = joinBaseUrlWithParams(COMMUNITY.INVITATIONS.CANCEL, [{
        param: 'invitation_id',
        value: invitationId,
    }]);
    return makeRequest('put', url);
};

export const deleteInvitation = (invitationId) => {
    const url = joinBaseUrlWithParams(COMMUNITY.INVITATIONS.DELETE, [{
        param: 'invitation_id',
        value: invitationId,
    }]);
    return makeRequest('put', url);
};

export const getUserType = () => {
    return new Promise((resolve, reject) => {
        api.get(SYSTEM_OBJECT.USER_TYPE)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createPackage = (data, branchId) => {
    const url = `${PACKAGES.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createComOperationType = (data, branchId) => {
    const url = `${COMMERCIAL_MANAGEMENT.OPERATION_TYPE.GET_ALL}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createComOperation = (data, branchId) => {
    const url = `${COMMERCIAL_MANAGEMENT.OPERATION.GET_ALL}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createOffer = (data, branchId, config) => {
    const url = `${COMMERCIAL_MANAGEMENT.OFFER.GET_ALL}?branch_id=${branchId}`;
    // return makeRequest('post', url, data);
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getAllProductTypeBySale = (branchId) => {
    const url = `${PRODUCT_TYPE.GET_ALL_BY_SALE}?branch_id=${branchId}`;
    return makeRequest('get', url);
};

export const getRootProductType = (branchId) => {
    const url = `${PRODUCT_TYPE.ROOT}?branch_id=${branchId}`;
    return makeRequest('get', url);
};

export const setPackageActivationStatus = (packageId, shouldActivate) => {
    const url = `${PACKAGES[shouldActivate ? 'ACTIVATE' : 'DEACTIVATE']}?package_id=${packageId}`;
    return makeRequest('put', url);
};

export const setOfferActivationStatus = (packageId, shouldActivate) => {
    const url = `${COMMERCIAL_MANAGEMENT.OFFER[shouldActivate ? 'ACTIVATE' : 'DEACTIVATE']}?package_id=${packageId}`;
    return makeRequest('put', url);
};

export const getProductItemAvailable = (productId) => {
    const url = joinBaseUrlWithParamsId(PRODUCT_TYPE.AVAILABLE, productId);
    return makeRequest('get', url);
};

export const getOneProductType = (productId) => {
    const url = joinBaseUrlWithParamsId(PRODUCT_TYPE.GET_ONE, productId);
    return makeRequest('get', url);
};

export const placeOrder = (data) => {
    return makeRequest('post', ORDER.CREATE, data);
};

export const getOrder = (orderId) => {
    const url = joinBaseUrlWithParamsId(ORDER.GET_ONE, orderId);
    return makeRequest('get', url);
};

export const createSale = (data) => {
    return makeRequest('post', SALES.CREATE, data);
};

export const createGenericData = (data) => {
    return makeRequest('post', GENERIC_OBJECT.GET_ALL, data);
};

export const getGenericData = (type, branchId) => {
    const url = `${GENERIC_OBJECT.GET_ALL}?type=${type}&branch_id=${branchId}`;
    return makeRequest('get', url);
};

export const createMandateType = (data, branchId) => {
    const url = `${ACCESS.MANDATE.TYPE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createMandateModel = (data, branchId) => {
    const url = `${ACCESS.MANDATE.MODEL.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createMandate = (data, branchId) => {
    const url = `${ACCESS.MANDATE.SELF.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createAccess = (data, branchId) => {
    const url = `${ACCESS.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const getNotificationType = (notificationType = '') => {
    const url = `${NOTIFICATIONS.TYPE.GET_ALL}`;
    const data = notificationType !== '' ? {notificationType} : {};
    return makeRequest('get', url, data);
};

export const getNotificationModel = (notificationType = '') => {
    const data = notificationType !== '' ? `?notification_type_id=${notificationType}` : '';
    const url = `${NOTIFICATIONS.TYPE.GET_ALL}${data}`;
    return makeRequest('get', url);
};

export const createNotificationType = (data, branchId) => {
    const url = `${NOTIFICATIONS.TYPE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const getCountUnreadNotifications = (userId) => {
    const url = `${NOTIFICATIONS.SELF.COUNT_UNREAD}?user_id=${userId}`;
    return makeRequest('get', url);
};

export const createNotificationsService = (branchId, data) => {
    const url = `${NOTIFICATIONS.SELF.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createUsersAccounts = (data) => {
    const url = `${USERS.ACCOUNTS.CREATE}`;
    return makeRequest('post', url, data);
};

export const askValidationCode = (userId) => {
    const url = joinBaseUrlWithParamsId(USERS.VALIDATION.SEND_OTP, userId);
    return makeRequest('post', url);
};

export const verifyCode = (userId, otp) => {
    const url = joinBaseUrlWithParamsId(USERS.VALIDATION.VERIFY, userId);
    return makeRequest('put', url, {otp});
};

export const activateBranch = (data) => {
    return makeRequest('post', BRANCH.ACTIVATION, data);
};

export const addUserToProfile = (userId, reference, type) => {
    const url = joinBaseUrlWithParamsId(type === 'network-profile' ? NETWORK_PROFILE.ADD_USER_TO_ROLE : USER_PROFILE.ADD_USER, userId);
    return makeRequest('post', url, {reference});
};

export const getAllSampleBranch = () => {
    return makeRequest('get', BRANCH.SAMPLE.GET_ALL);
};

export const getOneSampleBranch = (sampleBranchId) => {
    const url = joinBaseUrlWithParamsId(BRANCH.SAMPLE.GET_ONE, sampleBranchId);
    return makeRequest('get', url);
};

export const saveSampleBranchStep = (step, data, config) => {
    return new Promise((resolve, reject) => {
        api.post(BRANCH.SAMPLE.STEP[`${step}`], data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createProjectWork = (data, branchId) => {
    const url = `${PROJECTS.CONFIGURATION.WORKS.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createProjectStandard = (data, branchId) => {
    const url = `${PROJECTS.CONFIGURATION.STANDARD.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const configureProjectStandard = (data, branchId) => {
    const url = `${PROJECTS.CONFIGURATION.STANDARD.CONFIGURATION}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const getProjectStandardModel = (projectStandardId) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.CONFIGURATION.STANDARD.MODELS.GET_ALL, projectStandardId);
    return makeRequest('get', url);
};

export const createModel = (data) => {
    const url = `${PROJECTS.CONFIGURATION.STANDARD.MODELS.CREATE}`;
    return makeRequest('post', url, data);
};

export const removeProjectStandardModel = (itemId) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.CONFIGURATION.STANDARD.MODELS.DELETE, itemId);
    return makeRequest('delete', url);
};

export const getOneProjectStandard = (projectStandardId) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.CONFIGURATION.STANDARD.GET_ONE, projectStandardId);
    return makeRequest('get', url);
};

export const createInitialisationOption = (data) => {
    const url = `${PROJECTS.CONFIGURATION.INITIALISATION.CREATE}`;
    return makeRequest('post', url, data);
};

export const createProjectStandardPresentation = (data) => {
    const url = `${PROJECTS.CONFIGURATION.STANDARD.PRESENTATION.CREATE}`;
    return makeRequest('post', url, data);
};

export const createProject = (data) => {
    const url = `${PROJECTS.SELF.CREATE}`;
    return makeRequest('post', url, data);
};
