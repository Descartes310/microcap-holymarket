import Branch from "Models/Branch";

export default class CategoryProducts {
    constructor(categoryProducts) {
        this.id = categoryProducts.id;
        this.name = categoryProducts.name;
        this.code = categoryProducts.code;
        this.reference = categoryProducts.reference;
        this.label = categoryProducts.label;
        this.description = categoryProducts.description;
        this.available = categoryProducts.available;
        this.branch = new Branch(categoryProducts.branch);
    }
}
