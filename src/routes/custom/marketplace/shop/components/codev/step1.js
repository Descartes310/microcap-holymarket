import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { convertDate } from "Helpers/helpers";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { FormGroup, Input as InputStrap } from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getProductDetailsByName, getTimeUnitByValue } from "Helpers/datas";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const advanceTypeEnum = [
    {
        label: 'Infine',
        value: 'INFINE'
    },
    {
        label: 'Amortissement constant',
        value: 'AMORTISSEMENT'
    },
    {
        label: 'Capital constant',
        value: 'CAPITAL'
    }];
class CodevStep1 extends Component {

    state = {
        dates: [],
        plan: null,
        product: null,
        cessible: false,
        editable: false,
        advanceType: null,
        advanceValue: null,
        selectedDate: null,
        drawDate: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.product) {
            this.findProduct();
        }
    }

    findProduct = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.findProduct(this.props.product.reference)
            .then(response => {
                if (response.details.length <= 0) {
                    NotificationManager.error('Produit non configuré');
                    this.props.onClose();
                }
                this.setState({ product: response }, () => {
                    this.computeAvailableDate();
                });
            })
            .finally(() => this.props.setRequestGlobalAction(false))
    }

    computeAvailableDate = () => {
        let dates = [];
        let startDate = new Date(this.state.product?.details.find(d => d.type === 'STARTDATE')?.value);
        let endDate = new Date(this.state.product?.details.find(d => d.type === 'ENDDATE')?.value);
        let depositPeriod = getTimeUnitByValue(this.state.product?.details.find(d => d.type === 'DEPOSITPERIOD')?.value)?.days;
        let date = startDate;
        while (date <= endDate) {
            dates.push(convertDate(date));
            date.setDate(date.getDate() + depositPeriod);
        }
        this.setState({ dates });
    }

    onValidate = () => {
        const { product, cessible, editable, advanceValue, advanceType, selectedDate, plan } = this.state;
        console.log(product,plan);
        console.log(advanceType, selectedDate);
        if (!product || !advanceType || !selectedDate) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data = {
            // plan: plan.value,
            selectedDate, advanceValue, productReference: product.reference
        }

        this.props.onSubmit(data);
    }

    render() {

        const { onClose, show } = this.props;
        const { product, cessible, editable, advanceValue,
            advanceType, dates, plan, selectedDate } = this.state;

        return (
            <DialogComponent
                show={show}
                onClose={onClose}
                size="md"
                title={(
                    <h3 className="fw-bold">
                        Configuration du produit
                    </h3>
                )}
            >
                <RctCardContent>
                    {/* <table className='table table-striped table-bordered'>
                        <thead>
                            <th>Nom du détails</th>
                            <th>Valeur courante</th>
                        </thead>
                        <tbody>
                            {product?.details.map(details => (
                                <tr>
                                    <td>{getProductDetailsByName(details.type)?.label}</td>
                                    {details.type == 'DEPOSITPERIOD' ?
                                        <td>{getTimeUnitByValue(details.value)?.label}</td> :
                                        <td>{details.value}</td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <h1>Specification de la souscription</h1>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left" htmlFor="startDate">
                            Date du tirage
                        </InputLabel>
                        <InputStrap
                            required
                            type="date"
                            id="selectedDate"
                            name='selectedDate'
                            value={this.state.selectedDate}
                            className="input-lg"
                            onChange={(e) => this.setState({ selectedDate: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left">
                            Type d'avance
                        </InputLabel>
                        <Autocomplete
                            value={advanceType}
                            id="combo-box-demo"
                            options={advanceTypeEnum}
                            onChange={(__, item) => {
                                this.setState({ advanceType: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    {/* <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="advanceValue">
                            Inscrit sur avance
                        </InputLabel>
                        <InputStrap
                            required
                            type="number"
                            id="advanceValue"
                            name='advanceValue'
                            className="input-lg"
                            value={advanceValue}
                            onChange={(e) => this.setState({advanceValue: e.target.value})}
                        />
                    </FormGroup> */}
                    <FormGroup className="float-right mb-20">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => { this.onValidate() }}
                            className="text-white font-weight-bold mb-20"
                        >
                            Soumettre
                        </Button>
                    </FormGroup>
                </RctCardContent>
            </DialogComponent>
        );
    }
}


export default connect(() => { }, { setRequestGlobalAction })(withRouter(CodevStep1));