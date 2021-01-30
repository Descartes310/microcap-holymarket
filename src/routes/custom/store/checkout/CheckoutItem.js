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
import {textTruncate} from "Helpers/helpers";
import Cart from "Models/Cart";

class CheckoutItem extends Component {

    constructor(props) {
        super(props);
        this.order = this.props.order;
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
      const cart = new Cart(this.order.orderItems.map(item => ({
          ...item.typeProduct,
          price: item.typeProduct.defaultPrice,
          quantity: item.quantity
      }))) ;
      const { success } = this.state;
      return (
         <div className="checkout-item-wrap p-4">
            <div className="border-bottom d-flex justify-content-between align-items-center p-3">
               <span className="font-weight-bold w-70"><IntlMessages id="components.product" /></span>
               <span className="font-weight-bold w-15"><IntlMessages id="components.quantity" /></span>
               <span className="font-weight-bold w-15"><IntlMessages id="widgets.price" /></span>
            </div>
            {cart.isCartEmpty() ? (
               <div className="text-center p-4">
                  <h3>
                     Aucun produits trouvés
                  </h3>
               </div>
            ) : (
                  <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={450} autoHide>
                     <ul className="list-unstyled dropdown-body">
                        {cart.items.map((cartItem, key) => (
                           <li className="d-flex justify-content-between p-3" key={key}>
                              <div className="media overflow-hidden w-75">
                                 <div className="mr-15">
                                    <UserAvatar
                                        avatar={cartItem.image}
                                        name={cartItem.name}
                                        className="media-object"
                                        width="63"
                                        height="63"
                                    />
                                 </div>
                                 <div className="media-body text-truncate">
                                    <span className="fs-14 d-block text-truncate">{cartItem.name}</span>
                                    <span className="fs-12 d-block text-muted text-truncate">{textTruncate(cartItem.description, 40)}</span>
                                    {/*<span className="fs-12 d-block text-muted">{cartItem.brand}</span>*/}
                                 </div>
                              </div>
                              <div className="w-10">
                                 <span className="text-muted fs-12 d-block mb-10">{cartItem.quantity}</span>
                              </div>
                              <div className="w-15">
                                 <span className="text-muted fs-12 d-block mb-10">$ {cartItem.price}</span>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </Scrollbars>
               )
            }
            <div className="border-top d-flex justify-content-between align-items-center py-4">
               <span className="font-weight-bold text-muted"><IntlMessages id="components.totalPrice" /></span>
               <span className="font-weight-bold">$ {cart.getTotalPrice()}</span>
            </div>
            {/* <div className="d-flex justify-content-end align-items-center">
               {!cart.isCartEmpty() ? (
                  <Button variant="contained" color="primary" className="text-white" onClick={() => this.openAlert('success')}>
                     <IntlMessages id="components.placeOrder" />
                  </Button>
               ) : (
                     <Button variant="contained" color="secondary" component={Link} to="/app/ecommerce/shop" className="text-white">
                        <IntlMessages id="components.goToShop" />
                     </Button>
                  )
               }
            </div> */}
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

const mapStateToProps = ({ cart }) => {
   return { cart };
};

export default connect(mapStateToProps)(CheckoutItem);
