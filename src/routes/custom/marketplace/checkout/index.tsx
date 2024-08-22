import OrderForm from './orderForm';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from 'Url/frontendUrl';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

class Checkout extends Component<any, any> {

    onSuccess = () => {
        this.props.history.push(MARKETPLACE.ORDERS)
    }

    render() {
        const { match } = this.props;
        return (
            <>
                <PageTitleBar title={'Valider ma commande'} match={match} />
                <OrderForm />
            </>
        )
    }
}

 export default connect(() => {}, { })(withRouter(Checkout));