import { connect } from 'react-redux';
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import ProductDetailsButton from "Components/ProductDetailsButton";

class OrderDetails extends Component {

    state = {
        order: null,
        showPrintDetails: false
    }

    constructor(props) {
        super(props);
        this.findOrder();
    }

    findOrder = () => {
        this.props.setRequestGlobalAction(true);
        OrderService.findOrder(this.props.orderId)
        .then(response => this.setState({order: response}))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { order } = this.state;
        const { onClose, show } = this.props;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Détails de la commande
                    </h3>
                )}
            >
                <RctCardContent>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Détails</th>
                        </thead>
                        <tbody>
                            {order?.items.map(item => (
                                <tr>
                                    <td>{item?.name}</td>
                                    <td>{item?.description}</td>
                                    <td><ProductDetailsButton reference={item?.productCode} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(OrderDetails));