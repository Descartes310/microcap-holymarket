export default {
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

