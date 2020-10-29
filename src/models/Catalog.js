import CatalogType from "Models/CatalogType";

export default class Catalog {
    constructor(catalog) {
        this.id = catalog.id;
        this.name = catalog.name;
        this.reference = catalog.reference;
        this.label = catalog.label;
        this.active = catalog.active;
        this.description = catalog.description;
        this.catalogType = new CatalogType(catalog.typeCatalog);
    }
}
