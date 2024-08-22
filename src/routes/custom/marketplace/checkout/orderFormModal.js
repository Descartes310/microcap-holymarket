import OrderForm from './orderForm';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import DialogComponent from "Components/dialog/DialogComponent";

class OrderModalForm extends Component {

    render() {
        const { show, onClose, isPreOrder, onSuccess } = this.props;
        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="lg"
                title={(
                    <h3 className="fw-bold">
                        Valider ma commande
                    </h3>
                )}
            >
                <OrderForm 
                    onSuccess={onSuccess}
                    isPreOrder={isPreOrder}
                />
            </DialogComponent>
        )
    }
}

 export default connect(() => {}, { })(withRouter(OrderModalForm));