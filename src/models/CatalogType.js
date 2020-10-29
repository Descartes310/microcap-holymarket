
export default class CatalogType {
    constructor(catalog) {
        this.id = catalog.id;
        this.name = catalog.name;
        this.reference = catalog.reference;
        this.label = catalog.label;
        this.description = catalog.description;
    }
}
