import { connect } from "react-redux";
import React, { Component } from 'react';
import ShopHeader from './components/Header';
import IntlMessages from 'Util/IntlMessages';
import TerritoryType from "Enums/Territories";
import ProductService from "Services/products";
import SweetAlert from 'react-bootstrap-sweetalert';
import TerritoryService from 'Services/territories';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { setRequestGlobalAction, onClearCart } from 'Actions';

import './checkout.css';
import OrderService from "Services/orders";
import { ROOT } from "Url/frontendUrl";

class BillingForm extends Component<any, any> {

   state = {
      showSweetAlert: false,
      billingInformation: {
         firstName: '',
         lastName: '',
         emailId: '',
         mobileNumber: '',
         addressLine1: '',
         addressLine2: '',
         country: null,
         city: '',
         zipCode: '',
      },
      shippingInformation: {
         addressLine1: '',
         country: null,
         city: '',
         zipCode: '',
      },
      countries: [],
      discount: null,
      showShippingAddress: false,
      subscriptionCode: null,
      discountCode: null,
      showSubscriptionCodeField: false,
      showDiscountField: false,
      paymentConfig: null,
      booking: null,
      submittedJson: null,
   }

   componentDidMount(): void {
      this.getCountries();
      if (this.props.subscriptionCode) {
         this.setState({ subscriptionCode: this.props.subscriptionCode, showSubscriptionCodeField: true }, () => {
            this.findSubscriptionCode();
         });
      }
      // if (this.props.discountCode) {
      //    this.setState({ discountCode: this.props.discountCode, showDiscountField: true }, () => {
      //       this.findDiscount();
      //    });
      // }
   }

   getCountries = () => {
      TerritoryService.getTerritories(TerritoryType.COUNTRY)
         .then(countries => this.setState({ countries }))
         .catch(error => {
            this.setState({ countries: [] });
            NotificationManager.error("An error occur " + error);
         });
   };

   onChangeBilling(key, value) {
      this.setState({ billingInformation: { ...this.state.billingInformation, [key]: value } });
   }

   onChangeShipping(key, value) {
      this.setState({ shippingInformation: { ...this.state.shippingInformation, [key]: value } });
   }

   // findDiscount = () => {
   //    if (this.state.showDiscountField && this.state.discountCode) {
   //       this.props.setRequestGlobalAction(true);
   //       OrderService.findDiscount('0', { code: this.state.discountCode, productIds: this.props.productIds })
   //          .then((discount) => {
   //             NotificationManager.success("Le coupon est valide");
   //             this.setState({ discount }, () => this.props.updateDiscount(discount));
   //          })
   //          .catch(() => {
   //             NotificationManager.error("Ce code est incorrect");
   //             this.props.updateDiscount(null);
   //          })
   //          .finally(() => this.props.setRequestGlobalAction(false));
   //    }
   // };

   findSubscriptionCode = () => {
      if (this.state.showSubscriptionCodeField && this.state.subscriptionCode) {
         this.props.setRequestGlobalAction(true);
         let data: any = { natures: ['MARKETPLACE', 'INVITATION'], productIds: this.props.productIds, usable: true };
         if (this.props.referralCode) data.referralCode = this.props.referralCode;

         ProductService.findBookingByCode(this.state.subscriptionCode, data)
            .then(response => {
               this.setState({ booking: response });
               if (response.discount) {
                  NotificationManager.success("Le coupon est valide");
                  this.setState({ discount: response.discount, showDiscountField: true, discountCode: response.discount.code }, () => {
                     this.props.updateDiscount(response.discount);
                  });
               }
               NotificationManager.success("Le code de réservation est valide");
            })
            .catch(() => {
               this.setState({ booking: null });
               NotificationManager.error("Le code de réservation est incorrect");
            })
            .finally(() => this.props.setRequestGlobalAction(false));
      }
   };

   isFormValid() {
      const { firstName, lastName, emailId, mobileNumber, addressLine1, city, country, zipCode } = this.state.billingInformation;
      const billingOk = firstName !== '' && lastName !== '' && emailId !== '' && addressLine1 !== '' && mobileNumber !== '' && city !== '' && country !== null && zipCode !== '';
      if (!billingOk) return false;
      if (this.state.showShippingAddress) {
         const { addressLine1, city, country, zipCode } = this.state.shippingInformation;
         return addressLine1 !== '' && city !== '' && country !== null && zipCode !== '';
      }
      return true;
   }

   handleSubmit = () => {
      const payload = {
         billingInformation: this.state.billingInformation,
         shippingInformation: this.state.showShippingAddress ? this.state.shippingInformation : this.state.billingInformation,
         discountCode: this.state.discountCode || null,
         subscriptionCode: this.state.subscriptionCode || null
      };

      let data: any = {
         city: payload.billingInformation.city,
         zip: payload.billingInformation.zipCode,
         email: payload.billingInformation.emailId,
         address1: payload.billingInformation.addressLine1,
         telephone: payload.billingInformation.mobileNumber,
         shipping_city: payload.shippingInformation.city,
         shipping_zip: payload.shippingInformation.zipCode,
         country: payload.billingInformation.country?.id,
         shipping_country: payload.shippingInformation.country?.id,
         shipping_address1: payload.shippingInformation.addressLine1,
         productIds: this.props.cart.items.map(product => product.id),
         sources: this.props.cart.items.map(product => product.source),
         productQuantities: this.props.cart.items.map(product => product.quantity)
     }
     this.props.setRequestGlobalAction(true);
     OrderService.createHolyMarketOrder(data).then((response) => {
         this.setState({ showSweetAlert: true, order: response });
         this.props.onClearCart();
     })
     .catch((err) => {
         NotificationManager.error("La création de votre commande a échoué!");
     })
     .finally(() => {
         this.props.setRequestGlobalAction(false);
     })
   };

   confirmSweetAlert = () => {
      this.setState({ showSweetAlert: false });
      this.props.history.push(ROOT);
  }

   render() {
      const { submittedJson, showSweetAlert } = this.state;

      return (
         <div className="bf-root">
            <ShopHeader />

            {/* ── HEADER ── */}
            <div className="bf-page-header">
               <div className="bf-page-label">Boutique</div>
               <h1 className="bf-page-title">Finaliser ma commande</h1>
            </div>

            <div className="bf-body">

               {/* ══ SECTION: Identité ══ */}
               <section className="bf-section">
                  <div className="bf-section-title">Identité</div>
                  <div className="bf-grid-2">
                     <div className="bf-field">
                        <label className="bf-label">Prénom</label>
                        <input
                           className="bf-input"
                           type="text"
                           placeholder="Jean"
                           onChange={e => this.onChangeBilling('firstName', e.target.value)}
                        />
                     </div>
                     <div className="bf-field">
                        <label className="bf-label">Nom</label>
                        <input
                           className="bf-input"
                           type="text"
                           placeholder="Dupont"
                           onChange={e => this.onChangeBilling('lastName', e.target.value)}
                        />
                     </div>
                     <div className="bf-field">
                        <label className="bf-label"><IntlMessages id="components.email" /></label>
                        <input
                           className="bf-input"
                           type="email"
                           defaultValue={this.props.authUser?.email}
                           placeholder="email@exemple.com"
                           onChange={e => this.onChangeBilling('emailId', e.target.value)}
                        />
                     </div>
                     <div className="bf-field">
                        <label className="bf-label"><IntlMessages id="components.mobileNumber" /></label>
                        <input
                           className="bf-input"
                           type="tel"
                           defaultValue={this.state.billingInformation.mobileNumber}
                           placeholder="+237 6XX XXX XXX"
                           onChange={e => this.onChangeBilling('mobileNumber', e.target.value)}
                        />
                     </div>
                  </div>
               </section>

               {/* ══ SECTION: Adresse de facturation ══ */}
               <section className="bf-section">
                  <div className="bf-section-title">Adresse de facturation</div>
                  <div className="bf-field bf-field--full">
                     <label className="bf-label"><IntlMessages id="components.address" /></label>
                     <textarea
                        className="bf-input bf-textarea"
                        defaultValue={this.state.billingInformation.addressLine1}
                        placeholder="Rue, quartier, numéro..."
                        onChange={e => this.onChangeBilling('addressLine1', e.target.value)}
                     />
                  </div>
                  <div className="bf-grid-3">
                     <div className="bf-field">
                        <label className="bf-label"><IntlMessages id="components.country" /></label>
                        <Autocomplete
                           options={this.state.countries}
                           classes={{ paper: 'bf-autocomplete-paper' }}
                           getOptionLabel={(option: any) => option.label}
                           value={this.state.billingInformation.country}
                           onChange={(__, item) => this.setState({ billingInformation: { ...this.state.billingInformation, country: item } })}
                           renderInput={(params) => (
                              <TextField {...params} variant="outlined" className="bf-autocomplete" />
                           )}
                        />
                     </div>
                     <div className="bf-field">
                        <label className="bf-label"><IntlMessages id="components.city" /></label>
                        <input
                           className="bf-input"
                           type="text"
                           placeholder="Ville"
                           onChange={e => this.onChangeBilling('city', e.target.value)}
                        />
                     </div>
                     <div className="bf-field">
                        <label className="bf-label"><IntlMessages id="components.zipCode" /></label>
                        <input
                           className="bf-input"
                           type="number"
                           placeholder="Code postal"
                           onChange={e => this.onChangeBilling('zipCode', e.target.value)}
                        />
                     </div>
                  </div>
               </section>

               {/* ══ TOGGLE: Adresse de livraison ══ */}
               <section className="bf-section bf-section--toggle">
                  <label className="bf-toggle-label">
                     <div className={`bf-toggle-track ${this.state.showShippingAddress ? 'active' : ''}`}>
                        <input
                           type="checkbox"
                           className="bf-toggle-input"
                           onChange={e => this.setState({ showShippingAddress: e.target.checked })}
                        />
                        <span className="bf-toggle-thumb" />
                     </div>
                     <span><IntlMessages id="components.ShippingAddressText" /></span>
                  </label>
               </section>

               {this.state.showShippingAddress && (
                  <section className="bf-section">
                     <div className="bf-section-title">Adresse de livraison</div>
                     <div className="bf-field bf-field--full">
                        <label className="bf-label"><IntlMessages id="components.address" /></label>
                        <textarea
                           className="bf-input bf-textarea"
                           defaultValue={this.state.shippingInformation.addressLine1}
                           placeholder="Rue, quartier, numéro..."
                           onChange={e => this.onChangeShipping('addressLine1', e.target.value)}
                        />
                     </div>
                     <div className="bf-grid-3">
                        <div className="bf-field">
                           <label className="bf-label"><IntlMessages id="components.country" /></label>
                           <Autocomplete
                              options={this.state.countries}
                              classes={{ paper: 'bf-autocomplete-paper' }}
                              getOptionLabel={(option: any) => option.label}
                              value={this.state.shippingInformation.country}
                              onChange={(__, item) => this.setState({ shippingInformation: { ...this.state.shippingInformation, country: item } })}
                              renderInput={(params) => (
                                 <TextField {...params} variant="outlined" className="bf-autocomplete" />
                              )}
                           />
                        </div>
                        <div className="bf-field">
                           <label className="bf-label"><IntlMessages id="components.city" /></label>
                           <input
                              className="bf-input"
                              type="text"
                              placeholder="Ville"
                              onChange={e => this.onChangeShipping('city', e.target.value)}
                           />
                        </div>
                        <div className="bf-field">
                           <label className="bf-label"><IntlMessages id="components.zipCode" /></label>
                           <input
                              className="bf-input"
                              type="number"
                              placeholder="Code postal"
                              onChange={e => this.onChangeShipping('zipCode', e.target.value)}
                           />
                        </div>
                     </div>
                  </section>
               )}

               {/* ══ SECTION: Codes promo / réservation ══ */}
               {/* <section className="bf-section">
                  <div className="bf-section-title">Codes &amp; promotions</div>

                  <label className="bf-toggle-label bf-toggle-label--sm">
                     <div className={`bf-toggle-track ${this.state.showDiscountField ? 'active' : ''}`}>
                        <input
                           type="checkbox"
                           className="bf-toggle-input"
                           checked={this.state.showDiscountField}
                           onChange={e => this.setState({ showDiscountField: e.target.checked }, () => {
                              if (!this.state.showDiscountField) this.props.updateDiscount(null);
                           })}
                        />
                        <span className="bf-toggle-thumb" />
                     </div>
                     <span>J'ai un code de réduction</span>
                  </label>
                  {this.state.showDiscountField && (
                     <div className="bf-code-row">
                        <input
                           className="bf-input bf-input--code"
                           type="text"
                           placeholder="PROMO2024"
                           value={this.state.discountCode || ''}
                           onChange={e => this.setState({ discountCode: e.target.value })}
                        />
                        <button className="bf-code-btn" onClick={this.findDiscount}>Appliquer</button>
                     </div>
                  )}

                  <label className="bf-toggle-label bf-toggle-label--sm" style={{ marginTop: '1rem' }}>
                     <div className={`bf-toggle-track ${this.state.showSubscriptionCodeField ? 'active' : ''}`}>
                        <input
                           type="checkbox"
                           className="bf-toggle-input"
                           checked={this.state.showSubscriptionCodeField}
                           onChange={e => this.setState({ showSubscriptionCodeField: e.target.checked })}
                        />
                        <span className="bf-toggle-thumb" />
                     </div>
                     <span>J'ai un code de réservation</span>
                  </label>
                  {this.state.showSubscriptionCodeField && (
                     <div className="bf-code-row">
                        <input
                           className="bf-input bf-input--code"
                           type="text"
                           placeholder="RES-XXXXXX"
                           value={this.state.subscriptionCode || ''}
                           onChange={e => this.setState({ subscriptionCode: e.target.value })}
                        />
                        <button className="bf-code-btn" onClick={this.findSubscriptionCode}>Vérifier</button>
                     </div>
                  )}
               </section> */}

               {/* ══ CTA ══ */}
               <div className="bf-cta-strip">
                  <div className="bf-cta-text">
                     Tout est prêt ? <span>Vérifiez vos informations avant de valider.</span>
                  </div>
                  <button
                     className="bf-cta-btn"
                     disabled={!this.isFormValid()}
                     onClick={this.handleSubmit}
                  >
                     Enregistrer ma commande →
                  </button>
               </div>

               {/* ══ JSON DEBUG OUTPUT ══ */}
               {submittedJson && (
                  <section className="bf-section bf-json-section">
                     <div className="bf-section-title">Données soumises</div>
                     <pre className="bf-json-block">{submittedJson}</pre>
                  </section>
               )}

            </div>
            <SweetAlert
               success
               btnSize="sm"
               showCancel
               showConfirm={false}
               cancelBtnText="Terminer"
               show={showSweetAlert}
               title={"Votre commande a été enregistrée avec succès !"}
               onConfirm={() => {}}
               onCancel={() => this.confirmSweetAlert()}
            />
         </div>
      );
   }
}

const mapStateToProps = ({ authUser, cart }) => ({
   authUser: authUser.data,
   cart,
});

export default connect(mapStateToProps, { setRequestGlobalAction, onClearCart })(BillingForm);