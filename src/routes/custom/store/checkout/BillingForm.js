/**
 * Billing Form Component
 */

import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51Gz2fvFpVeqBYSfw7Am6yvkuz3Hv42Tma0auEhSyncIUXS0TtiSrt05JLgSH4AnKxSvVB3wMT7oA8lxoUcmp2vmX00NKx4OZmh');

// intl messages
import IntlMessages from 'Util/IntlMessages';

class BillingForm extends Component {
   constructor(props) {
      super(props);
      console.log('Stripe => ', stripePromise)
      const defaultValue = this.props.data;

      this.state = {
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
      return (
         <div className="billing-form-warp py-4">
            <Form>
               <FormGroup row>
                  <Col sm={12}>
                     <Label for="address1"><IntlMessages id="components.address" />1<span className="text-danger">*</span></Label>
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
                     <Button disabled={!this.isFormValid()} onClick={() => this.props.onComplete(this.state.billingInformation, true)} color="primary" variant="contained">
                        <IntlMessages id="components.saveContinue" />
                     </Button>
                  </Elements>
               </div>
            </Form>
         </div>
      )
   }
}
export default BillingForm;
