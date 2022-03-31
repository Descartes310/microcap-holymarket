
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