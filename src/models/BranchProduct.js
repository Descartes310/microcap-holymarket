import Catalog from "Models/Catalog";

export default class BranchProduct {
    constructor(branchProduct) {
        this.available = branchProduct.available;
        this.catalogs = branchProduct.catalogs.map(b => new Catalog(b));
        this.code = branchProduct.code;
        this.defaultMEMBER = branchProduct.defaultMEMBER;
        this.defaultPFM = branchProduct.defaultPFM;
        this.defaultPrice = branchProduct.defaultPrice;
        this.description = branchProduct.description;
        this.id = branchProduct.id;
        this.label = branchProduct.label;
        this.name = branchProduct.name;
        this.reference = branchProduct.reference;

    }
}
