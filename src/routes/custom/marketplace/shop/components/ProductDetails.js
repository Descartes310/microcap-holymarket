import './style.css';
import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from "Helpers/helpers";
import DialogComponent from "Components/dialog/DialogComponent";
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";

class ProductDetails extends Component {

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
        .then(response => this.setState({product: response}))
        .finally(() => this.props.setRequestGlobalAction(false))
    }    

    render() {

        const { product } = this.state;
        const { onClose, show, title, onAddToCart, onReserve } = this.props;

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
                    <div className="row d-flex justify-content-between align-items-center mt-10 mb-20 pl-10 pr-10">
                        <Button variant="contained" color="secondary" className="text-white col-md-5" onClick={() => {
                            onAddToCart()
                        }}>
                            Ajouter au panier
                        </Button>
                        <Button variant="contained" color="secondary" className="text-white col-md-5" onClick={() => {
                            onReserve()
                        }}>
                            Reserver le produit
                        </Button>
                    </div>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <th>Nom du détails</th>
                            <th>Valeur courante</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nom du produit</td>
                                <td>{product?.label}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{product?.description}</td>
                            </tr>
                            <tr>
                                <td>Prix de vente</td>
                                <td>{getPriceWithCurrency(product?.price, product?.currency)}</td>
                            </tr>
                            <tr>
                                <td>Vendeur</td>
                                <td>{product?.seller}</td>
                            </tr>
                            {product?.specialProduct == 'CODEV' && product?.details.map(details => (
                                <tr>
                                    <td>{getProductDetailsByName(details.type)?.label}</td>
                                    { details.type == 'DEPOSITPERIOD' ?
                                        <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                        details.type == 'START_DATE' ?
                                        <td>{moment(details.value).format('DD/MM/YYYY')}</td> :
                                        details.type == 'END_DATE' ?
                                        <td>{moment(details.value).format('DD/MM/YYYY')}</td> :
                                        details.type == 'AVAILABLE_CAPITAL' ?
                                        <td>{Number(details.value).toFixed(2)}</td> :
                                        <td>{details.value}</td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(ProductDetails));