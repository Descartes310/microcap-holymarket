export default class CartItem {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.nature = item.nature;
        this.price = Number(item.price);
        this.image = item.image;
        this.currency = item.currency;
        this.distributor = item.distributor;
        this.quantity = Number(item.quantity);
    }

    get totalPrice() {
        return Number(this.price * this.quantity);
    };
}
