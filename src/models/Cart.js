import CartItem from "Models/CartItem";

export default class Cart {
    constructor(objectCart) {
        if(objectCart) {
            this.items = objectCart.data[objectCart.authId].map(item => new CartItem(item));
            if (!objectCart.shouldSkipSaving)
                localStorage.setItem('cartItems', JSON.stringify(objectCart.data));
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
