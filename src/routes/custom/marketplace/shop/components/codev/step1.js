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
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

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
        lines: [],
        plan: null,
        alias: null,
        aliases: [],
        product: null,
        drawDate: null,
        cessible: false,
        editable: false,
        advanceType: null,
        selectedLine: null,
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
        this.getAliases();
    }

    findLines = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getIndivisionsByDate({reference: this.props.product.reference, date: this.state.selectedDate.date})
        .then(response => {
            this.setState({ lines: response });
            this.setState({ selectedLine: response[0] });
        })
        .finally(() => this.props.setRequestGlobalAction(false))
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

    onValidate = async () => {
        const { product, selectedDate, subscriptionType } = this.state;

        if (!product || !selectedDate) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data = {
            product,
            selectedDate,  
            type: 'CODEV',
            subscriptionType, 
            productReference: product.reference
        }

        if(subscriptionType.value == 'ALONE') {
            ProductService.getLinesByDate({reference: product.reference, date: selectedDate.date})
            .then(response => {
                data.line_reference = response[0]?.rereference
                data.line = response[0];
                this.props.onSubmit(data);
            })
        } else {
            this.props.onSubmit(data);
        }

    }

    render() {

        const { onClose, show } = this.props;
        const { dates, selectedDate, subscriptionType } = this.state;

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