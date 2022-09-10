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
    }
];

const subscriptionTypeEnum = [
    {
        label: 'Individuelle',
        value: 'ALONE'
    },
    {
        label: 'Indivision',
        value: 'INDIVISION'
    }
];

class CodevStep1 extends Component {

    state = {
        dates: [],
        plan: null,
        product: null,
        drawDate: null,
        cessible: false,
        editable: false,
        advanceType: null,
        advanceValue: null,
        selectedDate: null,
        subscriptionType: null,
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
            this.setState({ product: response }, () => this.findTirageDates());
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    findTirageDates = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getFreeTirages({reference: this.props.product.reference})
        .then(response => {
            this.setState({ dates: response });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
    }

    onValidate = () => {
        const { product, cessible, editable, advanceValue, advanceType, selectedDate, subscriptionType } = this.state;
        if (!product || !advanceType || !selectedDate) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data = {
            selectedDate, 
            advanceValue, 
            subscriptionType, 
            productReference: product.reference
        }

        this.props.onSubmit(data);
    }

    render() {

        const { onClose, show } = this.props;
        const { product, cessible, editable, advanceValue,
            advanceType, dates, plan, selectedDate, subscriptionType } = this.state;

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
                        <Autocomplete
                            options={dates}
                            value={selectedDate}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                this.setState({ selectedDate: item });
                            }}
                            getOptionLabel={(option) => option.date}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                        <InputLabel className="text-left">
                            Type de souscription
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={subscriptionType}
                            options={subscriptionTypeEnum}
                            onChange={(__, item) => {
                                this.setState({ subscriptionType: item });
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                    
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