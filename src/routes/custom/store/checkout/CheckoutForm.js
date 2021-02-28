/**
 * Checkout Form Component
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//Component
import PaymentInfo from './Payment';
import BillingForm from './BillingForm';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import { createSale } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { withRouter } from "react-router-dom";
import { HOME, PRODUCT } from "Url/frontendUrl";
import SweetAlert from "react-bootstrap-sweetalert";

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

class CheckoutForm extends Component {
   order = this.props.order;

   state = {
      value: 0,
      data: {},
      showConfirmBox: false,
      response: null
   };


   handleChange = (event, value) => {
      this.setState({ value });
   };

   onFormComplete = (data, nextStep, voucher = null, account = null, token = null) => {

      this.setState(prevState => ({ data: { ...prevState.data, ...data }, value: nextStep ? prevState.value + 1 : 0 }));

      if (!nextStep && (voucher != null || account != null || token != null)) {
         this.props.setRequestGlobalAction(true);
         const _data = { ...this.state.data };
         _data.address1 = data.addressLine1;
         _data.address2 = data.addressLine2;
         _data.zip = data.zipCode;
         _data.country = data.country;
         _data.firstName = this.props.authUser.userName;
         _data.email = this.props.authUser.user.email;
         _data.phone = this.props.authUser.user.phone;
         _data.orderId = this.order.id;
         _data.userId = this.props.authUser.user.id;
         if (voucher != null)
            _data.voucherCode = voucher;
         if (account != null)
            _data.accountId = account;
         if (token != null)
            _data.stripeToken = token;

         createSale(_data)
            .then((resp) => {
               NotificationManager.success("Achat effectué avec succes");
               this.setState({ showConfirmBox: true, response: resp }, () => { console.log('Update fine !') })
            })
            .catch((error) => {
               console.log(error)
               NotificationManager.error(ERROR_500);
            })
            .finally(() => this.props.setRequestGlobalAction(false));
      }
   };

   onBack = () => {
      this.setState({ value: 0 });
   };

   render() {
      const { value, showConfirmBox } = this.state;
      return (
         <div className="checkout-form-wrap">
            <div>
               <AppBar position="static" color="default">
                  <Tabs
                     value={value}
                     onChange={this.handleChange}
                     indicatorColor="primary"
                     textColor="primary"
                     variant="fullWidth"
                  >
                     <Tab
                        disabled
                        label={<IntlMessages id="components.billingAddress" />}
                     />
                     {/* <Tab
                        disabled
                        label={<IntlMessages id="components.payment" />}
                     /> */}
                  </Tabs>
               </AppBar>
               {value === 0 && <TabContainer><BillingForm data={this.state.data} onComplete={this.onFormComplete} order={this.order} /></TabContainer>}
               {value === 1 && <TabContainer><PaymentInfo data={this.state.data} onBack={this.onBack} onComplete={this.onFormComplete} /></TabContainer>}
            </div>
            <SweetAlert
               success
               show={showConfirmBox}
               title={"Infos commande"}
               onConfirm={() => this.props.history.push(PRODUCT.LIST)}
               confirmBtnText="Continuer"
               confirmBtnClass="btn-lg btn-primary btn-sm text-white"
            >
               <div className="row">
                  <div className="col-12">
                     <p>Commande enregistré avec success</p>
                  </div>
                  <div className="col-12">
                     <p className="fw-bold my-3">
                        {this.state.response ? this.state.response.name : ''}
                     </p>
                  </div>
                  <div className="col-12">
                     <p>Merci de conserver ces informations qui vous seront utiles en cas de reclammations</p>
                  </div>
               </div>
            </SweetAlert>
         </div>
      );
   }
}
const mapStateToProps = ({ authUser }) => {
   return { authUser: authUser.data };
};

export default connect(mapStateToProps, {
   setRequestGlobalAction,
})(withRouter(CheckoutForm));
