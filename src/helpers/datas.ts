
export const getChainEventTypes = () => {
    return [
        {
            label: 'Activation du profile',
            value: 'ACTIVATE_PROFILE'
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
        {
            label: "Option d'avance sur capital",
            value: 'ADVANCE_OPTION'
        },
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