import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { injectIntl } from "react-intl";
import OrderService from "Services/orders";
import AppConfig from 'Constants/AppConfig';
import IntlMessages from "Util/IntlMessages";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { setRequestGlobalAction } from 'Actions';
import { Button } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
import {HOME, AUTH, LANDING} from "Url/frontendUrl";
import {NotificationManager} from 'react-notifications';
import { stripeZeroDecimalCurrencies } from 'Helpers/datas';
import PaymentRequest from 'Routes/custom/marketplace/_components/paymentRequest'

const Payment = (props) => {


    const typeParam = new URLSearchParams(props.location.search).get("type");
    const referenceParam = new URLSearchParams(props.location.search).get("reference");
    
    const [order, setOrder] = useState(null);
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        if(typeParam == 'ORDER') {
            findOrder();
        }
    }, [])

    const findOrder = () => {
        props.setRequestGlobalAction(true);
        OrderService.findOrderByReference(referenceParam).then((response) => {
           setOrder(response);
        }).catch(() => {
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
           props.setRequestGlobalAction(false);
        });
     }

    useEffect(() => {
        if(paymentData) {
            document.getElementById('stripe-id').click()
        }
    }, [paymentData])

    const onUserSignUp = () => {
        props.history.push(AUTH.REGISTER);
    };

    const onDiscoverClick = () => {
        props.history.push(LANDING.HOME);
    };

    const computePrice = () => {
        const amount = paymentData ? paymentData.amount : 0;
        const currency = paymentData ? paymentData.currency : 'EUR';
        return stripeZeroDecimalCurrencies.includes(currency) ? amount : amount * 100;
    }

    const onSubmit = (token) => {
        props.setRequestGlobalAction(true);
  
        let data: any = {
           stripeToken: token,
           amount: paymentData.amount
        }
  
        if(paymentData.discountCode) {
           data.discountCode = paymentData.discountCode;
        }
  
        if(paymentData.subscriptionCode) {
           data.subscriptionCode = paymentData.subscriptionCode;
        }
  
        OrderService.paySale(paymentData.id, data)
           .then(() => {
                NotificationManager.success("Le paiement s'est effectué avec succès");
                props.history.push(LANDING.HOME);
           })
           .finally(() => props.setRequestGlobalAction(false))
     }

    const onStripePayment = (token) => {
        onSubmit(token.id);
    }

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
                <AppBar position="static" className="session-header">
                    <Toolbar>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <div className="session-logo">
                                    <Link to={HOME}>
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                    </Link>
                                </div>
                                <div className="center-hor-ver" style={{ marginRight: '10%' }}>
                                    <Button variant="contained" className="btn-light mr-2 p-10" onClick={onUserSignUp}>
                                        <IntlMessages id="auth.signup" />
                                    </Button>
                                    <Button variant="contained" className="btn-primary mr-2 p-10" onClick={onDiscoverClick}>
                                        Tout Microcap
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="center-hor-ver session-body d-flex flex-column">
                                    <div className="session-head mb-10 text-center">
                                        <h1 className="p-20">Lien de paiement</h1>
                                        {/* This text is just a work around to add the width of the form input */}
                                        <p className="mb-0 visibility-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci, animi aperiam eligendi</p>
                                    </div>
                                    <div className="row">
                                        {order && (
                                            <PaymentRequest
                                                hideReference={true}
                                                defaultReference={order.reference}
                                                defaultType={order.orderType}
                                                defaultPaymentMethod='CREDIT_CARD'
                                                onSendData={(paymentData) => {
                                                    setPaymentData(paymentData);
                                                }}
                                                onError={() => {
                                                    NotificationManager.error("Une erreur est survenue");
                                                }}
                                            />
                                        )}
                                        <StripeCheckout
                                            name={'MicroCap'}
                                            token={onStripePayment}
                                            amount={computePrice()}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim>
    );
};

// map state to props
const mapStateToProps = ({ requestGlobalLoader }) => {
    return { loading: requestGlobalLoader }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(injectIntl(Payment));
