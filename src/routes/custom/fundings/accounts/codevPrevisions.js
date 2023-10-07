import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ProductService from "Services/products";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from 'Helpers/helpers';
import DialogComponent from "Components/dialog/DialogComponent";

class CodevPrevisions extends Component {

    state = {
        tickets: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getTickets();
    }

    getTickets = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getTicketByAccount({account_reference: this.props.reference}).then(response => {
            this.setState({tickets: response});
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title } = this.props;
        const { tickets } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        {title}
                    </h3>
                )}
            >
                <RctCardContent>
                    <table className='table table-striped table-bordered' style={{ width: '90%', marginLeft: '5%' }}>
                        <thead>
                            <th>Code</th>
                            <th>Echéance</th>
                            <th>Montant</th>
                            <th>Status</th>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr>
                                    <td>{ticket.code}</td>
                                    <td>{ticket.date}</td>
                                    <td>{getPriceWithCurrency(ticket.amount, ticket.currency)}</td>
                                    <td>{ticket.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevPrevisions));