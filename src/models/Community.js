import {textTruncate} from "Helpers/helpers";

export default class Community {
    constructor(community) {
        this.active = community.active;
        this.avatar = community.avatar;
        this.id = community.id;
        this.label = community.label;
        this.description = community.description;
        this.name = community.name;
        this.private = community.private;
        this.reference = community.reference;
        this.visible = community.visible;
        this.project = community.projectFolder;
        this.typeGroup = community.typeGroup;
    }

    get shortDescription() {
        return textTruncate(this.description, 50);
    }
}
