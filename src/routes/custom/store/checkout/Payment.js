import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import MaskedInput from 'react-text-mask'
import { NotificationManager } from 'react-notifications';
import StripeCheckout from 'react-stripe-checkout';
import { computeAmountFromCurrency } from 'Helpers/helpers'
import Cart from "Models/Cart";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { withRouter } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import { getAccountByAmount, createSale } from 'Actions/independentActions';
import AmountCurrency from "Components/AmountCurrency";
import { PRODUCT } from "Url/frontendUrl";
import SweetAlert from "react-bootstrap-sweetalert";

class PaymentInfo extends Component {

   state = {
      showPaymentBox: false,
      entringCode: false,
      accounts: [],
      code: '',
      selectingAccount: false,
      showConfirmBox: false
   };

   onFormComplete = (voucher = null, account = null, token = null) => {

      if (voucher != null || account != null || token != null) {
         this.props.setRequestGlobalAction(true);
         let _data = {};
         _data.address1 = this.props.data.addressLine1;
         _data.address2 = this.props.data.addressLine2;
         _data.zip = this.props.data.zipCode;
         _data.country = this.props.data.country;
         _data.firstName = this.props.authUser.userName;
         _data.email = this.props.authUser.user.email;
         _data.phone = this.props.authUser.user.phone;
         _data.orderId = this.props.order.id;
         _data.userId = this.props.authUser.user.id;
         if (voucher != null)
            _data.voucherCode = voucher;
         if (account != null)
            _data.accountId = account;
         if (token != null)
            _data.stripeToken = token;

         createSale(_data)
            .then((resp) => {
               this.props.history.push(PRODUCT.ORDERS);
            })
            .catch((error) => {
               console.log(error)
               NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
      };
   }

   componentDidMount() {
      getAccountByAmount(this.props.authUser.user.id, 0).then(data => {
         this.setState({ accounts: data })
      })
   }

   onToken = (token) => {
      this.onFormComplete(null, null, token.id)
   }

   onContinueClick = () => {
      this.setState({ showConfirmBox: false });
      this.props.history.push(PRODUCT.ORDERS);
   };


   render() {
      const { showPaymentBox, entringCode, code, selectingAccount, showConfirmBox } = this.state;
      const cart = new Cart(this.props.order.orderItems.map(item => ({
         ...item.typeProduct,
         price: item.typeProduct.price,
         currency: item.typeProduct.product.priceCurrency,
         quantity: item.quantity
      })));
      return (
         <div className="payment-wrap">
            <div className='row'>
               <div className='col-md-4 col-lg-4 col-sm-12' style={{ textAlign: 'center', paddingTop: 20 }}>
                  <h1>Paiement par carte</h1>
                  <div style={{ width: 250, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <img src={require('Assets/img/card.png')} className="img-fluid" alt="cad" />
                  </div>
                  <p>
                     Utilisez votre carte de crédit pour effectuer le payement
                     </p>
                  <StripeCheckout
                     stripeKey="pk_test_51ILMcRF8O7K51xUUQ3rGe0lMNsDJWjM4DCxMH7zJwnxl2uFiVeC8hzrOYmAGHKiU4XAM5OIgHTZhjDrac7vP97yo00VO7op4Qx"
                     token={this.onToken}
                     amount={(Number(computeAmountFromCurrency(this.props.currencies, null, cart.items.map((e) => {
                        return { amount: e.price, currency: e.currency, quantity: e.quantity }
                     }), this.props.authUser.user.currency, null, null))) * this.props.authUser.user.currency.decimal}
                     name="Payer les produits"
                     opened={() => this.setState({ showPaymentBox: false })}
                     currency={this.props.authUser.user.currency ? this.props.authUser.user.currency.code : 'EUR'}
                     label="Payement par carte"
                  >
                     <Button color="secondary" className="text-white" variant="contained" style={{ width: '100%' }}>
                        Payer
                     </Button>
                  </StripeCheckout>
               </div>
               <div className='col-md-4 col-lg-4 col-sm-12' style={{ textAlign: 'center', paddingTop: 20 }}>
                  <h1>Paiement par coupon</h1>
                  <div style={{ width: 250, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <img src={require('Assets/img/voucher.png')} className="img-fluid" alt="cad" />
                  </div>
                  <p>
                     Utilisez le code d'un coupon de paiement pour effectuer l'achat
                  </p>
                  <Button onClick={() => this.setState({ showPaymentBox: true, entringCode: true, selectingAccount: false })} color="secondary" className="text-white" variant="contained">
                     Payer
                  </Button>
               </div>
               <div className='col-md-4 col-lg-4 col-sm-12' style={{ textAlign: 'center', paddingTop: 20 }}>
                  <h1>Paiement par compte</h1>
                  <div style={{ width: 250, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <img src={require('Assets/img/wallet.png')} className="img-fluid" alt="cad" />
                  </div>
                  <p>
                     Utilisez un de vos compte crédité pour procéder au règlement
                  </p>
                  <Button onClick={() => this.setState({ showPaymentBox: true, selectingAccount: true, entringCode: false })} color="secondary" className="text-white" variant="contained">
                     Payer
                  </Button>
               </div>
               <div className='col-md-4 col-lg-4 col-sm-12' style={{ textAlign: 'center', paddingTop: 20 }}>
                  <h1>Offre prépayéé</h1>
                  <div style={{ width: 250, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <img src={require('Assets/img/before.png')} className="img-fluid" alt="cad" />
                  </div>
                  <p>
                     Utilisez une offre déjà existante pour régler l'achat en cours
                     </p>
                  <Button color="secondary" className="text-white" variant="contained">
                     Payer
                     </Button>
               </div>
               <div className='col-md-4 col-lg-4 col-sm-12' style={{ textAlign: 'center', paddingTop: 20 }}>
                  <h1>Paiement libre</h1>
                  <div style={{ width: 250, height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <img src={require('Assets/img/differed.png')} className="img-fluid" alt="cad" />
                  </div>
                  <p>
                     Vous pouvez effectuer un paiement en plusieurs tranches pour l'achat
                     </p>
                  <Button color="secondary" className="text-white" variant="contained">
                     Payer
                     </Button>
               </div>
            </div>
            <Dialog
               open={showPaymentBox}
               onClose={() => { this.setState({ showPaymentBox: false }) }}
               aria-labelledby="responsive-dialog-title"
               maxWidth={'md'}
               fullWidth
            >
               <DialogTitle id="form-dialog-title">
                  <div className="row justify-content-between align-items-center">
                     Effectuer le paiement
                            <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        onClick={() => { this.setState({ showPaymentBox: false }) }}>
                        <CancelIcon />
                     </IconButton>
                  </div>
               </DialogTitle>
               <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: entringCode ? 'block' : 'none' }}>
                     <FormGroup row>
                        <Col sm={12}>
                           <Label>Code de paiement</Label>
                           <Input
                              type="text"
                              className="mb-sm-0"
                              onChange={(e) => this.setState({ code: e.target.value })}
                           />
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Col sm={6}>
                           <Button onClick={() => this.setState({ entringCode: false, showPaymentBox: false })} size="large" variant="contained" style={{ marginTop: 40, marginBottom: 40, color: 'black' }}>
                              Annuler
                           </Button>
                        </Col>
                        <Col sm={6}>
                           <Button onClick={() => this.onFormComplete(code)} size="large" variant="contained" style={{ marginTop: 40, marginBottom: 40, color: 'white', backgroundColor: '#1976d2' }}>
                              Payer
                           </Button>
                        </Col>
                     </FormGroup>
                  </div>
                  <div style={{ display: selectingAccount ? 'block' : 'none' }}>
                     <Label style={{ marginBottom: 20, fontWeight: 'bold' }}>Selectionnez le compte à débiter</Label>

                     {this.state.accounts.map((account, index) => (
                        <FormGroup row style={{ justifyContent: 'space-around', alignItems: 'center' }} key={index}>
                           <Col sm={7}>
                              <Label>{account.label} </Label>
                           </Col>
                           <Col sm={3}>
                              <Label>Solde: <AmountCurrency amount={account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE').length > 0 ? account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE')[0].value : 0} from={account.detailsProducts.filter(d => d.detailsType.name == 'CURRENCY').length > 0 ? account.detailsProducts.filter(d => d.detailsType.name == 'CURRENCY')[0].value : 'EUR'} /> </Label>
                           </Col>
                           <Col sm={2}>
                              <Button onClick={() => this.onFormComplete(null, account.id)} size="large" variant="contained" style={{ color: 'white', backgroundColor: '#1976d2' }}>
                                 Payer
                           </Button>
                           </Col>
                        </FormGroup>
                     ))}
                  </div>
               </DialogContent>
            </Dialog>
            <SweetAlert
               success
               show={showConfirmBox}
               title={"Infos achat"}
               onConfirm={() => this.onContinueClick()}
               confirmBtnText="Terminer"
               confirmBtnClass="btn-lg btn-primary btn-sm text-white"
            >
               <div className="row">
                  <div className="col-12">
                     <p>Achat effectué avec succès</p>
                  </div>
                  <div className="col-12">
                     <p>Vous venez de réaliser avec succès le règlement de la commande {this.props.order.name}</p>
                  </div>
               </div>
            </SweetAlert>
         </div>
      )
   }
}

const mapStateToProps = ({ authUser, cart, settings }) => {
   return { authUser: authUser.data, cart, currencies: settings.currencies };
};

export default connect(mapStateToProps, {
   setRequestGlobalAction,
})(withRouter(PaymentInfo));

