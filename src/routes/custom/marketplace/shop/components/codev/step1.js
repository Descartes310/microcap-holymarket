import { connect } from 'react-redux';
import { FormGroup } from 'reactstrap';
import React, { Component } from 'react';
import { convertDate } from 'Helpers/helpers';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import Indivision from './createIndivision.tsx';
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
        plan: null,
        alias: null,
        aliases: [],
        product: null,
        drawDate: null,
        cessible: false,
        indivision: null,
        editable: false,
        selectedLine: null,
        advanceType: null,
        advanceValue: null,
        selectedDate: null,
        subscriptionType: null,
        showCreateIndivisionBox: false,
        indivisions: [{id: 0, name: 'Nouvelle indivision'}],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.product) {
            this.findProduct();
        }
    }

    findIndivisions = () => {
        this.props.setRequestGlobalAction(true);
        ProductService.getIndivisionsByProduct({reference: this.props.product.reference})
        .then(response => {
            this.setState({ indivisions: [...this.state.indivisions, ...response.map(i => { return {...i, name: 'Date: '+i.line.tirage+', Denomination: '+i.denomination+', Montant: '+i.amount}})] });
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
            } else {
                this.setState({ product: response }, () => this.findTirageDates());
                this.findIndivisions();
            }
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
        const { product, selectedDate, subscriptionType, indivision } = this.state;

        if(subscriptionType.value === 'INDIVISION' && indivision.id === 0) {
            this.setState({ showCreateIndivisionBox: true });
            return;
        }

        if (!product || (!selectedDate && subscriptionType.value === 'ALONE')) {
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
            this.props.onSubmit(data);
        } else {
            data.indivision = indivision;
            this.props.onSubmit(data);
        }

    }

    render() {

        const { onClose, show, product } = this.props;
        const { dates, selectedDate, subscriptionType, indivisions, indivision, showCreateIndivisionBox } = this.state;

        return (
            showCreateIndivisionBox
            ? <Indivision
                data={{
                    product,
                    selectedDate,  
                    type: 'CODEV',
                    subscriptionType, 
                    productReference: product.reference 
                }}
                show={showCreateIndivisionBox}
                onClose={() => {
                    this.setState({ showCreateIndivisionBox: false });
                }}
                onValidate={(line) => {
                    this.setState({ indivision: line }, () => {
                        this.onValidate()
                    });  
                }}
            /> :
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
                    {
                        subscriptionType != null && (
                        subscriptionType.value == 'ALONE' ?
                    
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
                                getOptionLabel={(option) => convertDate(option.date, 'DD MMMM YYYY')}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup> : 
                        <>
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30 mt-20">
                                <InputLabel className="text-left">
                                    Indivisions disponibles
                                </InputLabel>
                                <Autocomplete
                                    options={indivisions}
                                    value={indivision}
                                    id="combo-box-demo"
                                    onChange={(__, item) => {
                                        this.setState({ indivision: item });
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>

                            { indivision?.id === 0 && (
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
                            )}
                        </>
                    )}
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