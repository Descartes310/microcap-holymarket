import OrderForm from './orderForm';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import DialogComponent from "Components/dialog/DialogComponent";

class OrderModalForm extends Component {

    render() {
        const { show, onClose, isPreOrder, onSuccess, codevData } = this.props;
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
                    codevData={codevData}
                    successMessage={"Votre reservation a été effectuée. Pour finaliser votre commande, vous devez vous connecter à votre espace utilisateur sur la plateforme MicroCap."}
                />
            </DialogComponent>
        )
    }
}

 export default connect(() => {}, { })(withRouter(OrderModalForm));