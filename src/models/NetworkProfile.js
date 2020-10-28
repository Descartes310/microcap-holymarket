import Branch from "Models/Branch";

export default class NetworkProfile {
    constructor(networkProfile) {
        this.branch = new Branch(networkProfile.branch);
        this.hasMandatoryAssistant = networkProfile.hasMandatoryAssistant;
        this.hasOptionalAssistant = networkProfile.hasOptionalAssistant;
        this.id = networkProfile.id;
        this.label = networkProfile.label;
        this.mandatoryAssistantMax = networkProfile.mandatoryAssistantMax;
        this.mandatoryAssistantMin = networkProfile.mandatoryAssistantMin;
        this.name = networkProfile.name;
        this.optionalAssistantMax = networkProfile.optionalAssistantMax;
        this.optionalAssistantMin = networkProfile.optionalAssistantMin;
        this.profileType = networkProfile.profileType;
        this.reference = networkProfile.reference;
    }
}
