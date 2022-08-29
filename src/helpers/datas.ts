
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
            value: 'WEEK',
            days: 7
        },
        {
            label: 'Mois',
            value: 'MONTH',
            days: 30
        },
        {
            label: 'Semestre',
            value: 'SEMESTER',
            days: 180
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
            value: 'ENDDATE'
        },
        {
            label: 'Date de début des souscriptions',
            value: 'STARTDATE'
        },
        {
            label: 'Période de carrence',
            value: 'CARRENCEPERIOD'
        },
        {
            label: "Type d'avance",
            value: 'ADVANCETYPE'
        },
        {
            label: "Date de tirage pour l'option d'avance",
            value: 'ADVANCEOPTIONDATE'
        },
        {
            label: "Caracteristique des coupons d'avance",
            value: 'TICKETCARACTERISTIC'
        },
        {
            label: 'Période de versement',
            value: 'DEPOSITPERIOD'
        },
        {
            label: 'Interet sur avance',
            value: 'ADVANCEINTEREST'
        },
        {
            label: "Option d'avance sur capital",
            value: 'ADVANCEOPTION'
        },
        {
            label: 'Capital disponible à terme',
            value: 'AVAILABLECAPITAL'
        },
        {
            label: 'Nombre de ligne emises',
            value: 'EMITLINECOUNT'
        },
        {
            label: 'Montant périodique',
            value: 'DEPOSITAMOUNT'
        },
        {
            label: 'Total des versements',
            value: 'TOTALDEPOSIT'
        },
        {
            label: 'Taux minimal grarantie',
            value: 'MINIMUMRATE'
        },
        {
            label: 'Groupage de ligne',
            value: 'LINEGROUP'
        },
        {
            label: 'Capital à investir par groupe de ligne',
            value: 'INVESTMENTCAPITAL'
        },
        {
            label: 'Quotité disponible sur avance',
            value: 'QUOTIENTAVAILABLE'
        },
        {
            label: 'Frais de souscription',
            value: 'SUBSCRIPTIONFEES'
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