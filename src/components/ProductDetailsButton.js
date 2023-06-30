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

class ProductDetailsButton extends Component {

    state = {
        show: false,
        product: null,
        showPrintDetails: false
    }

    constructor(props) {
        super(props);
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.reference)
        .then(response => this.setState({product: response}))
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    render() {

        const { product, show } = this.state;
        const { style, label } = this.props;

        return (
            <>
                <Button
                    style={style}
                    color="primary"
                    variant="contained"
                    className="text-white font-weight-bold"
                    onClick={() => { this.setState({ show: true }, () => {
                        this.findProduct();
                    }) }}
                >
                    { label ? label : "Détails" }
                </Button>
                <DialogComponent
                    size="md"
                    show={show}
                    title={(
                        <h3 className="fw-bold">
                            Détails du produit {product?.label}
                        </h3>
                    )}
                    onClose={() => this.setState({ show: false }) }
                >
                    <RctCardContent>
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

                                { product?.specialProduct == 'CODEV' ? product?.details.filter(pd => !['PRICE_CURRENCY'].includes(pd.type)).map(details => (
                                    <tr>
                                        <td>{getProductDetailsByName(details.type)?.label}</td>
                                        { details.type == 'DEPOSITPERIOD' ?
                                            <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                            <td>{details.value}</td>
                                        }
                                    </tr>
                                )) : <></>}
                            </tbody>
                        </table>
                    </RctCardContent>
                </DialogComponent>
            </>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(ProductDetailsButton));