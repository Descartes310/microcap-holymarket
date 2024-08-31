import { connect } from 'react-redux';
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import BillingForm from './components/BillingForm';
import SweetAlert from 'react-bootstrap-sweetalert';
import CheckoutItem from './components/CheckoutItem';
import { NotificationManager } from 'react-notifications';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { setRequestGlobalAction, onClearCart } from 'Actions';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { MARKETPLACE } from 'Url/frontendUrl';

class OrderForm extends Component<any, any> {

    state = {
        showSweetAlert: false,
        order: null,
        discount: null
    }

    validateBillingForm = (informations) => {
        let billingInformation = informations.billingInformation;
        let shippingInformation = informations?.shippingInformation;

        if(!shippingInformation) {
            shippingInformation = billingInformation;
        }
        
        let data: any = {
            city: billingInformation.state,
            zip: billingInformation.zipCode,
            email: billingInformation.emailId,
            address1: billingInformation.addressLine1,
            telephone: billingInformation.mobileNumber,
            shipping_city: shippingInformation.state,
            shipping_zip: shippingInformation.zipCode,
            country: billingInformation.country?.reference,
            shipping_country: shippingInformation.country?.reference,
            shipping_address1: shippingInformation.addressLine1,
            productIds: this.props.cart.items.map(product => product.id),
            sources: this.props.cart.items.map(product => product.source),
            productQuantities: this.props.cart.items.map(product => product.quantity),
            productDetails: 
            JSON.stringify(
                this.props.cart.items.map(item => {
                let details: any = {};
                if(item?.customInfos) {
                    details.type = item?.customInfos?.type;
                    if(item?.customInfos?.type == 'CODEV') {
                            
                        if(item.customInfos.alias != null)
                            details.alias = item.customInfos.alias.value;
                            
                        if(item.customInfos.indivision) {
                            if(item.customInfos.tickets) {
                                details.tickets = item.customInfos.tickets.join(',');
                            } else {
                                details.unit_amount = item.customInfos.indivision.unitAmount;
                                details.distribution = item.customInfos.indivision.distribution;
                                details.denomination = item.customInfos.indivision.denomination;
                                details.tirage_ref = item.customInfos.selectedDate.reference;
                            }
                        } else {
                            details.tirage_ref = item.customInfos.selectedDate.reference;
                        }

                        details.product_ref = item.customInfos.productReference;
                        details.subscription_type = item.customInfos.subscriptionType.value;
                    }
                }
                return details;
            })
            )
        }

        if(informations.discountCode) {
            data.discountCode = informations.discountCode;
        }

        if(informations.subscriptionCode) {
            data.subscriptionCode = informations.subscriptionCode;
        }

        if(this.props.isPreOrder) {
            data.isPreOrder = true;
        }

        this.props.setRequestGlobalAction(true);
        OrderService.createOrder(data).then((response) => {
            this.setState({ showSweetAlert: true, order: response });
            this.props.onClearCart();
        })
        .catch((err) => {
            NotificationManager.error("La création de votre commande a échoué!");
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    confirmSweetAlert = () => {
        this.setState({ showSweetAlert: false })
        if(this.props.onSuccess) {
            this.props.onSuccess(this.state.order);
        } else {
            this.props.history.push(MARKETPLACE.ORDERS);
        }
    }

    render() {
        const { successMessage } = this.props;
        const { showSweetAlert } = this.state;
        return (
            <>

                <RctCard customClasses="overflow-hidden">
                    <RctCardContent noPadding>
                        <div className="row no-gutters">
                            <div className="col-lg-8 col-md-12 col-sm-12">
                                <RctCollapsibleCard>
                                    <BillingForm updateDiscount={(d) => this.setState({ discount: d})} onSubmit={this.validateBillingForm} productIds={this.props.cart.items.map(product => product.id)} />
                                </RctCollapsibleCard>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12">
                                <CheckoutItem discount={this.state.discount} />
                            </div>
                        </div>
                    </RctCardContent>
                </RctCard>


                <SweetAlert
                    success
                    btnSize="sm"
                    show={showSweetAlert}
                    title={successMessage ? successMessage : "Votre commande a été enregistrée avec succès !"}
                    onConfirm={() => this.confirmSweetAlert()}
                />
            </>
        )
    }
}

const mapStateToProps = ({ cart }) => {
    return { cart };
 }
 
 export default connect(mapStateToProps, { setRequestGlobalAction, onClearCart })(withRouter(OrderForm));