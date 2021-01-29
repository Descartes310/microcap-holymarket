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
import {createSale} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import {connect} from "react-redux";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import {withRouter} from "react-router-dom";
import {HOME, PRODUCT} from "Url/frontendUrl";

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
      data: {}
   };

   handleChange = (event, value) => {
      this.setState({ value });
   };

   onFormComplete = (data, nextStep, voucher = null) => {
      this.setState(prevState => ({data: {...prevState.data, ...data}, value: nextStep ? prevState.value + 1 : 0}), () => {
         if (!nextStep && voucher != null) {
            this.props.setRequestGlobalAction(true);
            const _data = {...this.state.data};
            _data.address1 = this.state.data.addressLine1;
            _data.address2 = this.state.data.addressLine2;
            _data.zip = this.state.data.zipCode;
            _data.firstName = this.props.authUser.userName;
            _data.email = this.props.authUser.user.email;
            _data.phone = this.props.authUser.user.phone;
            _data.orderId = this.order.id;
            _data.userId = this.props.authUser.user.id;
            _data.voucherCode = voucher;

            createSale(_data)
                .then(() => {
                   NotificationManager.success("Commande effectué avec succèss");
                   this.props.history.push(PRODUCT.LIST);
                })
                .catch(() => {
                   NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
         }
      });
   };

   onBack = () => {
      this.setState({value: 0});
   };

   render() {
      const { value } = this.state;
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
                     <Tab
                        disabled
                        label={<IntlMessages id="components.payment" />}
                     />
                  </Tabs>
               </AppBar>
               {value === 0 && <TabContainer><BillingForm data={this.state.data} onComplete={this.onFormComplete} /></TabContainer>}
               {value === 1 && <TabContainer><PaymentInfo data={this.state.data} onBack={this.onBack} onComplete={this.onFormComplete} /></TabContainer>}
            </div>
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
