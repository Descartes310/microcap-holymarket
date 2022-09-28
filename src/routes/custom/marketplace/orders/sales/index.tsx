import { connect } from 'react-redux';
import Sales from './components/sales';
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from 'Url/frontendUrl';
import PaymentForm from './components/paymentForm';
import SweetAlert from 'react-bootstrap-sweetalert';
import { NotificationManager } from 'react-notifications';
import { RctCard, RctCardContent } from 'Components/RctCard';
import { setRequestGlobalAction, onClearCart } from 'Actions';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

class Payments extends Component<any, any> {

    state = {
        showSweetAlert: false
    }

    validateBillingForm = (billingForm) => {
        let data = {
            city: billingForm.state,
            zip: billingForm.zipCode,
            email: billingForm.emailId,
            country: billingForm.country,
            address1: billingForm.addressLine1,
            address2: billingForm.addressLine2,
            telephone: billingForm.mobileNumber,
            productIds: this.props.cart.items.map(product => product.id),
            productQuantities: this.props.cart.items.map(product => product.quantity),
        }
        this.props.setRequestGlobalAction(true);
        OrderService.createOrder(data).then((response) => {
            this.setState({ showSweetAlert: true });
            this.props.onClearCart();
        })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("La création de votre commande a échoué!");
            })
            .finally(() => {
                this.props.setRequestGlobalAction(false);
            })
    }

    confirmSweetAlert = () => {
        this.setState({ showSweetAlert: false })
        this.props.history.push(MARKETPLACE.SHOP);
    }

    render() {
        const { match } = this.props;
        const { showSweetAlert } = this.state;
        return (
            <>
                <PageTitleBar title={'Mes paiements'} match={match} />

                <RctCard customClasses="overflow-hidden">
                    <RctCardContent noPadding>
                        <div className="row no-gutters">
                            <div className="col-lg-9 col-md-8 col-sm-12" style={{ padding: 20 }}>
                                <Sales />
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-12" style={{ padding: 20 }}>
                                <PaymentForm />
                            </div>
                        </div>
                    </RctCardContent>
                </RctCard>


                <SweetAlert
                    success
                    btnSize="sm"
                    show={showSweetAlert}
                    title="Votre commande a été enregistrée avec succès !"
                    onConfirm={() => this.confirmSweetAlert()}
                />
            </>
        )
    }
}

const mapStateToProps = ({ cart }) => {
    return { cart };
}

export default connect(mapStateToProps, { setRequestGlobalAction, onClearCart })(withRouter(Payments));