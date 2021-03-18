import api from 'Api';
import {
    AUTH,
    SYSTEM_OBJECT,
    joinBaseUrlWithParams,
    BRANCH,
    NETWORK_PROFILE,
    CATALOGS,
    CATEGORY_PRODUCTS,
    ACCOUNT,
    SETTING,
    PRODUCTS,
    PRODUCT_TYPE,
    USER_PROFILE, NETWORK_PROFILE_TYPE, USERS,
    COMMUNITY_MEMBER, COMMUNITY, PACKAGES, COMMERCIAL_MANAGEMENT, joinBaseUrlWithParamsId,
    ORDER, SALES, GENERIC_OBJECT,
    ACCESS, NOTIFICATIONS, NOTIFICATIONS as NOTIFICATIONS_API, PROJECTS
} from "Url/backendUrl";
import { SET_CURRENT_COMMUNITY, SET_CURRENT_COMMUNITY_SUCCESS } from "Actions/types";

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

export const getOrganisations = (id) => {
    const url = `${USERS.GET_ALL_ORGANISATIONS}?branch_id=${id}&type=USER`;
    return makeRequest('get', url);
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

export const getAccountsByBranch = (branchId) => {
    const url = `${USERS.ACCOUNTS.GET_ALL_BY_BRANCH}?branch_id=${branchId}`;
    return makeRequest('get', url);
};

export const findUsersByOrganisation = (organisationId) => {
    const url = `${USERS.GET_ALL_BY_ORGANISATION}?organisation_id=${organisationId}`;
    return makeRequest('get', url);
};

export const getMembersOfCommunity = (group) => {
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.USER.GROUPS.GET_MEMBERS, [{
        param: 'id',
        value: group,
    }]);
    return makeRequest('get', url);
};


export const getCommunitiesByBranch = (branch, user) => {
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.USER.GROUPS.GET_BY_BRANCH, [{
        param: 'id',
        value: branch,
    }, {
        param: 'user_id',
        value: user
    }]);
    return makeRequest('get', url);
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

export const getOrganisationByReference = (id) => {
    const url = joinBaseUrlWithParams(USERS.GET_ORGANISATION_REFERENCE, [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('get', url);
};

export const getPartnersByBranch = (id) => {
    const url = joinBaseUrlWithParams(USERS.GET_ALL_PARTNER, [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('get', url);
};

export const getPartnersOperatorByBranch = (id, country) => {
    const url = joinBaseUrlWithParams(USERS.GET_ALL_PARTNER_OPERATOR + '?country=' + country, [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('get', url);
};

export const getPartnersOperatorByMe = (id) => {
    const url = joinBaseUrlWithParams(USERS.GET_ALL_PARTNER_OPERATOR_ME, [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('get', url);
};

export const getAllSettings = (id) => {
    const url = joinBaseUrlWithParams(SETTING.GET_ALL, [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('get', url);
};

export const getAllSettingsByName = (id, name) => {
    const url = joinBaseUrlWithParams(`${SETTING.GET_ALL_BY_NAME}?name=${name}`, [{
        param: 'id',
        value: id,
    }]);
    return makeRequest('get', url);
};

export const getAllSettingsByNameAndUrl = (id, name) => {
    const url = `${AUTH.GET_ALL_BY_NAME_AND_URL}?name=${name}&url=${id}`;
    return makeRequest('get', url);
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

export const createPartner = (id, contract, type) => {
    const url = joinBaseUrlWithParamsId(`${USERS.CREATE.PARTNER}?contract_number=${contract}&id_profile=${type}`, id);
    return makeRequest('post', url, null);
};

export const addProductsToOneCatalog = (data, catalogId, branchId) => {
    let url = joinBaseUrlWithParams(CATALOGS.TYPE_PRODUCTS.ADD, [{
        param: 'id',
        value: catalogId,
    }]);
    url = `${url}?type_products=${encodeURIComponent(data)}`;
    return makeRequest('post', url, null, { shouldSkipDataParsing: true });
};

export const getProductsFromCatalog = (catalogId) => {
    let url = joinBaseUrlWithParams(CATALOGS.TYPE_PRODUCTS.GET, [{
        param: 'id',
        value: catalogId,
    }]);
    return makeRequest('get', url);
};

export const removeProductsToOneCatalog = (data, catalogId, branchId) => {
    let url = joinBaseUrlWithParams(CATALOGS.TYPE_PRODUCTS.REMOVE, [{
        param: 'id',
        value: catalogId,
    }]);
    url = `${url}?type_products=${encodeURIComponent(data)}`;
    return makeRequest('post', url, null, { shouldSkipDataParsing: true });
};

export const getOneCatalog = (catalogId) => {
    let url = joinBaseUrlWithParams(CATALOGS.GET_ONE, [{
        param: 'id',
        value: catalogId,
    }]);
    return makeRequest('get', url);
};

export const getAllCatalogs = (partnerId, type = null) => {
    let url = '';
    if (type != null)
        url = `${CATALOGS.GET_ALL}?partner_id=${partnerId}&type=${type}`;
    else
        url = `${CATALOGS.GET_ALL}?partner_id=${partnerId}`;
    return makeRequest('get', url);
};

export const createCategoryProducts = (data, branchId) => {
    const url = `${CATEGORY_PRODUCTS.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createProductType = (data, branchId, config) => {
    const url = `${PRODUCT_TYPE.CREATE}?branch_id=${branchId}`;
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createUserProfile = (data, branchId) => {
    const url = `${USER_PROFILE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const createNetworkProfileType = (data, branchId) => {
    const url = `${NETWORK_PROFILE_TYPE.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const getUser = (id = null) => {
    let url = '';
    if (id)
        url = `${USERS.GET_ONE}?id=${id}`;
    else
        url = `${USERS.GET_ONE}`;

    return makeRequest('get', url);
};

export const getCurrencies = () => {
    const url = `${SETTING.CURRENCIES}`;
    return makeRequest('get', url);
};

export const getConsolidationBalance = (id) => {
    const url = joinBaseUrlWithParamsId(`${ACCOUNT.CONSOLIDATION_BALANCE}`, id);
    return makeRequest('get', url);
};

export const createUsers = (data, branchId) => {
    const url = `${USERS.CREATE.PERSON}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const updateUsers = (data) => {
    const url = `${USERS.UPDATE.PERSON}`;
    return makeRequest('put', url, data);
};

export const createCommunityNonConventionated = (data, branchId, userId, config) => {
    const url = `${COMMUNITY_MEMBER.USER.CREATE.NON_CONVENTIONAL}?branch_id=${branchId}&user_id=${userId}`;
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const searchUsers = (data) => {
    const url = `${USERS.SEARCH}?email=${data}`;
    return makeRequest('get', url);
};

export const getBranchProfile = (type, branchId) => {
    const url = `${USER_PROFILE.GET_ALL}?branch_id=${branchId}&type=${type}`;
    return makeRequest('get', url);
};

export const sendManyInvitations = (groupId, usersId) => {
    let url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.SEND.MANY, [{
        param: 'group_id',
        value: groupId,
    }]);
    url = `${url}?users=${encodeURIComponent(usersId)}`;
    return makeRequest('get', url);
};

export const addOperator = (id, userId) => {
    let url = joinBaseUrlWithParams(COMMUNITY_MEMBER.USER.GROUPS.ADD_OPERATOR, [{
        param: 'id',
        value: id,
    }]);
    url = `${url}?org=${userId}`;
    return makeRequest('get', url);
};

export const invitationSent = (groupId) => {
    let url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.SEND.INVITATIONS, [{
        param: 'id',
        value: groupId,
    }]);
    return makeRequest('get', url);
};

export const requestsReceived = (groupId) => {
    let url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.SEND.REQUESTS, [{
        param: 'id',
        value: groupId,
    }]);
    return makeRequest('get', url);
};

export const sendRequestInvitation = (groupId, userId, data = null) => {
    let url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.SEND.REQUEST, [
        {
            param: 'group_id',
            value: groupId,
        },
        {
            param: 'user_id',
            value: userId,
        }

    ]);
    return makeRequest('post', url, data, { shouldSkipDataParsing: true });
};

export const acceptInvitation = (invitationId) => {
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.ACCEPT, [{
        param: 'invitation_id',
        value: invitationId,
    }]);
    return makeRequest('put', url);
};

export const cancelInvitation = (invitationId) => {
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.CANCEL, [{
        param: 'invitation_id',
        value: invitationId,
    }]);
    return makeRequest('put', url);
};

export const deleteInvitation = (invitationId) => {
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.DELETE, [{
        param: 'invitation_id',
        value: invitationId,
    }]);
    return makeRequest('put', url);
};

/********************************  ***************************************** */
export const sendInvitationCommunityMember = (data) => {
    console.log(data)
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.INVITATIONS.SEND.ONE, [
        {
            param: 'group_id',
            value: data.group_id,
        }
    ]);
    return makeRequest('post', url, data, { shouldSkipDataParsing: true });
};
/********************************************************************** */
/*****************************  ***************************************** */
export const createPostProject = (data) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.POST_PROJETS.CREATE, data.branchId);
    return makeRequest('post', url, data);
};

export const createVoucher = (id, data) => {
    const url = joinBaseUrlWithParamsId(COMMUNITY_MEMBER.USER.GROUPS.CREATE_VOUCHER, id);
    return makeRequest('post', url, data);
};

export const getVouchers = (id, user, type) => {
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.USER.GROUPS.GET_VOUCHERS, [
        {
            param: 'id',
            value: id,
        }, {
            param: 'user_id',
            value: user,
        }, {
            param: 'type',
            value: type,
        }
    ]);
    return makeRequest('get', url);
};

export const getUserVouchers = () => {
    const url = COMMUNITY_MEMBER.USER.GROUPS.GET_VOUCHERS_FOR_USER;
    return makeRequest('get', url);
};

export const getUserAccounts = (id) => {
    const url = joinBaseUrlWithParamsId(PRODUCTS.GET_FOR_USER, id);
    return makeRequest('get', url);
};

export const getUserClientExp = (id) => {
    const url = joinBaseUrlWithParamsId(USERS.PIECE.GET_ALL, id);
    return makeRequest('get', url);
};

export const getUserClient = (id) => {
    const url = joinBaseUrlWithParamsId(USERS.PIECE.GET_USER, id);
    return makeRequest('get', url);
};

export const getUserPieces = () => {
    const url = USERS.PIECE.GET_CONNECTED_USER;
    return makeRequest('get', url);
};

export const deleteUserClient = (id) => {
    const url = joinBaseUrlWithParamsId(USERS.PIECE.DELETE_FOR_USER, id);
    return makeRequest('get', url);
};

export const getCommunityAdmins = (id) => {
    const url = joinBaseUrlWithParamsId(COMMUNITY_MEMBER.USER.GROUPS.GET_ADMINS, id);
    return makeRequest('get', url);
};

export const getAccountDetails = (id) => {
    const url = joinBaseUrlWithParamsId(ACCOUNT.GET_ONE, id);
    return makeRequest('get', url);
};

export const getAccountTransactions = (id) => {
    const url = joinBaseUrlWithParamsId(ACCOUNT.GET_TRANSACTIONS, id);
    return makeRequest('get', url);
};

export const getUserSales = (id) => {
    const url = joinBaseUrlWithParamsId(SALES.GET_BY_USER, id);
    return makeRequest('get', url);
};

export const approvisioningVoucher = (id, data) => {
    const url = joinBaseUrlWithParamsId(ACCOUNT.APPROVISIONING_VOUCHER, id);
    return makeRequest('post', url, data);
};

export const approvisioningCard = (id, data) => {
    const url = joinBaseUrlWithParamsId(ACCOUNT.APPROVISIONING_CARD, id);
    return makeRequest('post', url, data);
};

export const getSaleProducts = (id) => {
    const url = joinBaseUrlWithParamsId(SALES.GET_ONE, id);
    return makeRequest('get', url);
};

export const getOrderDetails = (id) => {
    const url = joinBaseUrlWithParamsId(ORDER.GET_ONE_SALE, id);
    return makeRequest('get', url);
};

export const getOrderPayments = (id) => {
    const url = joinBaseUrlWithParamsId(ORDER.GET_ALL_PAYMENT, id);
    return makeRequest('get', url);
};

/* export const getAllPostProject = (branchId) => {
    const url = joinBaseUrlWithParams(PROJECTS.POST_PROJETS.GET_ALL, [{
        param: 'branchId',
        value: branchId
    }]);
    return makeRequest('get', url);
}; */
/*****************************  ***************************************** */

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
    const url = `${COMMERCIAL_MANAGEMENT.OFFER.CREATE}?branch_id=${branchId}`;
    // return makeRequest('post', url, data);
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const addProductToOffer = (data, id) => {
    const url = joinBaseUrlWithParamsId(`${COMMERCIAL_MANAGEMENT.OFFER.ADD_PRODUCT}`, id);
    return makeRequest('post', url, data);
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

export const changeCurrency = (accountId, currencyId) => {
    const url = joinBaseUrlWithParamsId(`${ACCOUNT.CHANGE_CURRENCY}?currency_id=${currencyId}`, accountId);
    return makeRequest('put', url);
};

export const updateUserCurrency = (currencyId) => {
    const url = joinBaseUrlWithParamsId(`${USERS.UPDATE_CURRENCY}`, currencyId);
    return makeRequest('put', url);
};

export const setOfferActivationStatus = (partnerId, comId, shouldActivate) => {
    const url = `${COMMERCIAL_MANAGEMENT.OFFER[shouldActivate ? 'ACTIVATE' : 'DEACTIVATE']}?partner_id=${partnerId}&commercial_offer_id=${comId}`;
    return makeRequest('put', url);
};

export const getProductItemAvailable = (productId, productType) => {
    const url = joinBaseUrlWithParamsId(`${PRODUCT_TYPE.AVAILABLE}?type=${productType}`, productId);
    return makeRequest('get', url);
};

export const getOneProductType = (productId) => {
    const url = joinBaseUrlWithParamsId(PRODUCT_TYPE.GET_ONE, productId);
    return makeRequest('get', url);
};

export const getOneProductTypeFromCommercialOffer = (productId, type) => {
    const url = joinBaseUrlWithParamsId(`${PRODUCT_TYPE.GET_ONE}?type=${type}`, productId);
    return makeRequest('get', url);
};

export const getOneProductTypeFullInfos = (productId, type) => {
    const url = joinBaseUrlWithParamsId(`${PRODUCT_TYPE.GET_ONE_FULL}?type=${type}`, productId);
    return makeRequest('get', url);
};

export const getAccountsByUnit = (id = null) => {
    let url = ACCOUNT.GET_ALL_BY_UNIT;
    if (id)
        url = url + '?id=' + id
    return makeRequest('get', url);
};

export const placeOrder = (data) => {
    return makeRequest('post', ORDER.CREATE, data);
};

export const getOrder = (orderId) => {
    const url = joinBaseUrlWithParamsId(ORDER.GET_ONE, orderId);
    return makeRequest('get', url);
};

export const getOrders = () => {
    const url = ORDER.GET_ALL;
    return makeRequest('get', url);
};

export const getUnitTypes = () => {
    const url = SETTING.UNIT_TYPE;
    return makeRequest('get', url);
};

export const getUnits = (id) => {
    const url = joinBaseUrlWithParamsId(SETTING.UNIT, id);
    return makeRequest('get', url);
};

export const getUnitbyType = (id) => {
    const url = joinBaseUrlWithParamsId(SETTING.GET_UNIT, id);
    return makeRequest('get', url);
};

export const createSale = (data) => {
    return makeRequest('post', SALES.CREATE, data);
};

export const createUnitType = (data) => {
    return makeRequest('post', SETTING.UNIT_TYPE, data);
};

export const createUnit = (data) => {
    return makeRequest('post', SETTING.UNIT, data);
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
    const data = notificationType !== '' ? { notificationType } : {};
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

export const changeNotificationStatus = (id) => {
    const url = `${NOTIFICATIONS.GET_ALL}?notification_id=${id}`;
    return makeRequest('put', url, null);
};

export const getCountUnreadNotifications = (userId) => {
    const url = `${NOTIFICATIONS.SELF.COUNT_UNREAD}?user_id=${userId}`;
    return makeRequest('get', url);
};

export const createNotificationsService = (branchId, data) => {
    const url = `${NOTIFICATIONS.SELF.CREATE}?branch_id=${branchId}`;
    return makeRequest('post', url, data);
};

export const getUsersAccounts = (branchId, type = null) => {
    let url = '';
    if (type)
        url = `${USERS.ACCOUNTS.GET_ALL_BY_BRANCH}?branch_id=${branchId}&type=${type}`;
    else
        url = `${USERS.ACCOUNTS.GET_ALL_BY_BRANCH}?branch_id=${branchId}`;
    return makeRequest('get', url);
};

export const createUsersAccounts = (data) => {
    const url = `${USERS.ACCOUNTS.CREATE}?label=${data.label}&description=${data.description}&branch_id=${data.branchId}&type=${data.type}`;
    return makeRequest('post', url, null);
};

export const askValidationCode = (userId) => {
    const url = joinBaseUrlWithParamsId(USERS.VALIDATION.SEND_OTP, userId);
    return makeRequest('post', url);
};

export const verifyCode = (userId, otp, notification_id) => {
    const url = joinBaseUrlWithParamsId(USERS.VALIDATION.VERIFY, userId);
    return makeRequest('put', url, { otp, notification_id });
};

export const activateBranch = (data) => {
    return makeRequest('post', `${BRANCH.ACTIVATION}?branch_url=${window.location.host}`, data);
};

export const addUserToProfile = (userId, reference, type) => {
    const url = joinBaseUrlWithParamsId(type === 'network-profile' ? NETWORK_PROFILE.ADD_USER_TO_ROLE : USER_PROFILE.ADD_USER, userId);
    return makeRequest('post', url, { reference });
};

export const addPermissionToProfile = (permission, role) => {
    return makeRequest('post', `${USER_PROFILE.PERMISSION}?permission_id=${permission}&profile_id=${role}`, null, { shouldSkipDataParsing: true });
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

export const createUserPieceValue = (data) => {
    const url = `${USERS.PIECE.CREATE_FOR_USER}`;
    return makeRequest('post', url, data);
};

export const createProjectReaction = (data, config) => {
    const url = `${PROJECTS.REACTIONS.CREATE}`;
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getOneProjectReaction = (id) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.REACTIONS.GET_ONE, id);
    return makeRequest('get', url);
};

export const getAllProjectReaction = (id) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.REACTIONS.GET_ALL, id);
    return makeRequest('get', url);
};

export const createFolder = (data, config) => {
    const url = `${PROJECTS.FOLDERS.CREATE}`;
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const updateFolder = (id, data, config) => {
    const url = joinBaseUrlWithParamsId(`${PROJECTS.FOLDERS.ADD_WORK}`, id);
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const updateBook = (id) => {
    const url = joinBaseUrlWithParamsId(`${PROJECTS.FOLDERS.UPDATE_WORK}`, id);
    return makeRequest('get', url);
};

export const sortBook = (id, data) => {
    const url = joinBaseUrlWithParamsId(`${PROJECTS.FOLDERS.SORT_WORK}`, id);
    return makeRequest('post', url, data);
};

export const createUserPiece = (data, config) => {
    const url = `${USERS.PIECE.CREATE}`;
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const createBranchCGU = (data, config) => {
    const url = `${SETTING.CGU}`;
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const updateUserPieceValue = (data, config) => {
    const url = `${USERS.PIECE.UPDATE_FOR_USER}`;
    return new Promise((resolve, reject) => {
        api.post(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const updateUserAvatar = (data, config) => {
    const url = `${USERS.UPDATE.AVATAR}`;
    return new Promise((resolve, reject) => {
        api.put(url, data, config)
            .then(result => resolve(result.data))
            .catch(error => reject(error));
    });
};

export const getOneProjectFolder = (folderId) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.FOLDERS.GET_ONE, folderId);
    return makeRequest('get', url);
};

export const getOneProjectFolderByGroup = (groupId) => {
    const url = joinBaseUrlWithParamsId(PROJECTS.FOLDERS.GET_ONE_BY_GROUP, groupId);
    return makeRequest('get', url);
};

export const getBranchProjectFolder = () => {
    return makeRequest('get', PROJECTS.FOLDERS.GET_ALL_BY_BRANCH);
};

export const getAccountByAmount = (userId, amount) => {
    const data = `?amount=${amount}`;
    const url = joinBaseUrlWithParamsId(`${ACCOUNT.GET_ACCOUNT_BY_AMOUNT}${data}`, userId);
    return makeRequest('get', url);
};

export const createGroupPost = (data) => {
    const url = COMMUNITY_MEMBER.GROUP.CREATE_POST;
    return makeRequest('post', url, data);
};

export const createGroupSection = (data, id) => {
    const url = joinBaseUrlWithParamsId(`${COMMUNITY_MEMBER.GROUP.CREATE_SECTION}`, id);
    return makeRequest('post', url, data);
};

export const createPostMotivation = (data, id) => {
    const url = joinBaseUrlWithParamsId(`${COMMUNITY_MEMBER.GROUP.CREATE_MOTIVATION}`, id);
    return makeRequest('post', url, data);
};

export const getMainSections = (id) => {
    const url = joinBaseUrlWithParamsId(COMMUNITY_MEMBER.GROUP.GET_MAIN_SECTIONS, id);
    return makeRequest('get', url);
};

export const getAllSections = (id) => {
    const url = joinBaseUrlWithParamsId(COMMUNITY_MEMBER.GROUP.GET_ALL_SECTIONS, id);
    return makeRequest('get', url);
};

export const getGroupPosts = (id) => {
    const url = joinBaseUrlWithParamsId(COMMUNITY_MEMBER.GROUP.GET_POSTS, id);
    return makeRequest('get', url);
};

export const getAllGroupPosts = (id) => {
    const url = joinBaseUrlWithParamsId(BRANCH.GET_ALL_POSTS, id);
    return makeRequest('get', url);
};

export const getMotivations = (post_id) => {
    const url = joinBaseUrlWithParams(COMMUNITY_MEMBER.GROUP.GET_MOTIVATION_POSTS, [
        {
            param: 'post_id',
            value: post_id,
        }
    ])
    return makeRequest('get', url);
};

export const getChildSections = (id) => {
    const url = joinBaseUrlWithParamsId(COMMUNITY_MEMBER.GROUP.GET_CHILD_SECTIONS, id);
    return makeRequest('get', url);
};

export const getFavouritesGroups = () => {
    const url = COMMUNITY_MEMBER.USER.GROUPS.GET_FAVOURITES;
    return makeRequest('get', url);
};

export const getUsersBooks = (type = null) => {
    let url = null;
    if (type)
        url = `${PROJECTS.CONFIGURATION.WORKS.GET_ALL_USER}?type=${type}`;
    else
        url = PROJECTS.CONFIGURATION.WORKS.GET_ALL_USER;
    return makeRequest('get', url);
};

export const addGroupToFavourites = (id) => {
    const url = joinBaseUrlWithParamsId(`${COMMUNITY_MEMBER.USER.GROUPS.ADD_FAVOURITES}`, id);
    return makeRequest('post', url, null);
};