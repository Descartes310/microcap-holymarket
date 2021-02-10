/**
 * Billing Form Component
 */

import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { loadStripe } from '@stripe/stripe-js';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";
import { getAccountByAmount } from 'Actions/independentActions';
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { withRouter } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';


const stripePromise = loadStripe('pk_test_51Gz2fvFpVeqBYSfw7Am6yvkuz3Hv42Tma0auEhSyncIUXS0TtiSrt05JLgSH4AnKxSvVB3wMT7oA8lxoUcmp2vmX00NKx4OZmh');

// intl messages
import IntlMessages from 'Util/IntlMessages';

class BillingForm extends Component {
   constructor(props) {
      super(props);
      console.log('Stripe => ', this.props.cart.getTotalPrice())
      const defaultValue = this.props.data;

      this.state = {
         showPaymentBox: false,
         entringCode: false,
         accounts: [],
         code: '',
         selectingAccount: false,
         billingInformation: {
            addressLine1: defaultValue.addressLine1 || '',
            addressLine2: defaultValue.addressLine2 || '',
            country: defaultValue.country || '',
            zipCode: defaultValue.zipCode || '',
         }
      }
   }

   onToken = (token, address) => {

      console.log('STRYPE TOKEN', token);
      console.log('STRYPE ADDRESS', address);

      const tokenToSend = token.id;
      const amount = 100;
      //const SK = 'sk_test_51IIZ35AcN6gYdJ7TK61kTa8ReZje9jvmfrIqCNMgEsOIQr1VZhz4VKPUmirEFpodHIvZuISv5U6S0AGIspXo6Qnh009JWP1Jjo';
      makePayement({ tokenToSend, amount }).then((result) => {

      }).catch((err) => {

         console.log(err);
      });
   }

   componentDidMount() {
      getAccountByAmount(this.props.authUser.user.id, 0).then(data => {
         this.setState({ accounts: data })
      })
   }
	/**
	 * On Change Billing Information
	 */
   onChangeBillingInformation(key, value) {
      this.setState({
         billingInformation: {
            ...this.state.billingInformation,
            [key]: value
         }
      })
   }

   //this.props.onComplete(this.state.billingInformation, true)

	/**
	 * Function To Check Either The Form Is Valid Or Not
	 * Return Boolean
	 */
   isFormValid() {
      const { addressLine1, addressLine2, zipCode, country } = this.state.billingInformation;
      return addressLine1 !== '' && addressLine2 !== '' && zipCode !== '' && country !== '';
   }

   render() {
      const { stripe } = this.props;
      const { showPaymentBox, entringCode, code, selectingAccount } = this.state;
      return (
         <div className="billing-form-warp py-4">
            <Form>
               <FormGroup row>
                  <Col sm={12}>
                     <Label for="address1"><IntlMessages id="components.billingAddress" />1<span className="text-danger">*</span></Label>
                     <Input
                        type="textarea"
                        name="address"
                        id="address1"
                        onChange={(e) => this.onChangeBillingInformation('addressLine1', e.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Col sm={12}>
                     <Label for="address2"><IntlMessages id="components.address2Optional" /></Label>
                     <Input
                        type="textarea"
                        name="address"
                        id="address2"
                        onChange={(e) => this.onChangeBillingInformation('addressLine2', e.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Col sm={6}>
                     <Label for="countryName"><IntlMessages id="components.country" /><span className="text-danger">*</span></Label>
                     <Input
                        type="text"
                        name="country"
                        id="countryName"
                        className="mb-4 mb-sm-0"
                        onChange={(e) => this.onChangeBillingInformation('country', e.target.value)}
                     />
                  </Col>
                  <Col sm={6}>
                     <Label for="zip"><IntlMessages id="components.zip" /><span className="text-danger">*</span></Label>
                     <Input
                        type="number"
                        id="zip"
                        name="zip"
                        onChange={(e) => this.onChangeBillingInformation('zipCode', e.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row className="mb-0">
                  <Col sm={12}>
                     <Label className="ml-4">
                        <Input type="checkbox" /><IntlMessages id="components.ShippingAddressText" />
                     </Label>
                  </Col>
               </FormGroup>

               <div className="d-flex justify-content-end">
                  <Button disabled={!this.isFormValid()} onClick={() => this.setState({ showPaymentBox: true })} color="primary" variant="contained">
                     Payer
                  </Button>
               </div>
            </Form>
            <Dialog
               open={showPaymentBox}
               onClose={() => { this.setState({ showPaymentBox: false }) }}
               aria-labelledby="responsive-dialog-title"
               maxWidth={'md'}
               fullWidth
            >
               <DialogTitle id="form-dialog-title">
                  <div className="row justify-content-between align-items-center">
                     Selectionnez le mode de paiement
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
                  <StripeCheckout
                     stripeKey="pk_test_51IIZ35AcN6gYdJ7T3HZctvJcdqOLuMHBG7WMMiVtFJtOW2IlJBwIRzIXCu2DPPJLvzCi4HEHEX3ZDqC5wQREOsj300xS6NlkLx"
                     token={this.onToken}
                     amount={100}
                     // amount={(Number(this.props.cart.getTotalPrice())+49.00)*100}
                     currency="EUR"
                     name={'Tesla Roadster'}
                     // name={this.props.authUser.userName}
                     label='Payment par stripe'
                     billingAddress
                     shippingAddress
                  />
                  <Button size="large" onClick={() => this.setState({ selectingAccount: true, entringCode: false })} style={{ marginTop: 40, color: 'white' }} color="primary" variant="contained">
                     Payment par compte Microcap
                  </Button>
                  <Button onClick={() => this.setState({ entringCode: true, selectingAccount: false })} size="large" color="primary" variant="contained" style={{ marginTop: 40, marginBottom: entringCode ? 20 : 40, color: 'white' }}>
                     Utiliser un coupon de paiement
                  </Button>

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
                           <Button onClick={() => this.props.onComplete(this.state.billingInformation, false, code)} size="large" variant="contained" style={{ marginTop: 40, marginBottom: 40, color: 'white', backgroundColor: '#1976d2' }}>
                              Payer
                           </Button>
                        </Col>
                     </FormGroup>
                  </div>
                  <div style={{ display: selectingAccount ? 'block' : 'none' }}>
                     <Label>Selectionnez le compte a débiter</Label>

                     {this.state.accounts.map((account) => (
                        <FormGroup row style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                           <Col sm={7}>
                              <Label>{account.label} </Label>
                           </Col>
                           <Col sm={3}>
                              <Label>Solde: {account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE').length > 0 ? account.detailsProducts.filter(d => d.detailsType.name == 'SOLDE')[0].value : 0} {account.typeProduct.currency}</Label>
                           </Col>
                           <Col sm={2}>
                              <Button onClick={() => this.props.onComplete(this.state.billingInformation, false, null, account.id)} size="large" variant="contained" style={{ color: 'white', backgroundColor: '#1976d2' }}>
                                 Payer
                           </Button>
                           </Col>
                        </FormGroup>
                     ))}
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      )
   }
}
const mapStateToProps = ({ authUser, cart }) => {
   return { authUser: authUser.data, cart };
};

export default connect(mapStateToProps, {
   setRequestGlobalAction,
})(withRouter(BillingForm));
