import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import PrintDetails from './codev/printDetails';
import { RctCardContent } from 'Components/RctCard';
import DialogComponent from "Components/dialog/DialogComponent";
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";
import './style.css';

class ProductDetails extends Component {

    state = {
        product: null,
        showPrintDetails: false
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

    print = () =>{     

        let printContents = document.getElementById('printablediv').innerHTML;
        var a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<body>');
        a.document.write(printContents);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }

    render() {

        const { product } = this.state;
        const { onClose, show, title } = this.props;

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
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <th>Nom du détails</th>
                            <th>Valeur courante</th>
                        </thead>
                        <tbody>
                            {product?.details.map(details => (
                                <tr>
                                    <td>{getProductDetailsByName(details.type)?.label}</td>
                                    { details.type == 'DEPOSITPERIOD' ?
                                        <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                        <td>{details.value}</td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { this.setState({ showPrintDetails: true }) }}
                        className="text-white font-weight-bold mb-20"
                    >
                        Consulter la fiche
                    </Button>
                </RctCardContent>
                { this.state.showPrintDetails && (
                    <PrintDetails 
                        product={product}
                        show={this.state.showPrintDetails}
                        title={"Imprimer les détails"}
                        onClose={() => this.setState({ showPrintDetails: false })}
                    />
                )}
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(ProductDetails));