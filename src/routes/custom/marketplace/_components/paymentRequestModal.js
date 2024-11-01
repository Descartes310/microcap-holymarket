import { useEffect } from 'react';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PaymentRequest from "./paymentRequest";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";

const PaymentRequestModal = (props) => {

    const {show, onClose, defaultReference, defaultType, hideReference, sendPaymentData, disabled} = props;

    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        if(paymentData) {
            sendPaymentData(paymentData)
        }
     }, [paymentData])
    
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
                    disabled={disabled}
                    onSendData={(data) => {
                        setPaymentData(data);
                    }}
                />
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(PaymentRequestModal));