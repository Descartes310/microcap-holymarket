import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from "Services/orders";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import { RctCard, RctCardContent } from 'Components/RctCard';

class PaymentCard extends Component {

   state = {
      discount: null,
      paymentData: null,
      showStripeBox: false,
   }

   componentDidMount() {
      this.findDiscount();
   }

   findDiscount = () => {
      if(this.props.order.discountCode) {
         this.props.setRequestGlobalAction(true);
         OrderService.findDiscount(this.props.order.id, {code: this.props.order.discountCode})
         .then((discount) => {
              NotificationManager.success("Le coupon est valide");
              this.setState({ discount });
          })
         .catch((err) => {
            NotificationManager.error("Ce code est incorrect");
         })
         .finally(() => this.props.setRequestGlobalAction(false))
      }
  }

   getAmountToPay = () => {
      let baseAmount = this.props.order?.amount;
      return baseAmount + this.props.order.complementaryPayment - this.props.order.amountPaid;
   }

   getDiscountedAmountToPay = () => {
      let baseAmount = this.props.order?.amount;
      if(this.state.discount) {
         baseAmount = baseAmount - (baseAmount * this.state.discount.percentage/100);
      }
      return baseAmount + this.props.order.complementaryPayment - this.props.order.amountPaid;
   }

   initiatePayment = () => {
      this.props.setRequestGlobalAction(true);

      OrderService.initiatePayment(this.props.order.reference, {})
         .then(() => window.location.reload())
         .finally(() => this.props.setRequestGlobalAction(false))
   }

   render() {
      const { order } = this.props;
      const { discount } = this.state;
      return (
         <RctCard className="payment">
            <RctCardContent>
               <div className="row mt-20">
                  <h1 className='mb-30'>
                     <span style={discount?.percentage && { textDecoration: 'line-through', color: 'red' } }>{this.getAmountToPay()} {order?.items[0]?.currency}</span> { discount?.percentage && <>{this.getDiscountedAmountToPay()} {order?.items[0]?.currency}</>}
                  </h1>
                  <Button
                     color="primary"
                     variant="contained"
                     onClick={() => this.initiatePayment()}
                     className="col-md-12 col-sm-12 text-white font-weight-bold mb-20"
                  >
                     Demande de paiement
                  </Button>
               </div>
               {/* <PaymentRequest
                  hideReference={true}
                  defaultReference={order.reference}
                  defaultType={order.orderType}
                  onSendData={(paymentData) => {
                     this.setState({ paymentData }, () => {
                        this.initiatePayment();
                     })
                  }}
                  onError={() => {
                     onClose()
                  }}
               /> */}

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
