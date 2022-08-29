export default class CartItem {
    constructor(item) {
        this.id = item.id;
        this.type = item.type;
        this.label = item.label;
        this.image = item.image;
        this.nature = item.nature;
        this.seller = item.seller;
        this.price = Number(item.price);
        this.customInfos = this.customInfos;
        this.description = item.description;
        this.currency = item.currency ? item.currency : 'EUR';
        this.quantity = item.quantity ? Number(item.quantity) : 1;
    }

    get totalPrice() {
        return Number(this.price * this.quantity);
    };
}
