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
        name: 'Télephone mobile',
        value: 'PHONE'
    },
    {
        name: 'Adresse',
        value: 'ADDRESS'
    },
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
        case 'ADDRESS':
            typeLabel = 'Adresse'
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
        default:
            break;
    }
    return statusLabel;
}
