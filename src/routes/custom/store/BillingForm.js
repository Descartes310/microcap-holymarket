/**
 * Billing Form Component
 */

import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RctCard, RctCardContent } from 'Components/RctCard';
import {copyToClipboard, getSessonId, textTruncate} from "Helpers/helpers";
import SweetAlert from "react-bootstrap-sweetalert";
import {placeOrder, onClearCart, setRequestGlobalAction} from "Actions";
import {NotificationManager} from "react-notifications";
import {PRODUCT} from "Url/frontendUrl";

// intl messages
import IntlMessages from 'Util/IntlMessages';

class BillingForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         showConfirmBox: false,
         entringCode: false,
         accounts: [],
         code: '',
         orderRef: null,
         orderId: null,
         selectingAccount: false,
         billingInformation: {
            addressLine1: '',
            addressLine2: '',
            country: '',
            city: '',
            zipCode: '',
         }
      }
   }

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
      const { addressLine1, addressLine2, zipCode, city, country } = this.state.billingInformation;
      return addressLine1 !== '' && addressLine2 !== '' && zipCode !== '' && country !== '' && city !== '';
   }

   onContinueClick = () => {
      this.setState({showConfirmBox: false});
      this.props.history.push(PRODUCT.ORDERS);
  };

   onInitPayment = () => {
      const items = this.props.cart.items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          type: item.type,
          nature: item.nature
      }));

      const branchUrl = window.location.host;

      this.props.setRequestGlobalAction(true);
      placeOrder({
         address1: this.state.billingInformation.addressLine1, 
         address2: this.state.billingInformation.addressLine2, 
         country: this.state.billingInformation.country, 
         zip: this.state.billingInformation.zipCode, 
         city: this.state.billingInformation.city, 
         branchUrl: branchUrl, 
         items: JSON.stringify(items), 
         sessionId: getSessonId()
      })
          .then((result) => {
              this.props.onClearCart();
              this.setState({showConfirmBox: true, orderRef: result.reference, orderId: result.id});
          })
          .catch(() => {
          })
          .finally(() => this.props.setRequestGlobalAction(false));
  };

   render() {
      return (
         <RctCard customClasses="overflow-hidden">
            <RctCardContent>
               <div>
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
                        <Col sm={12}>
                           <Label for="countryName"><IntlMessages id="components.country" /><span className="text-danger">*</span></Label>
                           <Input
                              type="text"
                              name="country"
                              id="countryName"
                              className="mb-4 mb-sm-0"
                              onChange={(e) => this.onChangeBillingInformation('country', e.target.value)}
                           />
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Col sm={12}>
                           <Label for="cityName"><IntlMessages id="components.city" /><span className="text-danger">*</span></Label>
                           <Input
                              type="text"
                              name="city"
                              id="cityName"
                              className="mb-4 mb-sm-0"
                              onChange={(e) => this.onChangeBillingInformation('city', e.target.value)}
                           />
                        </Col>
                     </FormGroup>
                     <FormGroup row>
                        <Col sm={12}>
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
                     <Button disabled={
                        this.state.billingInformation.addressLine1.length == 0 ||
                        this.state.billingInformation.zipCode.length == 0 ||
                        this.state.billingInformation.city.length == 0 ||
                        this.state.billingInformation.country.length == 0
                     } onClick={() => this.onInitPayment()} color="primary" variant="contained" style={{ marginLeft: 10, color: 'white' }}>
                        Procéder a la commande
                  </Button>
                  </div>
               </div>
            </RctCardContent>
            <SweetAlert
                    success
                    show={this.state.showConfirmBox}
                    title={"Infos commande"}
                    onConfirm={() => this.onContinueClick()}
                    confirmBtnText="Continuer"
                    confirmBtnClass="btn-lg btn-primary btn-sm text-white"
                >
                    <div className="row">
                        <div className="col-12">
                            <p>Commande enregistré avec success</p>
                        </div>
                        <div className="col-12">
                            <p className="fw-bold my-3">
                                N° {this.state.orderRef}
                            </p>
                        </div>
                        <div className="col-12">
                            <p>A conserver. Il vous sera utile pour toutes demande d'informations</p>
                        </div>
                        <div className="col-12">
                            <a
                                href="#"
                                onClick={() => copyToClipboard(this.state.orderRef)}
                                className="fw-bold text-success"
                            >
                                Copier
                            </a>
                        </div>
                    </div>
                </SweetAlert>
         </RctCard>
      )
   }
}
const mapStateToProps = ({ authUser, cart, settings }) => {
   return { authUser: authUser.data, cart, currencies: settings.currencies };
};

export default connect(mapStateToProps, {
   setRequestGlobalAction, onClearCart
})(withRouter(BillingForm));
