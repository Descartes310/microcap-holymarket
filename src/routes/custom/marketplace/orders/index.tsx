import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import OrderComponent from './orderComponent';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { MARKETPLACE, joinUrlWithParamsId } from 'Url/frontendUrl';

const List = (props) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
      getOrders();
    }, []);

    const getOrders = () => {
        props.setRequestGlobalAction(true),
            OrderService.getOrders()
            .then(response => setOrders(response))
            .finally(() => props.setRequestGlobalAction(false))
    }



    return (
        <>
            <PageTitleBar title={'Mes commandes'} />
            <OrderComponent 
                orders={orders}
                getOrders={getOrders}
                openSubOrders={(reference) => props.history.push(joinUrlWithParamsId(MARKETPLACE.SUB_ORDERS, reference))} 
                openPayments={(id) => props.history.push(joinUrlWithParamsId(MARKETPLACE.SALES, id))} 
            />
        </>
    );
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(List));