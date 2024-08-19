import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from "Services/orders";
import AppConfig from 'Constants/AppConfig';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import StripeCheckout from 'react-stripe-checkout';
import { NotificationManager } from 'react-notifications';
import { stripeZeroDecimalCurrencies } from 'Helpers/datas'
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { RctCard, RctCardContent } from 'Components/RctCard';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';

class PaymentCard extends Component {

   state = {
      amount: 0,
      discount: null,
      discountCode: null,
      paymentMethod: null,
      showStripeBox: false,
      subscriptionCode: null,
      showDiscountField: false,
      showSubscriptionCodeField: false,
   }

   componentDidMount() {
      if(this.props.order && this.props.order.discountCode) {
         this.setState({ showDiscountField: true, discountCode: this.props.order.discountCode }, () => {
            this.findDiscount();
         })
      }
   }

   computePrice = () => {
      const { amount } = this.state;
      const currency =this.props.order?.items[0]?.currency;
      return stripeZeroDecimalCurrencies.includes(currency) ? amount : amount * 100;
   }

   onSubmit = (token) => {
      this.props.setRequestGlobalAction(true);

      let data = {
         stripeToken: token,
         amount: this.state.amount
      }

      if(this.state.discountCode) {
         data.discountCode = this.state.discountCode;
      }

      if(this.state.subscriptionCode) {
         data.subscriptionCode = this.state.subscriptionCode;
      }

      OrderService.paySale(this.props.match.params.id, data)
         .then(() => window.location.reload())
         .finally(() => this.props.setRequestGlobalAction(false))
   }

   findDiscount = () => {
      if(this.state.showDiscountField && this.state.discountCode) {
         this.props.setRequestGlobalAction(true);
         OrderService.findDiscount(this.props.match.params.id, {code: this.state.discountCode})
         .then((discount) => this.setState({ discount }))
         .catch((err) => {
            NotificationManager.error("Ce code est incorrect");
         })
         .finally(() => this.props.setRequestGlobalAction(false))
      }
   }

   findSubscriptionCode = () => {
      if(this.state.showSubscriptionCodeField && this.state.subscriptionCode) {
         this.props.setRequestGlobalAction(true);
         OrderService.findSubscription(this.props.match.params.id, {code: this.state.subscriptionCode})
         .then(() => {
            NotificationManager.success("Le code de souscription est valide");
         })
         .catch((err) => {
            NotificationManager.error("Ce code est incorrect");
         })
         .finally(() => this.props.setRequestGlobalAction(false))
      }
   }

   onStripePayment = (token) => {
      this.onSubmit(token.id);
   }

   getAmountToPay = () => {
      let baseAmount = this.props.order?.amount;
      return baseAmount-this.props.order.amountPaid;
   }

   getDiscountedAmountToPay = () => {
      let baseAmount = this.props.order?.amount;
      if(this.state.discount) {
         baseAmount = baseAmount - (baseAmount * this.state.discount.percentage/100);
      }
      return baseAmount-this.props.order.amountPaid;
   }

   render() {
      const { order } = this.props;
      const { discount, paymentMethod, amount, discountCode, showDiscountField, showSubscriptionCodeField, subscriptionCode } = this.state;
      return (
         <RctCard className="payment">
            <RctCardContent>
               <h1 className="mb-40"><span style={discount?.percentage && { textDecoration: 'line-through', color: 'red' } }>{this.getAmountToPay()} {order?.items[0]?.currency}</span> { discount?.percentage && <>{this.getDiscountedAmountToPay()} {order?.items[0]?.currency}</>}</h1>
               <h3 className="mb-20">Moyen de paiement</h3>
               <FormGroup tag="fieldset">
                  <FormGroup check className="mb-25">
                     <Label check>
                        <Input
                           type="radio"
                           value='STRIPE'
                           name="payment-method"
                           onChange={(e) => this.setState({ paymentMethod: e.target.value })}
                        />
                        <div className="ml-10">
                           <p className="mb-5" style={{ fontSize: '1.1rem' }}>Carte de crédit</p>
                           <img src={require('Assets/img/payments-summary.png')} alt='Payment summary' />
                        </div>
                     </Label>
                  </FormGroup>

                  <FormGroup className="has-wrapper">
                     <InputLabel className="text-left" htmlFor="label">
                        Montant à payer
                     </InputLabel>
                     <Input
                        required
                        id="amount"
                        type="text"
                        name='amount'
                        value={amount}
                        className="input-lg"
                        onChange={(e) => this.setState({ amount: e.target.value })}
                     />
                  </FormGroup>

                  <FormGroup className="col-sm-12 has-wrapper">
                     <FormControlLabel control={
                        <Checkbox
                           color="primary"
                           checked={showDiscountField}
                           onChange={(e) => this.setState({ showDiscountField: e.target.checked })}
                        />
                     } label={'J\'ai un coupon'}
                     />
                  </FormGroup>
                  { showDiscountField && (
                     <div className="d-flex">
                        <FormGroup className="col-sm-12 has-wrapper">
                           <InputLabel className="text-left" htmlFor="discountCode">
                              Code du coupon
                           </InputLabel>
                           <InputGroup>
                              <Input
                                    type="text"
                                    id="discountCode"
                                    value={discountCode}
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
                  <FormGroup className="col-sm-12 has-wrapper">
                     <FormControlLabel control={
                        <Checkbox
                           color="primary"
                           checked={showSubscriptionCodeField}
                           onChange={(e) => this.setState({ showSubscriptionCodeField: e.target.checked })}
                        />
                     } label={'J\'ai un code de reservation'}
                     />
                  </FormGroup>
                  { showSubscriptionCodeField && (
                     <div className="d-flex">
                        <FormGroup className="col-sm-12 has-wrapper">
                           <InputLabel className="text-left" htmlFor="subscriptionCode">
                              Code de reservation
                           </InputLabel>
                           <InputGroup>
                              <Input
                                    type="text"
                                    id="subscriptionCode"
                                    value={subscriptionCode}
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
                  

                  <StripeCheckout
                     name={'MicroCap'}
                     token={this.onStripePayment}
                     amount={this.computePrice()}
                     currency={order?.items[0]?.currency}
                     stripeKey={AppConfig.payments.stripe}
                     description={'Règlement de la facture'}
                     image={require('Assets/identity/logomicrocap.png')}
                  >
                     <Button
                        color="primary"
                        disabled={!paymentMethod || amount <= 0}
                        className="w-100 ml-0 mt-15 text-white"
                     >
                        Payer
                     </Button>
                  </StripeCheckout>
               </FormGroup>
            </RctCardContent>
         </RctCard>
      );
   }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser, settings }) => {
   return {
      requestGlobalLoader,
      currency: settings.currency,
      authUser: authUser.data,
   }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(PaymentCard)));
