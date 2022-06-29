import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { getFilePath } from 'Helpers/helpers';
import { MARKETPLACE } from 'Url/frontendUrl';
import { Scrollbars } from 'react-custom-scrollbars';

class CheckoutItem extends Component<any, any> {

   state = {
      success: false,
   }

   onConfirm(key) {
      this.setState({ [key]: false })
   }

   openAlert(key) {
      this.setState({ [key]: true });
   }

   //Get Total Price
   getTotalPrice() {
      const { cart } = this.props;
      let totalPrice = 0;
      if (cart.count() === 0) return 0;
      totalPrice = cart.items.map(ci => ci.price * ci.quantity).reduce((sum, current) => sum + current);
      return totalPrice.toFixed(2);
   }

   //Is Cart Empty
   isCartEmpty() {
      const { cart } = this.props;
      if (cart.count() === 0) {
         return true;
      }
   }

   render() {
      const { cart } = this.props;
      return (
         <div className="checkout-item-wrap p-4">
            <div className="border-bottom d-flex justify-content-between align-items-center p-3">
               <span className="font-weight-bold w-70">Produit</span>
               <span className="font-weight-bold w-15">Quantité</span>
               <span className="font-weight-bold w-15">Prix</span>
            </div>
            {this.isCartEmpty() ? (
               <div className="text-center p-4">
                  <h3>Aucun produit dans le panier</h3>
               </div>
            ) : (
               <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={450} autoHide>
                  <ul className="list-unstyled dropdown-body">
                     {cart.items.map((cart, key) => (
                        <li className="d-flex justify-content-between p-3" key={key}>
                           <div className="media overflow-hidden w-75">
                              <div className="mr-15">
                                 <img src={getFilePath(cart.image)} alt="products" className="media-object" width="63" height="63" />
                              </div>
                              <div className="media-body text-truncate">
                                 <span className="fs-14 d-block text-truncate">{cart.label}</span>
                                 <span className="fs-12 d-block text-muted text-truncate">{cart.description}</span>
                              </div>
                           </div>
                           <div className="w-10">
                              <span className="text-muted fs-12 d-block mb-10">{cart.quantity}</span>
                           </div>
                           <div className="w-15">
                              <span className="text-muted fs-12 d-block mb-10">€{cart.price}</span>
                           </div>
                        </li>
                     ))}
                  </ul>
               </Scrollbars>
            )
            }
            <div className="border-top d-flex justify-content-between align-items-center py-4">
               <span className="font-weight-bold text-muted">Total</span>
               <span className="font-weight-bold">€{this.getTotalPrice()}</span>
            </div>
            <div className="d-flex justify-content-end align-items-center">
               {this.isCartEmpty() && (
                  <Button variant="contained" color="secondary" component={Link} to={MARKETPLACE} className="text-white">
                     MicroCap Shop
                  </Button>
               )
               }
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ cart }) => {
   return { cart };
}

export default connect(mapStateToProps)(CheckoutItem);