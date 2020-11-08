/**
 * Billing Form Component
 */

import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class BillingForm extends Component {
   constructor(props) {
      super(props);

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

	/**
	 * Function To Check Either The Form Is Valid Or Not
	 * Return Boolean
	 */
   isFormValid() {
      const { addressLine1, addressLine2, zipCode, country } = this.state.billingInformation;
      return addressLine1 !== '' && addressLine2 !== '' && zipCode !== '' && country !== '';
   }

   render() {
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
            </Form>
            <div className="d-flex justify-content-end">
               <Button disabled={!this.isFormValid()} onClick={() => this.props.onComplete(this.state.billingInformation, true)} color="primary" variant="contained">
                  <IntlMessages id="components.saveContinue" />
               </Button>
            </div>
         </div>
      )
   }
}
export default BillingForm;
