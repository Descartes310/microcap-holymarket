
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
            value: 'DAYS'
        },
        {
            label: 'Semaine',
            value: 'WEEK'
        },
        {
            label: 'Mois',
            value: 'MONTH'
        },
        {
            label: 'Semestre',
            value: 'SEMESTER'
        }
    ];
}