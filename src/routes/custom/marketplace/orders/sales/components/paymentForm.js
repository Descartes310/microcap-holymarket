import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from "Services/orders";
import AppConfig from 'Constants/AppConfig';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import StripeCheckout from 'react-stripe-checkout';
import { stripeZeroDecimalCurrencies } from 'Helpers/datas'
import { RctCard, RctCardContent } from 'Components/RctCard';
import PaymentRequest from "../../../_components/paymentRequest";
import { Button } from 'reactstrap';

class PaymentCard extends Component {

   state = {
      amount: 0,
      paymentData: null,
      showStripeBox: false,
   }

   stripeRef = React.createRef();

   computePrice = () => {
      const amount = this.state.paymentData ? this.state.paymentData.amount : 0;
      const currency = this.state.paymentData ? this.state.paymentData.currency : 'EUR';
      return stripeZeroDecimalCurrencies.includes(currency) ? amount : amount * 100;
   }

   onSubmit = (token) => {
      this.props.setRequestGlobalAction(true);

      let data = {
         stripeToken: token,
         amount: this.state.paymentData.amount
      }

      if(this.state.paymentData.discountCode) {
         data.discountCode = this.state.paymentData.discountCode;
      }

      if(this.state.paymentData.subscriptionCode) {
         data.subscriptionCode = this.state.subscriptionCode;
      }

      OrderService.paySale(this.state.paymentData.id, data)
         .then(() => window.location.reload())
         .finally(() => this.props.setRequestGlobalAction(false))
   }

   initiatePayment = () => {
      this.props.setRequestGlobalAction(true);

      let data = {
         amount: this.state.paymentData.amount,
         notification_method: this.state.paymentData.notificationMethod
      }

      if(this.state.paymentData.discountCode) {
         data.discountCode = this.state.paymentData.discountCode;
      }

      if(this.state.paymentData.subscriptionCode) {
         data.subscriptionCode = this.state.paymentData.subscriptionCode;
      }

      OrderService.initiatePayment(this.state.paymentData.reference, data)
         .then(() => window.location.reload())
         .finally(() => this.props.setRequestGlobalAction(false))
   }

   onStripePayment = (token) => {
      this.onSubmit(token.id);
   }

   render() {
      const { order } = this.props;
      const { paymentData } = this.state;
      return (
         <RctCard className="payment">
            <RctCardContent>
               <PaymentRequest
                  hideReference={true}
                  defaultReference={order.reference}
                  defaultType={order.orderType}
                  onSendData={(paymentData) => {
                     this.setState({ paymentData }, () => {
                        if(paymentData.paymentMethod == 'CREDIT_CARD') {
                           document.getElementById('stripe-id').click()
                        } else {
                           this.initiatePayment();
                        }
                     })
                  }}
                  onError={() => {
                     onClose()
                  }}
               />

               <StripeCheckout
                  name={'MicroCap'}
                  token={this.onStripePayment}
                  amount={this.computePrice()}
                  currency={paymentData ? paymentData.currency : 'EUR'}
                  stripeKey={AppConfig.payments.stripe}
                  description={'Règlement de la facture'}
                  image={require('Assets/identity/logomicrocap.png')}
               >
                  <Button
                     color="primary"
                     id="stripe-id"
                     className="w-100 ml-0 mt-15 text-white"
                     style={{ display: 'none' }}
                  >
                     Payer
                  </Button>
               </StripeCheckout>
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
