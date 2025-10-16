import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import OrderComponent from '../orders/orderComponent';
import SubOrderComponent from '../orders/subOrderComponent';
import DialogComponent from "Components/dialog/DialogComponent";

const OrderModal = (props) => {

    const { show, onClose } = props;
    const [orders, setOrders] = useState([]);
    const [showSubOrders, setShowSubOrders] = useState(false);
    const [subOrderReference, setSubOrderReference] = useState(null);

    useEffect(() => {
        if(!props.order) {
            getOrders();
        }
    }, []);

    const getOrders = () => {
        props.setRequestGlobalAction(true),
            OrderService.getOrders({referral_code: props.referralCode})
                .then(response => setOrders(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <DialogComponent
            show={show}
            onClose={() => {
                if(showSubOrders) {
                    setShowSubOrders(false);
                    setSubOrderReference(null);
                } else {
                    props.onClose();
                }
            }}
            size="lg"
            title={(
                <h3 className="fw-bold">
                    Gestion des commandes
                </h3>
            )}
        >
            { (!showSubOrders || !subOrderReference) ? 
                <OrderComponent 
                    orders={props.order != null ? [props.order] : orders}
                    openSubOrders={(reference) => {
                        setShowSubOrders(true);
                        setSubOrderReference(reference);
                    }}
                />
            :
                <SubOrderComponent reference={subOrderReference} />
            }
        </DialogComponent>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(OrderModal));