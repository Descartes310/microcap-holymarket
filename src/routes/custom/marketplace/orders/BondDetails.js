import { connect } from 'react-redux';
import React, { Component } from 'react';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import CodevParticipants from "./Participants";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import ProductDetailsButton from "Components/ProductDetailsButton";

class BondDetails extends Component {

    state = {
        order: null,
        participants: [],
        showParticipants: false
    }

    constructor(props) {
        super(props);
        this.findOrder();
    }

    findOrder = () => {
        this.props.setRequestGlobalAction(true);
        OrderService.findOrder(this.props.orderId)
        .then(response => {
            this.setState({order: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    getParticipants = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getParticipantsByOrderRef({reference: this.state.order.reference})
        .then(response => this.setState({participants: response}))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { onClose, show } = this.props;
        const { order, participants, showParticipants } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Liste des bonds
                    </h3>
                )}
            >
                <RctCardContent>

                    {
                        order?.details?.find(d => d.type == "CODEV_PRODUCT_REF") && (
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold mb-30"
                            onClick={() => {
                                this.setState({ showParticipants: true })
                                this.getParticipants()
                            }}
                        >
                            Liste des souscripteurs
                        </Button>
                    )}
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
                <CodevParticipants
                    show={showParticipants}
                    participants={participants}
                    referralCode={order.referralCode}
                    onClose={() => this.setState({ showParticipants: false })}
                    type={order?.details?.find(d => d.type == "CODEV_SUBSCRIPTION_TYPE")?.value}
                    isPrivate={order?.details?.find(d => d.type == "CODEV_INDIVISION_DISTRIBUTION")?.value == 'PRIVATE'}
                />
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(BondDetails));