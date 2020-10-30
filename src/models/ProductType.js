import Catalog from "Models/Catalog";
import Branch from "Models/Branch";

export default class ProductType {
    constructor(productType) {
        this.id = productType.id;
        this.name = productType.name;
        this.code = productType.code;
        this.reference = productType.reference;
        this.label = productType.label;
        this.defaultPrice = productType.defaultPrice;
        this.description = productType.description;
        this.available = productType.available;
        this.defaultPFM = productType.defaultPFM;
        this.defaultMEMBER = productType.defaultMEMBER;
        this.branch = new Branch(productType.branch);
        this.catalogs = new Catalog(productType.catalogs);
    }
}
