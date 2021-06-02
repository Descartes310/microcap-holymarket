import CartItem from "Models/CartItem";
import { isEmpty } from "lodash";

export default class Cart {
    constructor(objectCart) {

        if (isEmpty(objectCart.data) || objectCart.auth === null) {
            const obj = {};
            this.items= [];
            obj[objectCart.auth]  = [];
            localStorage.setItem('cartItems', JSON.stringify(obj));
        } else {

            this.items = objectCart.data[objectCart.auth].map(item => new CartItem(item));
            localStorage.setItem('cartItems', JSON.stringify(objectCart.data));

        }

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
