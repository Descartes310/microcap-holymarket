export default class CartItem {
    constructor(item) {
        this.id = item.id;
        this.type = item.type;
        this.label = item.label;
        this.image = item.image;
        this.source = item.source;
        this.nature = item.nature;
        this.seller = item.seller;
        this.price = Number(item.price);
        this.customInfos = item.customInfos;
        this.description = item.description;
        let currenctCurrency = item?.details?.find(details => details.type === 'PRICE_CURRENCY')?.value;
        this.currency = currenctCurrency ? currenctCurrency : item.currency ? item.currency : 'EUR';
        this.quantity = item.quantity ? Number(item.quantity) : 1;
    }

    get totalPrice() {
        return Number(this.price * this.quantity);
    };
}
