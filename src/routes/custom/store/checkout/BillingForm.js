/**
 * Billing Form Component
 */

import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from "@material-ui/core/IconButton";


const stripePromise = loadStripe('pk_test_51Gz2fvFpVeqBYSfw7Am6yvkuz3Hv42Tma0auEhSyncIUXS0TtiSrt05JLgSH4AnKxSvVB3wMT7oA8lxoUcmp2vmX00NKx4OZmh');

// intl messages
import IntlMessages from 'Util/IntlMessages';

class BillingForm extends Component {
   constructor(props) {
      super(props);
      console.log('Stripe => ', stripePromise)
      const defaultValue = this.props.data;

      this.state = {
         showPaymentBox: false,
         entringCode: false,
         code: '',
         billingInformation: {
            addressLine1: defaultValue.addressLine1 || '',
            addressLine2: defaultValue.addressLine2 || '',
            country: defaultValue.country || '',
            zipCode: defaultValue.zipCode || '',
         }
      }
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

   handleSubmit = async (event) => {
      event.preventDefault();
      const { stripe, elements } = this.props;
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card: elements.getElement(CardElement),
      });
   };

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
      const { showPaymentBox, entringCode, code } = this.state;
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
                  <Elements stripe={stripePromise}>
                     <CardElement />
                     <Button disabled={!this.isFormValid()} onClick={() => this.setState({ showPaymentBox: true })} color="primary" variant="contained">
                        Payer
                     </Button>
                  </Elements>
               </div>
            </Form>
            <Dialog
               open={showPaymentBox}
               onClose={() => { this.setState({ showPaymentBox: false }) }}
               aria-labelledby="responsive-dialog-title"
               maxWidth={'sm'}
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
                  <Button disable={entringCode} size="large" onClick={() => /*this.props.onComplete(this.state.billingInformation, true)*/ console.log('Bonjour')} style={{ color: 'white' }} color="primary" variant="contained">
                     Payment Stripe
                  </Button>
                  <Button disable={entringCode} onClick={() => this.setState({ entringCode: true })} size="large" color="primary" variant="contained" style={{ marginTop: 40, marginBottom: entringCode ? 20 : 40, color: 'white' }}>
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
               </DialogContent>
            </Dialog>
         </div>
      )
   }
}
export default BillingForm;
