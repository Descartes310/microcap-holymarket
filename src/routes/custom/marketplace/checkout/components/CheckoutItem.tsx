import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import IconButton from '@material-ui/core/IconButton';
import { Scrollbars } from 'react-custom-scrollbars';
import CreateComplementaryPaymentModal from './createComplementaryPayment';
import { getFilePath, getPrice, getPriceWithCurrency } from 'Helpers/helpers';

class CheckoutItem extends Component<any, any> {

   state = {
      success: false,
      payments: [],
      showComplementaryPaymentModal: false
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
      totalPrice = cart.items.map(ci => getPrice(ci.price * ci.quantity, ci.currency)).reduce((sum, current) => sum + current);
      return Number(totalPrice.toFixed(2));
   }

   //Is Cart Empty
   isCartEmpty() {
      const { cart } = this.props;
      if (cart.count() === 0) {
         return true;
      }
   }

   getAmountToPay = () => {
      let baseAmount = this.getTotalPrice();
      return baseAmount;
   }

  getDiscountedAmountToPay = () => {
      let baseAmount = this.getTotalPrice();
      if(this.props.discount) {
         baseAmount = baseAmount - (baseAmount * this.props.discount.percentage/100);
      }
      return baseAmount;
  }

   render() {
      const { cart } = this.props;
      const { showComplementaryPaymentModal, payments } = this.state;
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
                                 <img src={cart.image ? getFilePath(cart.image) : require('Assets/img/product.png')} alt="products" className="media-object" width="63" height="63" />
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
                              <span className="text-muted fs-12 d-block mb-10">{getPriceWithCurrency(cart.price, cart.currency)}</span>
                           </div>
                        </li>
                     ))}
                  </ul>
               </Scrollbars>
            )}
            <div className="border-top d-flex justify-content-between align-items-center py-4">
               <span className="font-weight-bold text-muted">Total</span>
               <span className="font-weight-bold"><span style={this.props.discount?.percentage && { textDecoration: 'line-through', color: 'red' } }>{this.getAmountToPay()} {cart.items[0]?.currency}</span> { this.props.discount?.percentage && <>{this.getDiscountedAmountToPay()} {cart.items[0]?.currency}</>}</span>
            </div>
            {!this.isCartEmpty() && (
               <div>
                  <div className="border-top d-flex justify-content-between align-items-center py-4">
                     <span className="font-weight-bold text-muted w-100">Encaissements complémentaires</span>
                  </div>
                  <ul className="list-unstyled dropdown-body">
                     {payments.map((payment, key) => (
                        <li className="d-flex justify-content-between mb-4" key={key}>
                           <div className="w-70 d-flex align-items-center">
                              <span className="fs-14 d-block text-truncate">{payment.label}</span>
                           </div>
                           <div className="w-20 d-flex align-items-center">
                              <span className="fs-12 d-block text-right">{getPriceWithCurrency(payment.amount, cart.currency)}</span>
                           </div>
                           { payment.deletable && (
                              <div className="w-10 d-flex align-items-center">
                                 <IconButton onClick={() => this.setState({ payments: [...payments.filter(p => p != payment)] }, () => {
                                    this.props.updatePayments([...payments.filter(p => p != payment)])
                                 })}>
                                    <i className="zmdi zmdi-close"></i>
                                 </IconButton>
                              </div>
                           )}
                        </li>
                     ))}
                  </ul>
                  <div className="d-flex justify-content-end align-items-center mt-10">
                     <Button variant="contained" color="secondary" className="text-white" onClick={() => {
                        this.setState({ showComplementaryPaymentModal: true })
                     }}>
                        Ajouter +
                     </Button>
                  </div>
               </div>
            )}
            <div className="d-flex justify-content-end align-items-center mt-30">
               {this.isCartEmpty() && (
                  <Button variant="contained" color="secondary" component={Link} to={MARKETPLACE.SHOP.SELF} className="text-white w-100">
                     MicroCap Store
                  </Button>
               )
               }
            </div>
            { showComplementaryPaymentModal && (
               <CreateComplementaryPaymentModal
                  show={showComplementaryPaymentModal}
                  onSubmit={(data) => {
                     this.setState({ showComplementaryPaymentModal: false, payments: [...payments, data]}, () => {
                        this.props.updatePayments([...payments, data])
                     });
                  }}
                  onClose={() => this.setState({ showComplementaryPaymentModal: false})}
               />
            )}
         </div>
      )
   }
}

const mapStateToProps = ({ cart }) => {
   return { cart };
}

export default connect(mapStateToProps)(CheckoutItem);