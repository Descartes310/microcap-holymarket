
/*"id": 1,
    "name": "qsdqsd",
    "licence": "qsdqsd",
    "url": "qdsdqsd",
    "signature1": "qsdqsd",
    "signature2": "qsdqsd",
    "signature3": "qsdqsd",
    "token": "73883a7c-c587-4002-a498-a606da4d7d8d",
    "active": false,
    "maxPfmNumber": 12,
    "maxMemberNumber": 32,
    "maxPartnerNumber": 43,
    "status": "EMPTY",
    "activity": "SLEEPING"*/
export default class Branch {
    static permissionsRelated = {
        READ: 'READ_' + Branch.modelName.toUpperCase(),
        CREATE: 'CREATE_' + Branch.modelName.toUpperCase(),
        UPDATE: 'UPDATE_' + Branch.modelName.toUpperCase(),
        DELETE: 'DELETE_' + Branch.modelName.toUpperCase(),
    };

    static get modelName() {
        return 'Branch'
    }

    constructor(branch) {
        this.id = branch.id;
        this.licence = branch.licence;
        this.signature1 = branch.signature1;
        this.signature2 = branch.signature2;
        this.signature3 = branch.signature3;
        this.token = branch.token;
        this.name = branch.name;
        this.active = branch.active;
        this.maxPfmNumber = branch.maxPfmNumber;
        this.maxMemberNumber = branch.maxMemberNumber;
        this.maxMemberNumber = branch.maxMemberNumber;
        this.maxPartnerNumber = branch.maxPartnerNumber;
        this.status = branch.status;
    }
}
