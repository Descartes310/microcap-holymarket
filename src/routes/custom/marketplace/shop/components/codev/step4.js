import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import React, { Component } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";

class CodevStep4 extends Component {

    state = {
        alias: null,
        aliases: [],
        product: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.product) {
            this.findProduct();
        }
        this.getAliases();
    }

    getAliases = () => {
        UserService.getContacts().then((contacts) => {
            this.setState({ aliases: contacts.filter(c => c.type === 'ALIAS') });
        });
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

    computeAvailableCapital = () => {
        let depositAmount = this.state.product?.details.find(d => d.type === "DEPOSIT_AMOUNT")?.value;
        let minimumRate = this.state.product?.details.find(d => d.type === "MINIMUM_RATE")?.value;
        let emitLineCount = this.state.product?.details.find(d => d.type === "EMIT_LINE_COUNT")?.value;
        return (depositAmount && minimumRate && emitLineCount) ? (depositAmount*Math.pow(1+minimumRate, emitLineCount)).toFixed(2) : 0;
    }

    Print = () =>{     
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents; 
    }

    render() {

        const { aliases, alias } = this.state;
        const { onClose, show, onSubmit, data } = this.props;

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

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Alias à utiliser
                        </InputLabel>
                        <Autocomplete
                            value={alias}
                            options={aliases}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ alias: item });
                            }}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    <table className='table table-striped table-bordered' id="printablediv">
                        <thead>
                            <th>Nom du détails</th>
                            <th>Valeur courante</th>
                        </thead>
                        <tbody>
                            {this.state.product?.details.map(details => (
                                <tr>
                                    <td>{getProductDetailsByName(details.type)?.label}</td>
                                    { details.type == 'DEPOSITPERIOD' ?
                                        <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                        <td>{details.value}</td>
                                    }
                                </tr>
                            ))}
                            <tr>
                                <td>Montant par versement</td>
                                <td>{ data?.selectedLine?.amount ? data.selectedLine.amount : this.state.product?.details.find(d => d.type === 'DEPOSIT_AMOUNT')?.value } EUR</td>
                            </tr>
                            <tr>
                                <td>Capital disponible par tirage (groupe de ligne)</td>
                                <td>{this.computeAvailableCapital()} EUR</td>
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
                            onClick={() => {
                                if(alias) {
                                    onSubmit({...data, alias: alias});
                                } else {
                                    onSubmit(data);
                                }
                            }}
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep4));