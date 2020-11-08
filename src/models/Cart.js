import CartItem from "Models/CartItem";

export default class Cart {
    constructor(items) {
        this.items = items.map(item => new CartItem(item));
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    getTotalPrice() {
        return Number(this.items.reduce((price, item) => price + item.totalPrice, 0)).toFixed(2);
    };

    count = () => {
        return this.items.length;
    };

    isCartEmpty = () => this.count() === 0;

    getOneProduct = (productId) => {
        return this.items.find(p => p.id === productId);
    };

    isProductPresent = (productId) => this.getOneProduct(productId) === undefined;
}
