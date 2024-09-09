import { connect } from "react-redux";
import React, { Component } from 'react';
import UserService from "Services/users";
import OrderService from "Services/orders";
import IntlMessages from 'Util/IntlMessages';
import TerritoryType from "Enums/Territories";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PaymentConfigService from "Services/paymentConfig";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getNotificationMethods, getPaymentMethods } from "Helpers/datas";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { Form, FormGroup, Input, Label, Col, InputGroup, InputGroupAddon } from 'reactstrap';

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
      discount: null,
      showShippingAddress: false,
      subscriptionCode: null,
      discountCode: null,
      showSubscriptionCodeField: false,
      showDiscountField: false,
      notificationMethods: [],
      paymentMethods: [],
      otherEmail: null,
      otherPhone: null,
      paymentConfig: null

   }

   componentDidMount(): void {
      this.getContacts();
      this.getCountries();
      if(this.props.cart.count() > 0) {
         console.log(this.props.cart);
         this.findPaymentConfig();
      }
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

   findPaymentConfig = () => {
      PaymentConfigService.findByProduct(this.props.cart.items[0].id)
      .then(paymentConfig => {
         this.setState({ 
            paymentConfig,
            paymentMethods: getPaymentMethods().filter(pm => paymentConfig.paymentMethods.includes(pm.value)).map(pm => pm.value),
            notificationMethods: getNotificationMethods().filter(nm => paymentConfig.notificationMethods.includes(nm.value)).map(nm => nm.value)
          });
      })
      .catch(error => {
         this.setState({ paymentConfig: null });
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

   findDiscount = () => {
      if(this.state.showDiscountField && this.state.discountCode) {
         this.props.setRequestGlobalAction(true);
         OrderService.findDiscount('0', {code: this.state.discountCode, productIds: this.props.productIds})
         .then((discount) => {
              NotificationManager.success("Le coupon est valide");
              this.setState({ discount }, () => {
               this.props.updateDiscount(discount);
              });
          })
         .catch((err) => {
            NotificationManager.error("Ce code est incorrect");
            this.props.updateDiscount(null);
         })
         .finally(() => this.props.setRequestGlobalAction(false))
      }
   }

   findSubscriptionCode = () => {
      if(this.state.showSubscriptionCodeField && this.state.subscriptionCode) {
         this.props.setRequestGlobalAction(true);
         OrderService.findSubscription('0', {code: this.state.subscriptionCode, productIds: this.props.productIds})
         .then(() => {
            NotificationManager.success("Le code de souscription est valide");
         })
         .catch((err) => {
            NotificationManager.error("Ce code est incorrect");
         })
         .finally(() => this.props.setRequestGlobalAction(false))
      }
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

      const {paymentMethods, notificationMethods, otherEmail, otherPhone} = this.state;

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
               <FormGroup row className="mb-10">
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
               <FormGroup row className="mb-0">
                  <Col sm={12}>
                     <Label className="ml-4">
                        <Input 
                           type="checkbox"
                           checked={this.state.showDiscountField}
                           onChange={(e) => this.setState({ showDiscountField: e.target.checked }, () => {
                              if(!this.state.showDiscountField) {
                                 this.props.updateDiscount(null);
                              }
                           })}
                        />
                        <p>J'ai un code de réduction</p>
                     </Label>
                  </Col>
               </FormGroup>
               { this.state.showDiscountField && (
                  <div className="d-flex">
                  <FormGroup className="col-sm-12 has-wrapper">
                     <InputLabel className="text-left" htmlFor="discountCode">
                           Code du coupon
                     </InputLabel>
                     <InputGroup>
                        <Input
                           type="text"
                           id="discountCode"
                           value={this.state.discountCode}
                           name={'discountCode'}
                           className="has-input input-lg custom-input"
                           onChange={(e) => this.setState({ discountCode: e.target.value })}
                        />
                        <InputGroupAddon addonType="append">
                           <Button color="primary" variant="contained" onClick={() => {
                              this.findDiscount();
                           }} >
                              <span className='text-white'>Rechercher</span>
                           </Button>
                        </InputGroupAddon>
                     </InputGroup>
                  </FormGroup>
                  </div> 
               )}
               <FormGroup row className="mb-0">
                  <Col sm={12}>
                     <Label className="ml-4">
                        <Input 
                           type="checkbox"
                           checked={this.state.showSubscriptionCodeField}
                           onChange={(e) => this.setState({ showSubscriptionCodeField: e.target.checked })}
                        />
                        <p>J'ai un code de reservation</p>
                     </Label>
                  </Col>
               </FormGroup>
               { this.state.showSubscriptionCodeField && (
                  <div className="d-flex">
                  <FormGroup className="col-sm-12 has-wrapper">
                     <InputLabel className="text-left" htmlFor="subscriptionCode">
                           Code de reservation
                     </InputLabel>
                     <InputGroup>
                           <Input
                              type="text"
                              id="subscriptionCode"
                              value={this.state.subscriptionCode}
                              name={'subscriptionCode'}
                              className="has-input input-lg custom-input"
                              onChange={(e) => this.setState({ subscriptionCode: e.target.value })}
                           />
                           <InputGroupAddon addonType="append">
                              <Button color="primary" variant="contained" onClick={() => {
                                 this.findSubscriptionCode();
                              }} >
                                 <span className='text-white'>Vérifier</span>
                              </Button>
                           </InputGroupAddon>
                     </InputGroup>
                  </FormGroup>
                  </div> 
               )}
               <h1 className='mb-20'>Mode de règlement</h1>
               <div className="row">
                  { getPaymentMethods().map(pm => 
                     <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                           <FormControlLabel control={
                              <Checkbox
                                 color="primary"
                                 disabled={true}
                                 checked={paymentMethods.includes(pm.value)}
                                 onChange={() => {
                                       if(!paymentMethods.includes(pm.value)) {
                                          this.setState({ paymentMethods: [...paymentMethods, pm.value] });
                                       } else {
                                          this.setState({ paymentMethods: [...paymentMethods.filter(n => n != pm.value)] });
                                       }
                                 }}
                              />
                           } label={pm.label}
                           />
                     </FormGroup>
                  )}
               </div>

               <h1 className='mb-20 mt-20'>Notifications</h1>
               <div className="row">
                  { getNotificationMethods().map(nm => 
                     <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                           <FormControlLabel control={
                              <Checkbox
                                 color="primary"
                                 checked={notificationMethods.includes(nm.value)}
                                 disabled={true}
                                 onChange={() => {
                                       if(!notificationMethods.includes(nm.value)) {
                                          this.setState({ notificationMethods: [...notificationMethods, nm.value] });
                                       } else {
                                          this.setState({ notificationMethods: [...notificationMethods.filter(n => n != nm.value)] });
                                       }
                                 }}
                              />
                           } label={nm.label}
                           />
                     </FormGroup>
                  )}
                  <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                     <InputLabel className="text-left" htmlFor="otherEmail">
                           Autre email (facultatif)
                     </InputLabel>
                     <Input
                           type="text"
                           id="otherEmail"
                           name='otherEmail'
                           value={otherEmail}
                           className="input-lg"
                           onChange={(e) => this.setState({ otherEmail: e.target.value })}
                     />
                  </FormGroup>
                  <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                     <InputLabel className="text-left" htmlFor="otherPhone">
                           Autre téléphone (facultatif)
                     </InputLabel>
                     <Input
                           type="text"
                           id="otherPhone"
                           name='otherPhone'
                           value={otherPhone}
                           className="input-lg"
                           onChange={(e) => this.setState({ otherPhone: e.target.value })}
                     />
                  </FormGroup>
               </div>
            </Form>
            <div className="d-flex justify-content-end">
               <Button
                  color="primary"
                  variant="contained"
                  className='text-white'
                  disabled={!this.isFormValid()}
                  onClick={() => this.props.onSubmit({discountCode: this.state.discountCode, subscriptionCode: this.state.subscriptionCode, billingInformation: this.state.billingInformation, shippingInformation: this.state.shippingInformation})}
               >
                  Enregistrer ma commande
               </Button>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ authUser, cart }) => {
   return {
      authUser: authUser.data,
      cart
   }
};

export default connect(mapStateToProps, {setRequestGlobalAction})(BillingForm);
