import { connect } from "react-redux";
import React, { Component } from 'react';
import UserService from "Services/users";
import IntlMessages from 'Util/IntlMessages';
import TerritoryType from "Enums/Territories";
import Button from '@material-ui/core/Button';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Form, FormGroup, Input, Label, Col } from 'reactstrap';

class BillingForm extends Component<any, any> {

   state = {
      billingInformation: {
         emailId: '',
         mobileNumber: '',
         addressLine1: '',
         addressLine2: '',
         country: null,
         zipCode: '',
         state: '',
      },      
      shippingInformation: {
         addressLine1: '',
         country: null,
         zipCode: '',
         state: '',
      },
      countries: [],
      showShippingAddress: false
   }

   componentDidMount(): void {
      this.getContacts();
      this.getCountries();
   }

   getCountries = () => {
      TerritoryService.getTerritories(TerritoryType.COUNTRY)
      .then(countries => {
          this.setState({ countries });
      })
      .catch(error => {
          this.setState({ countries: [] });
          NotificationManager.error("An error occur " + error);
      });
  };

   getContacts = () => {
      UserService.getContacts().then((contacts) => {
          this.setState({ 
            billingInformation : {
               ...this.state.billingInformation,
               emailId: this.props.authUser.email,
               mobileNumber: contacts.find(c => c.type === 'PHONE')?.value,
               addressLine1: contacts.find(c => c.type === 'ADDRESS')?.value,
               addressLine2: contacts.find(c => c.type === 'ADDRESS')?.value
            },

            shippingInformation: {
               ...this.state.shippingInformation,
               addressLine1: contacts.find(c => c.type === 'ADDRESS')?.value,
               addressLine2: contacts.find(c => c.type === 'ADDRESS')?.value
            }
         })
      });
  }

   onChangeBillingInformation(key, value) {
      this.setState({
         billingInformation: {
            ...this.state.billingInformation,
            [key]: value
         }
      })
   }   
   
   onChangeShippingInformation(key, value) {
      this.setState({
         shippingInformation: {
            ...this.state.shippingInformation,
            [key]: value
         }
      })
   }

   isFormValid() {
      const { emailId, mobileNumber, addressLine1, zipCode, country, state } = this.state.billingInformation;
      if (emailId !== '' && addressLine1 !== '' && mobileNumber !== '' && zipCode !== '' && country !== '' && state !== '') {
         if(this.state.showShippingAddress) {
            const { addressLine1, zipCode, country, state } = this.state.shippingInformation;
            if (addressLine1 !== '' && zipCode !== '' && country !== '' && state !== '') {
               return true;
            } else {
               return false;
            }
         } else {
            return true;
         }
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
                        defaultValue={this.props.authUser.email}
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
                        defaultValue={this.state.billingInformation.mobileNumber}
                        onChange={(e) => this.onChangeBillingInformation('mobileNumber', e.target.value)}
                     />
                  </Col>
               </FormGroup>
               <h4 className="mb-20 mt-20">Adresse de facturation</h4>
               <FormGroup row>
                  <Col sm={12}>
                     <Label for="address1"><IntlMessages id="components.address" /></Label>
                     <Input
                        type="textarea"
                        name="address"
                        id="address1"
                        className="mb-4 mb-sm-0 input-lg"
                        defaultValue={this.state.billingInformation.addressLine1}
                        onChange={(e) => this.onChangeBillingInformation('addressLine1', e.target.value)}
                     />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Col sm={4}>
                     <Label className="text-left">
                        <IntlMessages id="components.country" />
                     </Label>
                     <Autocomplete
                        id="combo-box-demo"
                        options={this.state.countries}
                        classes={{ paper: 'custom-input' }}
                        getOptionLabel={(option) => option.label}
                        value={this.state.billingInformation.country}
                        onChange={(__, item) => { this.setState({ billingInformation: {...this.state.billingInformation, country: item} }) }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                        <Input type="checkbox" onChange={(e) => this.setState({ showShippingAddress: e.target.checked })}/>
                        <IntlMessages id="components.ShippingAddressText" />
                     </Label>
                  </Col>
               </FormGroup>

               {this.state.showShippingAddress && (
                  <>
                     <h4 className="mb-20 mt-20">Adresse de livraison</h4>
                     <FormGroup row>
                        <Col sm={12}>
                           <Label for="address1"><IntlMessages id="components.address" /></Label>
                           <Input
                              type="textarea"
                              name="address"
                              id="address1"
                              className="mb-4 mb-sm-0 input-lg"
                              defaultValue={this.state.shippingInformation.addressLine1}
                              onChange={(e) => this.onChangeShippingInformation('addressLine1', e.target.value)}
                           />
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Col sm={4}>
                           <Label className="text-left">
                              <IntlMessages id="components.country" />
                           </Label>
                           <Autocomplete
                              id="combo-box-demo"
                              options={this.state.countries}
                              classes={{ paper: 'custom-input' }}
                              getOptionLabel={(option) => option.label}
                              value={this.state.shippingInformation.country}
                              renderInput={(params) => <TextField {...params} variant="outlined" />}
                              onChange={(__, item) => { this.setState({ shippingInformation: {...this.state.shippingInformation, country: item} }) }}
                           />
                        </Col>
                        <Col sm={4}>
                           <Label for="stateName"><IntlMessages id="components.state" /></Label>
                           <Input
                              type="text"
                              name="state"
                              id="stateName"
                              className="mb-4 mb-sm-0 input-lg"
                              onChange={(e) => this.onChangeShippingInformation('state', e.target.value)}
                           />
                        </Col>
                        <Col sm={4}>
                           <Label for="zip"><IntlMessages id="components.zip" /></Label>
                           <Input
                              type="number"
                              name="zip"
                              id="zip"
                              className="mb-4 mb-sm-0 input-lg"
                              onChange={(e) => this.onChangeShippingInformation('zipCode', e.target.value)}
                           />
                        </Col>
                     </FormGroup>
                  </>
               )}
            </Form>
            <div className="d-flex justify-content-end">
               <Button
                  color="primary"
                  variant="contained"
                  className='text-white'
                  disabled={!this.isFormValid()}
                  onClick={() => this.props.onSubmit({billingInformation: this.state.billingInformation, shippingInformation: this.state.shippingInformation})}
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
       authUser: authUser.data
   }
};

export default connect(mapStateToProps, {})(BillingForm);
