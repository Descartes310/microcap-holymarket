import { connect } from 'react-redux';
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from 'Url/frontendUrl';
import BillingForm from './components/BillingForm';
import SweetAlert from 'react-bootstrap-sweetalert';
import InvitationBox from 'Components/InvitationBox';
import CheckoutItem from './components/CheckoutItem';
import { NotificationManager } from 'react-notifications';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { setRequestGlobalAction, onClearCart } from 'Actions';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class OrderForm extends Component<any, any> {

    state = {
        order: null,
        discount: null,
        showSweetAlert: false,
        showInvitation: false,
        payments: this.props.codevData ? [{label: 'Versement CODEV', amount: (Number(this.props.codevData.subscriptionCount)*Number(this.props.codevData.unitAmount)).toString(), editable: false}] : []
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
                            if(item.customInfos.indivision.reference) {
                                details.line_ref = item.customInfos.indivision.reference;
                            } else {
                                details.unit_amount = item.customInfos.indivision.unitAmount;
                                details.distribution = item.customInfos.indivision.distribution;
                                details.denomination = item.customInfos.indivision.denomination;
                            }
                        }

                        if(item.customInfos.projectReference != null) {
                            details.project_reference = item.customInfos.projectReference;
                        }

                        if(item.customInfos.distribution != null && details.distribution == null) {
                            details.distribution = item.customInfos.distribution;
                        }
                        
                        if(item.customInfos.tirages && item.customInfos.tirages.length > 0) {
                            details.tirages = item.customInfos.tirages;
                        }
                        if(item.customInfos.lineCount) {
                            details.lineCount = item.customInfos.lineCount;
                        }

                        if(item.customInfos.projectInvestment) {
                            details.project_investment = item.customInfos.projectInvestment;
                        }
                        details.product_ref = item.customInfos.productReference;
                        details.subscription_type = item.customInfos.subscriptionType.value;
                    }
                }
                return details;
            })
            )
        }

        if(this.state.payments.length > 0) {
            data.complementary_payments = JSON.stringify(this.state.payments);
        }

        if(informations.discountCode) {
            data.discountCode = informations.discountCode;
        }

        if(informations.subscriptionCode) {
            data.subscriptionCode = informations.subscriptionCode;
        }

        if(informations.otherPhone) {
            data.otherPhone = informations.otherPhone;
        }

        if(informations.otherEmail) {
            data.otherEmail = informations.otherEmail;
        }

        if(this.props.isPreOrder) {
            data.isPreOrder = true;
        }

        if(this.props.customData?.referralCode) {
            data.referral_code = this.props.customData?.referralCode;
        }

        if(this.props.customData?.isSubscription) {
            data.isSubscription = true;
        }

        if(this.props.customData?.vote) {
            data.vote = this.props.customData?.vote;
        }

        if(this.props.customData?.city_id) {
            data.city_id = this.props.customData?.city_id;
        }

        if(this.props.customData?.city_name) {
            data.city_name = this.props.customData?.city_name;
        }

        if(this.props.customData?.country) {
            data.vote_country = this.props.customData?.country;
        }

        if(this.props.customData?.locality) {
            data.locality = this.props.customData?.locality;
        }

        if(this.props.customData?.motivation) {
            data.motivation = this.props.customData?.motivation;
        }

        // console.log(data);

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
        this.setState({ showSweetAlert: false });
        if(this.props.onSuccess) {
            this.props.onSuccess(this.state.order);
        } else {
            this.props.history.push(MARKETPLACE.ORDERS);
        }
    }

    render() {
        const { successMessage, codevData } = this.props;
        const { showSweetAlert, showInvitation } = this.state;
        return (
            <>

                <RctCard customClasses="overflow-hidden">
                    <RctCardContent noPadding>
                        <div className="row no-gutters">
                            <div className="col-lg-8 col-md-12 col-sm-12">
                                <RctCollapsibleCard>
                                    <BillingForm referralCode={this.props.customData?.referralCode} discountCode={codevData?.discountCode ?? null} subscriptionCode={codevData?.subscriptionCode ?? null} updateDiscount={(d) => this.setState({ discount: d})} onSubmit={this.validateBillingForm} productIds={this.props.cart.items.map(product => product.id)} />
                                </RctCollapsibleCard>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12">
                                <CheckoutItem discount={this.state.discount} updatePayments={(data) => { this.setState({ payments: data });}} payments={this.state.payments} />
                            </div>
                        </div>
                    </RctCardContent>
                </RctCard>


                <SweetAlert
                    success
                    btnSize="sm"
                    showConfirm
                    showCancel
                    confirmBtnText="Parrainer un proche"
                    cancelBtnText="Terminer"
                    show={showSweetAlert}
                    title={successMessage ? successMessage : "Votre commande a été enregistrée avec succès !"}
                    onConfirm={() => {
                        this.setState({ showSweetAlert: false, showInvitation: true });
                    }}
                    onCancel={() => this.confirmSweetAlert()}
                />

                { showInvitation && (
                    <InvitationBox
                        show={showInvitation}
                        onClose={() => {
                            this.setState({ showInvitation: false });
                            this.confirmSweetAlert();
                        }}
                    />
                )}
            </>
        )
    }
}

const mapStateToProps = ({ cart }) => {
    return { cart };
 }
 
 export default connect(mapStateToProps, { setRequestGlobalAction, onClearCart })(withRouter(OrderForm));