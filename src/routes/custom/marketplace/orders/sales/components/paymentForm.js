import { connect } from "react-redux";
import { FormGroup } from 'reactstrap';
import { injectIntl } from "react-intl";
import React, { Component } from 'react';
import OrderService from "Services/orders";
import GroupService from "Services/groups";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import OrderPaymentProofModal from './OrderPaymentProof';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { RctCard, RctCardContent } from 'Components/RctCard';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

class PaymentCard extends Component {

   state = {
      discount: null,
      community: null,
      communities: [],
      paymentData: null,
      showStripeBox: false,
      showTransferBox: false,
      isBankTransfer: false,
      isCommunityAccount: false
   }

   componentDidMount() {
      this.findDiscount();
      this.getGroups();
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

  getGroups = () => {
      this.props.setRequestGlobalAction(true),
      GroupService.getCommunityDatas({ belongs: 'IN'})
      .then(response => this.setState({ communities: response }))
      .finally(() => this.props.setRequestGlobalAction(false))
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
         .then(() => {
            NotificationManager.success("La demande de paiement a été envoyée");
            window.location.reload();
         })
         .catch((err) => {
            NotificationManager.error("Une erreur est survenue");
         })
         .finally(() => this.props.setRequestGlobalAction(false))
   }

   initiateCommunityPayment = () => {
      if(this.state.community == null) {
         NotificationManager.error("Sélectionnez une communauté");
      }
      this.props.setRequestGlobalAction(true);

      OrderService.paySaleByCommunity(this.props.order.reference, {community_id: this.state.community.groupReference, amount: this.props.order.amount})
         .then(() => {
            NotificationManager.success("La demande de paiement a été traitée");
            window.location.reload();
         })
         .catch((err) => {
            NotificationManager.error("Vous n'avez pas de compte actif dans cette communauté");
         })
         .finally(() => this.props.setRequestGlobalAction(false))
   }

   render() {
      const { order } = this.props;
      const { discount, isBankTransfer, showTransferBox, isCommunityAccount, communities, community } = this.state;
      return (
         <RctCard className="payment">
            <RctCardContent>
               <div className="row mt-20">
                  <h1 className='mb-30'>
                     <span style={discount?.percentage && { textDecoration: 'line-through', color: 'red' } }>{ getPriceWithCurrency(this.getAmountToPay(), order?.items[0]?.currency)}</span> { discount?.percentage && <>{getPriceWithCurrency(this.getDiscountedAmountToPay(), order?.items[0]?.currency)}</>}
                  </h1>
                  <Button
                     color="primary"
                     variant="contained"
                     onClick={() => this.initiatePayment()}
                     className="col-md-12 col-sm-12 text-white font-weight-bold mb-20"
                  >
                     Demande de paiement
                  </Button>
                  <FormGroup className="col-sm-12 has-wrapper">
                     <FormControlLabel control={
                           <Checkbox
                              color="primary"
                              checked={isBankTransfer}
                              onChange={() => this.setState({ isBankTransfer: !isBankTransfer })}
                           />
                     } label={'J\'ai fais un virement bancaire'}
                     />
                  </FormGroup>

                  <FormGroup className="col-sm-12 has-wrapper">
                     <FormControlLabel control={
                           <Checkbox
                              color="primary"
                              checked={isCommunityAccount}
                              onChange={() => this.setState({ isCommunityAccount: !isCommunityAccount })}
                           />
                     } label={'Caisse communautaire'}
                     />
                  </FormGroup>
                  { isBankTransfer && (
                     <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                           this.setState({ showTransferBox: true })
                        }}
                        className="col-md-12 col-sm-12 text-white font-weight-bold mb-20"
                     >
                        Envoyer la preuve
                     </Button>
                  )}
                  {
                     isCommunityAccount && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                           <InputLabel className="text-left">
                              Communautés
                           </InputLabel>
                           <Autocomplete
                              value={community}
                              id="combo-box-demo"
                              options={communities}
                              onChange={(__, item) => {
                                 this.setState({ community: item });
                              }}
                              getOptionLabel={(option) => option.userName}
                              renderInput={(params) => <TextField {...params} variant="outlined" />}
                           />
                           <Button
                              color="primary"
                              variant="contained"
                              onClick={() => {
                                 this.initiateCommunityPayment();
                              }}
                              className="col-md-12 col-sm-12 text-white font-weight-bold mt-10 mb-20"
                           >
                              Initier le paiement
                           </Button>
                        </div>
                     )
                  }
               </div>
               <OrderPaymentProofModal
                  show={showTransferBox}
                  onClose={(reload) => {
                     this.setState({ showTransferBox: false, isBankTransfer: false });
                     if(reload) {
                        window.location.reload();
                     }
                  }}
                  item={this.props.order}
                  amount={this.getDiscountedAmountToPay()}
                  currency={order?.items[0]?.currency}
               />
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
