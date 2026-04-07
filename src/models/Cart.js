import CartItem from "Models/CartItem";

export default class Cart {
    constructor(objectCart) {
        this.items = [];
        if(objectCart && objectCart.data) {
            if(objectCart.data.items && objectCart.data.items) {
                this.items = objectCart.data.items.map(item => new CartItem(item));
                localStorage.setItem('cartItems', JSON.stringify(objectCart.data.items));
            }
        }
    }

    getTotalPrice() {
        return Number(this?.items.reduce((price, item) => price + item.totalPrice, 0)).toFixed(2);
    };

    count = () => {
        return this?.items?.length;
    };

    isCartEmpty = () => this.count() === 0;

    getOneProduct = (productId) => {
        return this?.items.find(p => p.id === productId);
    };

    isProductPresent = (productId) => this.getOneProduct(productId) === undefined;
}
