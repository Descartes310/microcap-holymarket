import { connect } from 'react-redux';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProductService from "Services/products";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from 'Helpers/helpers';
import DialogComponent from "Components/dialog/DialogComponent";

class CodevChildTickets extends Component {

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
        ProductService.getChildTickets(this.props.ticket?.reference).then(response => {
            this.setState({tickets: response});
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.setRequestGlobalAction(false);
        })
    }

    render() {

        const { onClose, show, title, onCreate } = this.props;
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
                    <CustomList
                        list={tickets}
                        loading={false}
                        itemsFoundText={n => `${n} versements`}
                        onAddClick={() => {
                            onCreate();
                        }}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucun versements
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Type</th>
                                                    <th className="fw-bold">Code</th>
                                                    <th className="fw-bold">Echéance</th>
                                                    <th className="fw-bold">Montant</th>
                                                    <th className="fw-bold">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key}>
                                                        <td>{item?.type.label}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.date}</td>
                                                        <td>{getPriceWithCurrency(item.amount, item.currency)}</td>
                                                        <td>{item.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    />
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevChildTickets));