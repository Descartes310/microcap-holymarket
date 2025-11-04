import { resourceLimits } from "worker_threads";

export const ACCOUNT_PERIOD_LIMIT = 60;

export const NDJANGUI_BUSINESS_NOMINAL_AMOUNT = 285120;

export const stripeZeroDecimalCurrencies = ["BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF", "HUF"];

export const getChainEventTypes = () => {
    return [
        {
            label: 'Activation du profile',
            value: 'ACTIVATE_PROFILE'
        },
        {
            label: 'Activation d\'un pass',
            value: 'PASS'
        },
        {
            label: 'Activation d\'un contrat',
            value: 'ACTIVATE_CONTRACT'
        },
        {
            label: 'Authentification',
            value: 'AUTHENTIFICATION'
        },
        {
            label: 'Obtention du numéro d\'adhésion',
            value: 'GET_MEMBERSHIP_NUMBER'
        },
        {
            label: 'Création d\'un partenariat de communauté conventionnée',
            value: 'COMMUNITY_PARTNERSHIP'
        }
    ];
}

export const getOrderTypes = () => {
    return [
        {
            label: 'Commande',
            value: 'ORDER'
        },
        {
            label: 'Pré-commande',
            value: 'PRE_ORDER'
        },
        {
            label: 'Bon de caisse',
            value: 'BOND'
        }
    ];
}

export const getPaymentMethods = () => {
    return [
        {
            label: 'Versements d\'espèces sur un compte bancaire',
            enabled: true,
            value: 'DEPOSIT'
        },
        {
            label: 'Carte bancaire',
            enabled: true,
            value: 'CREDIT_CARD'
        },
        {
            label: 'Virement bancaire',
            enabled: true,
            value: 'BANK_TRANSFER'
        },
        {
            label: 'Bon de caisse',
            enabled: true,
            value: 'TICKET'
        },
        {
            label: 'Prélèvement automatique sur le compte MicroCap',
            enabled: false,
            value: 'DIRECT_DEBIT'
        },
        {
            label: 'Chèque',
            enabled: false,
            value: 'CHECK'
        }
    ];
}

export const getNotificationMethods = () => {
    return [
        {
            label: 'Adresse e-mail de connexion',
            enabled: true,
            value: 'LOGIN_EMAIL'
        },
        {
            label: 'Adresse de notification',
            enabled: true,
            value: 'ADDRESS'
        },
        {
            label: 'Boite de notification espace personnel',
            enabled: true,
            value: 'PROFILE'
        }
    ];
}

export const getPaymentConfigNatures = () => {
    return [
        {
            label: 'Modèle',
            value: 'MODEL'
        },
        {
            label: 'Vente',
            value: 'SALE'
        }
    ];
}

export const getPaymentConfigTypes = () => {
    return [
        {
            label: 'Demande d\'encaissement',
            value: 'PAYMENT'
        }
    ];
}

export const getChainEventTypeValue = (value): any => {
    let type = getChainEventTypes().find(t => t.value === value);
    if (type)
        return type;
    else
        return {};
}

export const getIndirectSaleProcess = () => {
    return [
        {
            label: 'Demande de pièces',
            value: 'PIECES'
        }
    ];
}

export const getProductTypes = () => {
    return [
        {
            label: 'Codev',
            value: 'CODEV'
        }
    ];
}


export const getTimeUnits = () => {
    return [
        {
            label: 'Jour',
            value: 'DAY',
            days: 1,
            gap: 360
        },
        {
            label: 'Semaine',
            value: 'WEEK',
            days: 7,
            gap: 52
        },
        {
            label: 'Quizaine',
            value: 'BIWEEK',
            days: 14,
            gap: 24
        },
        {
            label: 'Mois',
            value: 'MONTH',
            days: 30,
            gap: 12
        },
        {
            label: 'Trimestre',
            value: 'TRIMESTER',
            days: 90,
            gap: 4
        },
        {
            label: 'Semestre',
            value: 'SEMESTER',
            days: 180,
            gap: 2
        },
        {
            label: 'Année',
            value: 'YEAR',
            days: 360,
            gap: 1
        }
    ];
}

export const getConvertableTimeUnits = () => {
    return [
        {
            label: 'Jour',
            value: 'DAYS',
            days: 1
        },
        {
            label: 'Semaine',
            value: 'WEEKS',
            days: 7
        },
        {
            label: 'Mois',
            value: 'MONTHS',
            days: 30
        }
    ];
}

export const getTimeUnitByValue = (name) => {
    return getTimeUnits().find(d => d.value === name);
}


export const getProductDetails = () => {
    return [
        {
            label: 'Date de fin des souscriptions',
            value: 'END_DATE'
        },
        {
            label: 'Date de début des souscriptions',
            value: 'START_DATE'
        },
        {
            label: 'Date du premier tirage',
            value: 'FIRST_LOT'
        },
        {
            label: 'Date du dernier tirage',
            value: 'LAST_LOT'
        },
        {
            label: 'Période de carrence',
            value: 'WAITING_PERIOD'
        },
        {
            label: "Type d'avance",
            value: 'ADVANCE_TYPE'
        },
        {
            label: "Placements",
            value: 'PLACEMENT'
        },
        {
            label: "Options",
            value: 'OPTION'
        },
        {
            label: "Date de tirage pour l'option d'avance",
            value: 'ADVANCE_OPTION_DATE'
        },
        {
            label: "Caracteristique des coupons d'avance",
            value: 'TICKET_FEATURE'
        },
        {
            label: 'Période de versement',
            value: 'DEPOSIT_PERIOD'
        },
        {
            label: 'Interet sur avance',
            value: 'ADVANCE_INTEREST'
        },
        // {
        //     label: "Option d'avance sur capital",
        //     value: 'ADVANCE_OPTION'
        // },
        {
            label: 'Capital disponible à terme',
            value: 'AVAILABLE_CAPITAL'
        },
        {
            label: 'Nombre de ligne emises',
            value: 'EMIT_LINE_COUNT'
        },
        {
            label: 'Montant périodique',
            value: 'DEPOSIT_AMOUNT'
        },
        {
            label: 'Total des versements',
            value: 'TOTAL_DEPOSIT'
        },
        {
            label: 'Taux minimal grarantie',
            value: 'MINIMUM_RATE'
        },
        {
            label: 'Groupage de ligne',
            value: 'LINE_GROUP'
        },
        {
            label: 'Capital à investir par groupe de ligne',
            value: 'INVESTMENT_CAPITAL'
        },
        {
            label: 'Quotité disponible sur avance',
            value: 'QUOTIENT_AVAILABLE'
        },
        {
            label: 'Frais de souscription',
            value: 'SUBSCRIPTION_FEES'
        },
        {
            label: 'Durée du cycle',
            value: 'CYCLE_TIME'
        },
        {
            label: 'Date du premier versement',
            value: 'START_DEPOSIT_DATE'
        },
        {
            label: 'Devise',
            value: 'PRICE_CURRENCY'
        },
        {
            label: 'Quotité disponible',
            value: 'QUOTIENT'
        },
        {
            label: 'Frais de souscription d\'une ligne',
            value: 'LINE_FEES'
        },
        {
            label: 'Frais de gestion d\'une ligne',
            value: 'LINE_MANAGEMENT_FEES'
        },
        {
            label: 'Frais de démembrement d\'un bond',
            value: 'TICKET_DEMOUNTING_FEES'
        },
        {
            label: 'Taux du DAT MicroCap',
            value: 'DAT_RATE'
        },
        {
            label: 'Taux de rémunération d\'un Ndjangui',
            value: 'LINE_RATE'
        },
        {
            label: 'Taux d\'intérêt de la ligne de placement',
            value: 'REMUNERATION_RATE'
        },
        {
            label: 'Frais de gestion des fonds',
            value: 'CAPITAL_MANAGEMENT_RATE'
        },
    ];
    
}

export const getProductDetailsByName = (name) => {
    return getProductDetails().find(d => d.value === name);
}

export const getDateDiff = (startDate, endDate, days) => {
    const milliseconds = 1000 * 60 * 60 * 24 * days;
    return Math.round(Math.abs(endDate - startDate) / milliseconds);
}

export const productOptionDetails = [
    {
        label: 'Quotité disponible sur avance (En %)',
        value: 'QUOTIENT_AVAILABLE',
        inputType: 'number'
    },
    {
        label: 'Franchise (en nombre de période)',
        value: 'WAITING_PERIOD',
        inputType: 'number'
    },
    {
        label: "Type d'avance autorisé",
        value: 'ADVANCE_TYPE',
        inputType: 'text'
    },
    {
        label: 'Intérêt sur avance  (En %)',
        value: 'ADVANCE_INTEREST',
        inputType: 'number'
    },
    {
        label: 'Capital disponible par tirage (groupe de ligne)',
        value: 'AVAILABLE_CAPITAL',
        inputType: 'number'
    },
];

export const getUserAssistanceTypes = () => {
    return [
        {
            label: 'Activation du profile',
            value: 'ACTIVATE_PROFILE',
            permission: 'ASSIST_ACTIVATE_PROFILE_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Authentifier le profile',
            value: 'AUTHENTICATE_PROFILE',
            permission: 'ASSIST_AUTHENTICATE_PROFILE_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Activer un contrat',
            value: 'ACTIVATE_CONTRACT',
            permission: 'ASSIST_ACTIVATE_CONTRACT_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Effectuer une commande',
            value: 'PLACE_ORDER',
            permission: 'ASSIST_PLACE_ORDER_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Fournir le dossier d\'une commande',
            value: 'ORDER_FOLDER',
            permission: 'ASSIST_ORDER_FOLDER_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Demande de paiement d\'une commande',
            value: 'PAY_ORDER',
            permission: 'ASSIST_PAY_ORDER_PRIVILEGE',
            regularizable: true
        },
        {
            label: 'Confirmer le paiement d\'une commande',
            value: 'ORDER_PAYMENT',
            permission: 'ASSIST_ORDER_PAYMENT_PRIVILEGE',
            regularizable: true
        },
        {
            label: 'Gérer une commande',
            value: 'MANAGE_ORDER',
            permission: 'ASSIST_MANAGE_ORDER_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Re-initialisation de mot de passe',
            value: 'RESET_PASSWORD',
            permission: 'ASSIST_RESET_PASSWORD_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Demande d\'autorisation bancaire',
            value: 'INITIATE_OPERATION',
            permission: 'ASSIST_INITIATE_OPERATION_PRIVILEGE',
            regularizable: true
        },
        {
            label: 'Editer le dossier utilisateur',
            value: 'UPDATE_USER_FOLDER',
            permission: 'ASSIST_UPDATE_USER_FOLDER_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Envoyer la convention de compte',
            value: 'ACTIVATE_ACCOUNT',
            permission: 'ASSIST_ACTIVATE_ACCOUNT_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Rejoindre une communauté',
            value: 'JOIN_COMMUNITY',
            permission: 'ASSIST_JOIN_COMMUNITY_PRIVILEGE',
            regularizable: false
        },
        {
            label: 'Envoyer un code de sécurité',
            value: 'CONFIRM_OTP',
            permission: 'ASSIST_SEND_OTP_PRIVILEGE',
            regularizable: false
        }
    ];
}

export const getUserAssistanceTypeValue = (value): any => {
    let type = getUserAssistanceTypes().find(t => t.value === value);
    if (type)
        return type.value;
    else
        return value;
}

export const getLogTypes = () => {
    return [
        {
            label: 'Activation du profile',
            value: 'ACTIVATE_PROFILE'
        },
        {
            label: 'Authentifier le profile',
            value: 'AUTHENTICATE_PROFILE'
        },
        {
            label: 'Effectuer une commande',
            value: 'PLACE_ORDER'
        },
        {
            label: 'Fournir le dossier d\'une commande',
            value: 'ORDER_FOLDER'
        },
        {
            label: 'Demande de paiement d\'une commande',
            value: 'PAY_ORDER'
        },
        {
            label: 'Gérer une commande',
            value: 'MANAGE_ORDER'
        },
        {
            label: 'Demande d\'autorisation bancaire',
            value: 'INITIATE_OPERATION'
        },
        {
            label: 'Traitement d\'autorisation bancaire',
            value: 'VALIDATE_OPERATION'
        },
        {
            label: 'Editer le dossier utilisateur',
            value: 'UPDATE_USER_FOLDER'
        },
        {
            label: 'Validation guichet',
            value: 'COUNTER_VALIDATION_OPERATION'
        },
        {
            label: 'Validation agence',
            value: 'AGENCY_VALIDATION_OPERATION'
        }
    ];
}

export const getLogTypeLabel = (value): any => {
    let type = getLogTypes().find(t => t.value === value);
    if (type)
        return type.label;
    else
        return value;
}

export const getOldAssistanceTypes = () => {
    return [
        {
            label: 'Régulariser une opération',
            value: 'INITIATE_OPERATION'
        }
    ];
}

export const getOldAssistanceTypeValue = (value): any => {
    let type = getOldAssistanceTypes().find(t => t.value === value);
    if (type)
        return type.value;
    else
        return value;
}

export const uneditableProductModelType = [
    "CPMCM"
];

export const getSpecificOperations = (paymentAccount) => {
    var result = [{
        label: 'Versement Spontané',
        value: 'DIRECT_DEPOSIT'
    }];

    if(paymentAccount) {
        result = [...result, {
            label: 'Versement CODEV',
            value: 'CODEV_DEPOSIT'}
        ];
    }
    
    return result;
}

export const getFundingOfferInterventionTypes = () => {
    return [
        {
            label: 'Sureté MicroCap',
            value: 'CPT',
        },        
        {
            label: 'Ndjangui Deal',
            value: 'CODEV_DEAL_PLAN'
        },
        {
            label: 'Carnet du Deal',
            value: 'TRANSACTION_BOOK'
        }
    ];
}

export const initDealMethods = () => {
    return [
        {
            label: 'Supports de versements',
            value: 'TICKETS'
        },
        {
            label: 'Echeances de versements',
            value: 'PERIOD'
        }
    ];
}

export const territoryDetailsTypes = () => {
    return [
        {
            label: "Type d'organisation",
            value: 'TYPE_GROUP'
        },
        {
            label: "Type Immatriculation",
            value: 'IMMATRICULATION'
        }
    ];
}

export const translateTerritoryDetailsType = (value) => {
    return territoryDetailsTypes().find(d => d.value == value)?.label
}

export const projectTypes = () => {
    return [
        {
            label: "Projet de création",
            value: 'CREATION'
        },
        {
            label: "Projet de développement",
            value: 'DEVELOPMENT'
        },
        {
            label: "Projet de restructuration",
            value: 'RESTRUCTURATION'
        },
        {
            label: "Projet de retournement",
            value: 'TURNAROUND'
        },
        {
            label: "Projet de redressement",
            value: 'ADJUSTMENT'
        },
        {
            label: "Projet de amiable",
            value: 'VOLUNTARY_LIQUIDATION'
        },
        {
            label: "Projet de judiciaire",
            value: 'JUDICIAL_LIQUIDATION'
        }
    ];
}

export const translateProjectTypes = (value) => {
    return projectTypes().find(d => d.value == value)?.label
}

export const structureMissionTypes = () => {
    return [
        {
            label: "Gouvernance",
            value: 'GOVERNANCE'
        },
        {
            label: "Direction",
            value: 'DIRECTION'
        },
        {
            label: "Representation",
            value: 'REPRESENTATION'
        },
        {
            label: "Opération",
            value: 'OPERATION'
        }
    ];
}

export const translateStructureMissionTypes = (value) => {
    return structureMissionTypes().find(d => d.value == value)?.label
}

export const organeTypes = () => {
    return [
        {
            label: "CA",
            value: 'CA'
        },
        {
            label: "CS",
            value: 'CS'
        },
        {
            label: "CODIR",
            value: 'CODIR'
        },
        {
            label: "CO",
            value: 'CO'
        },
        {
            label: "PIL",
            value: 'PIL'
        }
    ];
}

export const translateOrganeTypes = (value) => {
    return organeTypes().find(d => d.value == value)?.label
}

export const territoriesTypes = () => {
    return [
        {
            label: "Continents",
            value: 'MAINLAND'
        }
    ];
}
export const productSpecialTypes = () => {
    return [
        {
            label: "Pas de type spécial", value: 'NONE'
        }, {
            label: "Ndjangui Business", value: "CODEV"
        }, {
            label: "Reserve MicroCap", value: "RSMCM"
        }, {
            label: "Deal Plan", value: "CODEV_DEAL_PLAN"
        }, {
            label: "Pass MicroCap", value: "PASS"
        }, {
            label: "Carnet transactionnel", value: "TRANSACTION_BOOK"
        }, {
            label: "Compte compartimenté", value: "SEGRAGATED_ACCOUNT"
        }
    ];
}

export const getProductSpecialTypeLabel = (value) => {
    return productSpecialTypes().find(d => d.value == value)?.label
}

export const imageFileTypes = ["JPG", "PNG", "GIF", "JPEG", "PDF"];

export const creditTicketTypes = () => {
    return [
        {
            label: "Bond d'achat", value: 'PAYMENT'
        }, {
            label: "Bond de caisse", value: "CODEV"
        }
    ];
}

export const getCreditTicketTypeLabel = (value) => {
    return creditTicketTypes().find(d => d.value == value)?.label
}

export const bookingNatures = () => {
    return [
        {
            label: "Challenge 100 PME", value: 'PME_VOTE'
        },
        {
            label: "MicroCap Store", value: 'MARKETPLACE'
        },
        {
            label: "Parrainage", value: 'INVITATION'
        }
    ];
}

export const getBookingNatureLabel = (value) => {
    return bookingNatures().find(d => d.value == value)?.label
}

export const invitationObjects = () => {
    return [
        {
            label: "Rejoindre un projet", value: 'PROJECT'
        },
        {
            label: "Rejoindre le réseau", value: 'NETWORK'
        },
        {
            label: "Rejoindre une communauté", value: 'COMMUNITY'
        },
        {
            label: "Souscrire à un produit", value: 'PRODUCT'
        },
        {
            label: "Rejoindre le challenge 100 PME", value: 'PME_VOTE'
        }
    ];
}

export const getInvitationObjectLabel = (value) => {
    return invitationObjects().find(d => d.value == value)?.label
}

export const bookingAdvantages = () => {
    return [
        {
            label: "Code promo", 
            value: 'DISCOUNT'
        },
        {
            label: "Bon de versement", 
            value: 'PAYOUT_BOND'
        },
        {
            label: "Bond de caisse", 
            value: 'SHOP_BOND'
        }
    ];
}

export const getBookingAdvantageLabel = (value) => {
    return bookingAdvantages().find(d => d.value == value)?.label
}

export const bookingAdvantageTargets = () => {
    return [
        {
            label: "Parrain", 
            value: 'GODFATHER'
        },
        {
            label: "Filleul", 
            value: 'GODSON'
        },
        {
            label: "Tout le monde", 
            value: 'USER'
        }
    ];
}

export const getBookingAdvantageTargetLabel = (value) => {
    return bookingAdvantageTargets().find(d => d.value == value)?.label
}

export const broadcastTypes = () => {
    return [
        {
            label: "Diffusion", 
            value: 'MESSAGE'
        },
        // {
        //     label: "Système", 
        //     value: 'SYSTEM'
        // },
        // {
        //     label: "Organisation", 
        //     value: 'ORGANIZATION'
        // }
    ];
}

export const getBroadcastTypesLabel = (value) => {
    return broadcastTypes().find(d => d.value == value)?.label
}

export const institutionTypes = () => {
    return [
        {
            label: "Agence bancaire", 
            value: 'BANK_AGENCY'
        },
        {
            label: "Agence de voyage", 
            value: 'TRAVEL_AGENCY'
        },
        {
            label: "Site logistique", 
            value: 'LOGISTIC_SITE'
        },
        {
            label: "Bureaux", 
            value: 'OFFICE'
        },
        {
            label: "Siège social", 
            value: 'HEAD_OFFICE'
        },
        {
            label: "Usine", 
            value: 'FACTORY'
        },
        {
            label: "Point de vente", 
            value: 'SALE_POINT'
        },
        {
            label: "Point de livraison", 
            value: 'DELIVERY_POINT'
        },
        {
            label: "Domiciliation administrative", 
            value: 'ADMINISTRATIVE_DOMICILIATION'
        },
        {
            label: "Domiciliation commerciale", 
            value: 'COMMERCIAL_DOMINICILIATION'
        },

    ];
}

export const getInstitutionTypesLabel = (value) => {
    return institutionTypes().find(d => d.value == value)?.label
}


export const projectDistributionRules = () => {
    return [
        {
            label: "Prorata des deals projet", 
            value: 'PROJECT'
        },
        {
            label: "Prorata des deals caution", 
            value: 'CAUTION'
        }
    ];
}

export const getProjectDistributionRuleLabel = (value) => {
    return projectDistributionRules().find(d => d.value == value)?.label
}

export const bonificationBases = () => {
    return [
        {
            label: "EBE", 
            value: 'EBE'
        },
        {
            label: "Résultat net", 
            value: 'NET_RESULT'
        },
        {
            label: "Dividende recu", 
            value: 'RECEIVED_DIVIDEND'
        },
        {
            label: "Dividende distribué", 
            value: 'DISTRIBUTED_DIVIDEND'
        },
        {
            label: "Salaire", 
            value: 'SALARY'
        }
    ];
}

export const getBonificationBaseLabel = (value) => {
    return bonificationBases().find(d => d.value == value)?.label
}