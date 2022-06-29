import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from "Services/orders";
import AppConfig from 'Constants/AppConfig';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import StripeCheckout from 'react-stripe-checkout';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

class PaymentCard extends Component<any, any> {

   state = {
      amount: 0,
      paymentMethod: null,
      showStripeBox: false,
   }

   componentDidMount() { }

   computePrice = () => {
      const { amount } = this.state;
      return amount * 100;
   }

   onSubmit = (token) => {
      this.props.setRequestGlobalAction(true);
      OrderService.paySale(this.props.match.params.id, {stripeToken: token, amount: this.state.amount})
         .then(response => window.location.reload())
         .finally(() => this.props.setRequestGlobalAction(false))
   }

   onStripePayment = (token) => {
      this.onSubmit(token.id);
   }

   getPayPalPaymentLink = () => {
   }


   render() {
      const { paymentMethod, amount } = this.state;

      return (
         <RctCard className="payment">
            <RctCardContent>
               <h3 className="mb-40">Moyen de paiement</h3>
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

                  <FormGroup check className="mb-25">
                     <Label check>
                        <Input
                           disabled
                           type="radio"
                           value='PAYPAL'
                           name="payment-method"
                           onChange={(e) => this.setState({ paymentMethod: e.target.value })}
                        />
                        <div className="ml-10">
                           <p className="mb-5" style={{ fontSize: '1.1rem' }}>PayPal</p>
                           <img src={require('Assets/img/paypal-payment.png')} alt='PayPal payment' style={{ maxHeight: 20 }} />
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

                  {
                     paymentMethod ? (
                        <StripeCheckout
                           name={'MicroCap'}
                           currency={'EUR'}
                           token={this.onStripePayment}
                           amount={this.computePrice()}
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
                     ) : (
                        <Button
                           color="primary"
                           disabled={!paymentMethod || amount <= 0}
                           className="w-100 ml-0 mt-15 text-white"
                           onClick={() => this.getPayPalPaymentLink()}
                        >
                           Payer
                        </Button>
                     )
                  }
               </FormGroup>
            </RctCardContent>
         </RctCard>
      );
   }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, authUser }) => {
   return {
      requestGlobalLoader,
      authUser: authUser.data,
   }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(injectIntl(PaymentCard)));
