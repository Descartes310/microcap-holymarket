/**
 * Checkout Item
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import UserAvatar from "Components/UserAvatar";
import {textTruncate, getFilePath, normalizeCartItems} from "Helpers/helpers";
import Cart from "Models/Cart";
import AmountCurrency from "Components/AmountCurrency";

class CheckoutItem extends Component {

   constructor(props) {
      super(props);
   }


   state = {
      success: false,
   }

	/**
	* On Confirm dialog
	* @param {string} key
	*/
   onConfirm(key) {
      this.setState({ [key]: false })
   }

	/**
	 * Open Alert
	 * @param {key} key
	 */
   openAlert(key) {
      this.setState({ [key]: true });
   }

   render() {
      const { order } = this.props;

      const { success } = this.state;
      return (
         <div className="checkout-item-wrap p-4">
            <div className="border-bottom d-flex justify-content-between align-items-center p-3">
               <span className="font-weight-bold w-70"><IntlMessages id="components.product" /></span>
               <span className="font-weight-bold w-15"><IntlMessages id="components.quantity" /></span>
               <span className="font-weight-bold w-15"><IntlMessages id="widgets.price" /></span>
            </div>
            {order.orderItems.length === 0 ? (
               <div className="text-center p-4">
                  <h3>
                     Aucun produits trouvés
                  </h3>
               </div>
            ) : (
                  <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={450} autoHide>
                     <ul className="list-unstyled dropdown-body">
                        {order.orderItems.map((cartItem, key) => (
                           <li className="d-flex justify-content-between p-3" key={key}>
                              <div className="media overflow-hidden w-75">
                                 <div className="mr-15">
                                    <UserAvatar
                                       avatar={getFilePath(cartItem.typeProduct.product.image)}
                                       name={cartItem.typeProduct.product.label}
                                       className="media-object"
                                       width="63"
                                       height="63"
                                    />
                                 </div>
                                 <div className="media-body text-truncate">
                                    <span className="fs-14 d-block text-truncate">{cartItem.typeProduct.product.label}</span>
                                    <span className="fs-12 d-block text-muted text-truncate">{textTruncate(cartItem.typeProduct.product.description, 40)}</span>
                                    {/*<span className="fs-12 d-block text-muted">{cartItem.brand}</span>*/}
                                 </div>
                              </div>
                              <div className="w-10">
                                 <span className="text-muted fs-12 d-block mb-10">{cartItem.quantity}</span>
                              </div>
                              <div className="w-15">
                                 <span className="text-muted fs-12 d-block mb-10"><AmountCurrency amount={cartItem.typeProduct.price} from={cartItem.currency} /></span>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </Scrollbars>
               )
            }
            <div className="border-top d-flex justify-content-between align-items-center py-4">
               <span className="font-weight-bold text-muted"><IntlMessages id="components.totalPrice" /></span>
               <span className="font-weight-bold"><AmountCurrency amounts={order.orderItems.map((e) => {
                  return { amount: e.typeProduct.price, currency: e.currency, quantity: e.quantity }
               })} styles={{ fontWeight: 'bold' }} /></span>
            </div>
            <SweetAlert
               success
               show={success}
               title="Your Order Is Successfully Placed !"
               btnSize="sm"
               onConfirm={() => this.onConfirm('success')}
            />
         </div>
      )
   }
}

const mapStateToProps = ({ authUser, cart }) => {
   return { cart, authUser: authUser.data };
};

export default connect(mapStateToProps)(CheckoutItem);
