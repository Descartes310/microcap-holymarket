import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";

class CodevStep3 extends Component {

    state = {
        product: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.product) {
            this.findProduct();
        }
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
        .then(response => {
            if(response.details.length <= 0) {
                NotificationManager.error('Produit non configuré');
                this.props.onClose();
            }
            this.setState({product: response});
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }


    render() {

        const { product } = this.state;
        const { onClose, show, onSubmit, data } = this.props;
        console.log(this.props.data, product)

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Récapitulatif de la commande
                    </h3>
                )}
            >
                <RctCardContent>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <th>Nom du détails</th>
                            <th>Valeur courante</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Montant par versement</td>
                                <td>{ data?.selectedLine?.amount ? data.selectedLine.amount : this.state.product?.details.find(d => d.type === 'DEPOSIT_AMOUNT').value } EUR</td>
                            </tr>
                            <tr>
                                <td>Capital à terme</td>
                                <td>{this.state.product?.details.find(d => d.type === 'AVAILABLE_CAPITAL').value} EUR</td>
                            </tr>
                            <tr>
                                <td>Capital disponible sur avance</td>
                                <td>{this.state.product?.details.find(d => d.type === "INVESTMENT_CAPITAL").value} EUR</td>
                            </tr>
                            <tr>
                                <td>Capital disponible par groupe de ligne pour un projet de n associés maxi</td>
                                <td>{this.state.product?.details.find(d => d.type === "ADVANCE_INTEREST").value} EUR</td>
                            </tr>
                            <tr>
                                <td>Date de tirage pour une avance</td>
                                <td>{data?.selectedDate?.date ? data.selectedDate.date : new Date()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => { onSubmit(data) }}
                            className="text-white font-weight-bold mb-20"
                        >
                            Souscrire
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}

export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep3));