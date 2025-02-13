import Types from "Enums/Types";

export const projects = {
    initialisationOptions: [
        {
            name: 'Idée',
            value: Types.IDEA
        },
        {
            name: 'Programme',
            value: Types.PROGRAM
        },
        {
            name: 'Appel à projects',
            value: Types.PROJECTS_CALL
        },
    ]
};

export const contactTypes = [
    {
        name: 'Adresse email',
        value: 'EMAIL'
    },
    {
        name: 'Numéro de téléphone',
        value: 'PHONE'
    },
    {
        name: 'Numéro Whatsapp',
        value: 'WHATSAPP'
    },
    // {
    //     name: 'Adresse de notification',
    //     value: 'NOTIFICATION_ADDRESS'
    // },
];

export const institutionMemberTypes = [
    {
        name: 'Chef',
        value: 'HEAD'
    },
    {
        name: 'Conseiller',
        value: 'ADVISOR'
    }
];

export const communityTypes = [
    {
        name: 'Communauté conventionnée',
        value: 'CONVENTIONATED_COMMUNITY'
    },
    {
        name: 'Communauté d\'affinitée',
        value: 'UNCONVENTIONATED_COMMUNITY'
    },
    {
        name: 'Communauté projet',
        value: 'PROJECT'
    }
];

export const getContactTypeLabel = (type) => {
    let typeLabel = type;
    switch (type) {
        case 'ALIAS':
            typeLabel = 'Alias'
            break;
        case 'EMAIL':
            typeLabel = 'Adresse email'
            break;
        case 'PHONE':
            typeLabel = 'Télephone mobile'
            break;
        case 'WHATSAPP':
            typeLabel = 'Numéro Whatsapp'
            break;
        case 'ADDRESS':
            typeLabel = 'Adresse'
            break;
        case 'NOTIFICATION_ADDRESS':
            typeLabel = 'Adresse de notification'
            break;
        default:
            break;
    }
    return typeLabel;
}

export const getStatusLabel = (type) => {
    let statusLabel = type;
    switch (type) {
        case 'VERIFIED':
            statusLabel = 'Vérifié'
            break;
        case 'PENDING':
            statusLabel = 'En attente'
            break;
        case 'APPROVED':
            statusLabel = 'Approuvé'
            break;
        case 'REJECTED':
            statusLabel = 'Rejetté'
            break;
        default:
            break;
    }
    return statusLabel;
}
