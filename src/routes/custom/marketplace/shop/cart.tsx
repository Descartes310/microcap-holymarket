import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { CHECKOUT } from 'Url/frontendUrl';
import ShopHeader from './components/Header';
import { deleteItemFromCart, onChangeProductQuantity } from "Actions";
import { textTruncate, getFilePath, getPriceWithCurrency, addCurrency, getPrice } from "Helpers/helpers";

import './cart.css';

class Carts extends Component<any, any> {

   onChangeQuantity(delta: number, cartItem: any) {
      const newQty = cartItem.quantity + delta;
      if (newQty > 0) {
         this.props.onChangeProductQuantity(newQty, cartItem.id);
      }
   }

   getTotalPrice() {
      const { cart } = this.props;
      if (cart.count() === 0) return 0;
      const total = cart.items
         .map(ci => getPrice(ci.price * ci.quantity, ci.currency))
         .reduce((sum, current) => sum + current);
      return total.toFixed(2);
   }

   isCartEmpty() {
      return this.props.cart.count() === 0;
   }

   render() {
      const { cart, deleteItemFromCart } = this.props;

      return (
         <div className="mc-cart-root">
            <ShopHeader />
            {/* Header */}
            <div className="mc-cart-header">
               <div className="mc-cart-label">Boutique</div>
               <h1 className="mc-cart-title">
                  Mon panier
                  {!this.isCartEmpty() && (
                     <em className="mc-cart-count">({cart.count()})</em>
                  )}
               </h1>
            </div>

            {/* Table */}
            <div className="mc-cart-table-wrapper">
               <table className="mc-cart-table">
                  <thead>
                     <tr>
                        <th></th>
                        <th>Produit</th>
                        <th className="center">Quantité</th>
                        <th className="center hide-mobile">Prix unitaire</th>
                        <th className="center">Total</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {!this.isCartEmpty() ? (
                        cart.items.map((item, key) => (
                           <tr key={key}>
                              {/* Image */}
                              <td className="td-img">
                                 <img
                                    src={item.image ? getFilePath(item.image) : require('Assets/img/product.png')}
                                    alt={item.label}
                                    className="mc-product-img"
                                 />
                              </td>

                              {/* Label + description */}
                              <td>
                                 <div className="mc-product-label">{textTruncate(item.label, 40)}</div>
                                 <div className="mc-product-desc">{textTruncate(item.description, 80)}</div>
                              </td>

                              {/* Quantity +/- */}
                              <td className="center">
                                 <div className="mc-qty-wrapper">
                                    <button
                                       className="mc-qty-btn"
                                       onClick={() => this.onChangeQuantity(-1, item)}
                                    >−</button>
                                    <span className="mc-qty-display">{item.quantity}</span>
                                    <button
                                       className="mc-qty-btn"
                                       onClick={() => this.onChangeQuantity(+1, item)}
                                    >+</button>
                                 </div>
                              </td>

                              {/* Unit price */}
                              <td className="mc-price-unit hide-mobile">
                                 {getPriceWithCurrency(item.price, item.currency)}
                              </td>

                              {/* Total price */}
                              <td className="mc-price-total">
                                 {getPriceWithCurrency(Number(item.price) * Number(item.quantity), item.currency)}
                              </td>

                              {/* Delete */}
                              <td className="td-delete">
                                 <button
                                    className="mc-delete-btn"
                                    onClick={() => deleteItemFromCart(item)}
                                    title="Supprimer"
                                 >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                       <path d="M2 4h12M6 4V2h4v2M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4"
                                          stroke="currentColor" strokeWidth="1.4"
                                          strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                 </button>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={6}>
                              <div className="mc-empty-state">
                                 <span className="mc-empty-icon">
                                    <i className="zmdi zmdi-shopping-cart" />
                                 </span>
                                 <span className="mc-empty-text">Aucun produit dans le panier</span>
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            {/* Footer: total */}
            {!this.isCartEmpty() && (
               <div className="mc-cart-footer">
                  <div className="mc-footer-total">
                     <span className="mc-footer-total-label">Total</span>
                     <span className="mc-footer-total-amount">{addCurrency(this.getTotalPrice())}</span>
                  </div>
               </div>
            )}

            {/* CTA strip */}
            {!this.isCartEmpty() && (
               <div className="mc-cart-strip">
                  <div className="mc-strip-text">
                     Prêt à commander ?{' '}
                     <span>{cart.count()} article{cart.count() > 1 ? 's' : ''}</span> dans votre panier.
                  </div>
                  <Link to={CHECKOUT} className="mc-strip-btn">
                     Commander →
                  </Link>
               </div>
            )}

         </div>
      );
   }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, {
   deleteItemFromCart,
   onChangeProductQuantity,
})(Carts);