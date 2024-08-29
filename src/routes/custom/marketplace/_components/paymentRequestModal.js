import { useEffect } from 'react';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import OrderService from "Services/orders";
import { withRouter } from "react-router-dom";
import PaymentRequest from "./paymentRequest";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import {NotificationManager} from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";

const PaymentRequestModal = (props) => {

    const {show, onClose, defaultReference, defaultType, hideReference, sendPaymentData} = props;

    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        if(paymentData) {
            sendPaymentData(paymentData)
            // if(paymentData.paymentMethod == 'CREDIT_CARD') {
            //     sendStripeData(paymentData);
            // } else {
            //     initiatePayment();
            // }
        }
     }, [paymentData])
  
    const initiatePayment = () => {
        props.setRequestGlobalAction(true);
  
        let data = {
           amount: paymentData.amount,
           notification_method: paymentData.notificationMethod
        }
  
        if(paymentData.discountCode) {
           data.discountCode = paymentData.discountCode;
        }
  
        if(paymentData.subscriptionCode) {
           data.subscriptionCode = subscriptionCode;
        }
  
        OrderService.initiatePayment(paymentData.reference, data)
           .then(() => {
                NotificationManager.success('Opération réussie');
                onClose();
            })
           .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Demande d'encaissement
                </h3>
            )}
        >
            <RctCardContent>
                <PaymentRequest
                    defaultReference={defaultReference}
                    defaultType={defaultType} 
                    hideReference={hideReference}
                    onError={() => {
                        onClose();
                    }}
                    onSendData={(data) => {
                        setPaymentData(data);
                    }}
                />
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(PaymentRequestModal));