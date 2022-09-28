import { connect } from "react-redux";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'Util/IntlMessages';
import { Form, FormGroup, Input, Label, Col } from 'reactstrap';

class BillingForm extends Component<any, any> {

   state = {
      billingInformation: {
         emailId: '',
         mobileNumber: '',
         addressLine1: '',
         addressLine2: '',
         country: '',
         zipCode: '',
         state: ''
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
      const { emailId, mobileNumber, addressLine1, zipCode, country, state } = this.state.billingInformation;
      if (emailId !== '' && addressLine1 !== '' && mobileNumber !== '' && zipCode !== '' && country !== '' && state !== '') {
         return true
      } else {
         return false
      }
   }

   render() {
      return (
         <div className="billing-form-warp py-4">
            <Form>
               <FormGroup row>
                  <Col sm={6}>
                     <Label for="emailId"><IntlMessages id="components.email" /></Label>
                     <Input
                        type="email"
                        name="mail"
                        id="emailId"
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => this.onChangeBillingInformation('emailId', e.target.value)}
                     />
                  </Col>
                  <Col sm={6}>
                     <Label for="contactNumber"><IntlMessages id="components.mobileNumber" /></Label>
                     <Input
                        type="tel"
                        name="number"
                        id="contactNumber"
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => this.onChangeBillingInformation('mobileNumber', e.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Col sm={12}>
                     <Label for="address1"><IntlMessages id="components.address" />1</Label>
                     <Input
                        type="textarea"
                        name="address"
                        id="address1"
                        className="mb-4 mb-sm-0 input-lg"
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
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => this.onChangeBillingInformation('addressLine2', e.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Col sm={4}>
                     <Label for="countryName"><IntlMessages id="components.country" /></Label>
                     <Input
                        type="text"
                        name="country"
                        id="countryName"
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => this.onChangeBillingInformation('country', e.target.value)}
                     />
                  </Col>
                  <Col sm={4}>
                     <Label for="stateName"><IntlMessages id="components.state" /></Label>
                     <Input
                        type="text"
                        name="state"
                        id="stateName"
                        className="mb-4 mb-sm-0 input-lg"
                        onChange={(e) => this.onChangeBillingInformation('state', e.target.value)}
                     />
                  </Col>
                  <Col sm={4}>
                     <Label for="zip"><IntlMessages id="components.zip" /></Label>
                     <Input
                        type="number"
                        name="zip"
                        id="zip"
                        className="mb-4 mb-sm-0 input-lg"
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
               <Button
                  disabled={!this.isFormValid()}
                  onClick={() => this.props.onSubmit(this.state.billingInformation)}
                  color="primary"
                  variant="contained"
                  className='text-white'
               >
                  Enregistrer ma commande
               </Button>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ authUser }) => {
   return {
       authUser: authUser.data,
   }
};

export default connect(mapStateToProps, {})(BillingForm);
