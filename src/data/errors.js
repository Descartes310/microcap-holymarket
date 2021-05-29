export default {
    OTHERS: {
        BRANCH_NOT_FOUND: {
            NAME: 'BRANCH_NOT_FOUND',
            MESSAGE: "Branche non trouvé",
            DESCRIPTION: `"the branch with url "+branch_url+" was not found"`
        },
        USER_EMAIL_ALREADY_EXIST: {
            NAME: 'USER_EMAIL_ALREADY_EXIST',
            MESSAGE: "Cette email est deja pris. Veuillez en choisis en autre.",
            DESCRIPTION: `"the branch with url "+branch_url+" was not found"`
        },
        PERSON_IDENTIFICATION_ALREADY_ASSIGNED: {
            NAME: 'PERSON_IDENTIFICATION_ALREADY_ASSIGNED',
            MESSAGE: "Cette identification est deja en cours d'utilisation",
            DESCRIPTION: `"Identification value '" + identification_value + "' is already assigned !"`
        },
        USER_NOT_CREATED: {
            NAME: 'USER_NOT_CREATED',
            MESSAGE: "L'utilisateur n'a pas pu être créé",
            DESCRIPTION: `"The user was not created"`
        },
        PERSON_NOT_CREATED: {
            NAME: 'PERSON_NOT_CREATED',
            MESSAGE: "L'utilisateur n'a pas pu être créé",
            DESCRIPTION: `"The user was not created"`
        },
        ORGANISATION_WITH_REFERENCE_NOT_FOUND: {
            NAME: 'ORGANISATION_WITH_REFERENCE_NOT_FOUND',
            MESSAGE: "Organisation non trouvé"
        },
        PROFILE_PFM_NOT_FOUND: {
            NAME: 'PROFILE_PFM_NOT_FOUND',
            MESSAGE: "Le profile PFM n'a pas pu être trouvé",
            DESCRIPTION: "The profile PFM was not found !",
        },
        PROFILE_NOT_FOUND: {
            NAME: 'PROFILE_NOT_FOUND',
            MESSAGE: "Le profile mentioné n'a pas pu être trouvé",
            DESCRIPTION: "The profile with id was not found !",
        },
        ORGANISATION_NOT_FOUND: {
            NAME: 'ORGANISATION_NOT_FOUND',
            MESSAGE: "Organisation non trouvé",
            DESCRIPTION: `"Organisation with id '" + organisation_id + "' was not found !"`,
        },
        MAX_ADMIN_REACHED: {
            NAME: 'MAX_ADMIN_REACHED',
            MESSAGE: "Le nombre maximun d'administrateur est atteint",
            DESCRIPTION: `"The numbers max of admins is reached !"`,
        },
        IMMATRICULATION_ORGANISATION_ALREADY_EXIST: {
            NAME: 'IMMATRICULATION_ORGANISATION_ALREADY_EXIST',
            MESSAGE: "L'immatriculation de l'organiation existe deja",
            DESCRIPTION: `"Immatriculation value '" + immatriculation_value + "' is already assigned !"`,
        },
        USER_WITH_REFERENCE_NOT_FOUND: {
            NAME: 'USER_WITH_REFERENCE_NOT_FOUND',
            MESSAGE: "L'utilisateur ayant cette référence n'a pas pu être trouvé",
            DESCRIPTION: `"User with reference '" + id + "' was not found !"`,
        },
        USER_ORGANISATION_NOT_FOUND: {
            NAME: 'USER_ORGANISATION_NOT_FOUND',
            MESSAGE: "L'utilisateur ayant cette référence n'a pas pu être trouvé",
            DESCRIPTION: `"Organisation of user '" + user.getId() + "' was not found !"`,
        },
        PARTNERSHIP_TYPE_NOT_FOUND: {
            NAME: 'PARTNERSHIP_TYPE_NOT_FOUND',
            MESSAGE: "L'utilisateur ayant cette référence n'a pas pu être trouvé",
            DESCRIPTION: `"Type of partnership with id '" + id_profile + "' was not found !"`,
        },
        ACCESS_NOT_ALLOWED: {
            NAME: 'ACCESS_NOT_ALLOWED',
            MESSAGE: "Vous n'êtes pas authorisé de vous connecté avec ces access!",
            DESCRIPTION: `"You are not allowed to login with this access !"`,
        },
        BRANCH_NOT_ACTIVATED: {
            NAME: 'BRANCH_NOT_ACTIVATED',
            MESSAGE: "Cette branche est inactive !",
            DESCRIPTION: `"This branch is not activated !"`,
        },
        BRANCH_NOT_RUNNING: {
            NAME: 'BRANCH_NOT_RUNNING',
            MESSAGE: "Cette branche n'est pas en activité !",
            DESCRIPTION: `"This branch is not running !"`,
        },
        BRANCH_NOT_CONFIRM: {
            NAME: 'BRANCH_NOT_CONFIRM',
            MESSAGE: "Cette branche n'est pas en confirmé !",
            DESCRIPTION: `"This branch is not running !"`,
        },
        USER_NOT_CONNECTED: {
            NAME: 'USER_NOT_CONNECTED',
            MESSAGE: "Vous n'êtes pas connecté !",
            DESCRIPTION: `"You are not connected !"`,
        },
        USER_WITH_EMAIL_NOT_FOUND: {
            NAME: 'USER_WITH_EMAIL_NOT_FOUND',
            MESSAGE: "Aucun utilisateur trouvé pour cette email",
            DESCRIPTION: `"The user with email '"+ email +"' was not found !"`,
        },
        OLD_USER_LINK_NOT_YET_USE: {
            NAME: 'OLD_USER_LINK_NOT_YET_USE',
            MESSAGE: "Le précédent lien envoyé n'a pas encore été utilisé",
            DESCRIPTION: `"The old link sent to '"+ email +"' was not used yet !"`,
        },
        TOKEN_NOT_CORRECT_FOR_EMAIL: {
            NAME: 'BRANCH_NOT_RUNNING',
            MESSAGE: "Le token envoyé n'est pas correct !",
            DESCRIPTION: `"The token provided is not correct for this email."`,
        },
        TOKEN_EXPIRED: {
            NAME: 'TOKEN_EXPIRED',
            MESSAGE: "Ce token est expiré !",
            DESCRIPTION: `"The token '"+ token +"' expired please retry !"`,
        },
        CATALOG_NOT_FOUND: {
            NAME: 'CATALOG_NOT_FOUND',
            MESSAGE: "Le catalog n'a pas pu être trouvé",
            DESCRIPTION: `"Catalog with id '" + id + "' was not found !"`,
        },
        CATALOG_NAME_ALREADY_EXIST: {
            NAME: 'CATALOG_NAME_ALREADY_EXIST',
            MESSAGE: "Un catalogue existe déja avec ce nom",
            DESCRIPTION: `"Name '" + name + "' is already assigned !"`,
        },
        PARTNER_NOT_FOUND: {
            NAME: 'PARTNER_NOT_FOUND',
            MESSAGE: "Ce partenaire n'a pas pu être trouvé",
            DESCRIPTION: `"The user with id '" + partner_id + "' was not found`,
        },
        TYPE_PRODUCT_NOT_FOUND: {
            NAME: 'TYPE_PRODUCT_NOT_FOUND',
            MESSAGE: "Le type de produit n'a pas pu être trouvé",
            DESCRIPTION: `"The type product with id  " + item.getLong("id") + " was not found !"`,
        },
        PACKAGE_NOT_FOUND: {
            NAME: 'PACKAGE_NOT_FOUND',
            MESSAGE: "Package non trouvé",
            DESCRIPTION: `The package with id  " + item.getLong("id") + " was not found !"`,
        },
        PRODUCT_LIST_NOT_CORRECT: {
            NAME: 'PRODUCT_LIST_NOT_CORRECT',
            MESSAGE: "Les types de produit sont incorrect",
            DESCRIPTION: `"The array of type product was not correct: " + e.getMessage()`,
        },

    },
    PLAN: {
        NAME_ASSIGNED: {
            NAME: 'plan/name-assigned',
            MESSAGE: "request.error.plan.nameAssigned",
            DESCRIPTION: `"The plan with name " +name+ " already exists"`
        },
        PERMISSION_PARSING_ERROR: {
            NAME: "plan/permission-parsing-error",
            MESSAGE: "request.error.plan.permissionParsingError",
            DESCRIPTION: `"Error while parsing permission, some fields are missing"`
        },
        FEATURE_PARSING_ERROR: {
            NAME: "plan/feature-parsing-error",
            MESSAGE: "request.error.plan.featureParsingError",
            DESCRIPTION: `"Error while parsing feature, some fields are missing"`
        },
        NOT_FOUND: {
            NAME: "plan/not-found",
            MESSAGE: "request.error.plan.notFound",
            DESCRIPTION: `"The plan with id "+plan_id+" was not found !"`
        },
        MAX_ACTIVATED_PLAN_REACHED: {
            NAME: "plan/max-activated-plan-reached",
            MESSAGE: "request.error.plan.maxActivatedPlanReached",
            DESCRIPTION: `"You have already activated three plans"`
        },
    },
    DISCOUNT: {
        NOT_FOUND: {
            NAME: "discount/not-found",
            MESSAGE: "request.error.discount.notFound",
            DESCRIPTION: `"The discount with id "+plan_id+" was not found !"`
        },
    },
    AUTH: {
        BLOCKED_USER: {
            NAME: "auth/blocked-user",
            MESSAGE: "request.error.auth.blockedUser",
            DESCRIPTION: `"Sorry, you are not allowed to login to this association"`
        },
        NOT_ALLOWED: {
            NAME: "auth/not-allowed",
            MESSAGE: "request.error.auth.notAllowed",
            DESCRIPTION: `"Sorry, you are not allowed to login to this association"`
        }
    },
    SAMPLE_COMMUNITY: {
        SUB_DOMAIN_NOT_UNIQUE: {
            NAME: "sample-community/subdomain-not-unique",
            MESSAGE: "request.error.sampleCommunity.subDomainNotUnique",
            DESCRIPTION: `"A community with sub damine "+sub_domain+" was already exists !"`
        },
    },
    USER: {
        LOGIN_NOT_UNIQUE: {
            NAME: "user/login-not-unique",
            MESSAGE: "request.error.user.loginNotUnique",
            DESCRIPTION: `"A manager with this login is already defined"`
        },
        NOT_CONNECTED: {
            NAME: "user/not-connected",
            MESSAGE: "request.error.user.notConnected",
            DESCRIPTION: `"Sorry, you are not connected !"`
        },
    }
};

export const ERROR_401 = 'Connexion expiré. Veuillez vous reconnecté à nouveau.';
export const ERROR_403 = "Vous n'avez pas les droits pour effectuer cette action.";
export const ERROR_404 = "Non trouvé. Veuillez ressayer plus tard.";
export const ERROR_500 = 'Une erreur est survenue. Veuillez ressayer plus tard';

