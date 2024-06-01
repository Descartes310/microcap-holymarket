import { resourceLimits } from "worker_threads";

export const ACCOUNT_PERIOD_LIMIT = 60;

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
            days: 1
        },
        {
            label: 'Semaine',
            value: 'WEEK',
            days: 7
        },
        {
            label: 'Mois',
            value: 'MONTH',
            days: 30
        },
        {
            label: 'Année',
            value: 'YEAR',
            days: 365
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
            label: 'Quotation',
            value: 'QUOTIENT'
        }
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
        label: 'Quotité disponible sur avance (%)',
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
        label: 'Intérêt sur avance (en %)',
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
            value: 'ACTIVATE_PROFILE'
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
            label: "Project de création",
            value: 'CREATION'
        },
        {
            label: "Project de developpement",
            value: 'DEVELOPMENT'
        },
        {
            label: "Project de restructuration",
            value: 'RESTRUCTURATION'
        },
        {
            label: "Project de retournement",
            value: 'TURNAROUND'
        },
        {
            label: "Project de redressement",
            value: 'ADJUSTMENT'
        },
        {
            label: "Project de amiable",
            value: 'VOLUNTARY_LIQUIDATION'
        },
        {
            label: "Project de judiciaire",
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
            label: "Djangui Plan", value: "CODEV"
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