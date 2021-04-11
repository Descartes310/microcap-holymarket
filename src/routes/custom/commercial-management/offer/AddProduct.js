import React, { Component, useState } from 'react';
import { Form, FormGroup, Input as InputStrap, Col, Label } from 'reactstrap';
import { useForm } from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';
import _ from 'lodash';

import Button from "@material-ui/core/Button";
import SweetAlert from 'react-bootstrap-sweetalert';
import {
    getPackages,
    getProductTypes,
    getCatalogProducts,
    getComOperationType,
    getAllProductTypeBySale,
    getSysTimeUnit
} from "Actions";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputComponent from "Components/InputComponent";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { withStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import Select from "@material-ui/core/Select/Select";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import { getPartnersByBranch, getOrganisations, getAllCatalogs, getProductsFromCatalog, addProductToOffer } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import { COMMERCIAL_MANAGEMENT, PACKAGES } from "Url/frontendUrl";
import { getComOffer } from "Actions/GeneralActions";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { computeAmountFromCurrency } from 'Helpers/helpers'

const PROCESS = [
    { label: 'Demande de pièce', id: 'ASKING_PIECE' },
    // { label: "Demande d'accord de vente", id: 'SELL_APPROBATION' },
    // { label: "Demande d'accord d'achat", id: 'BUY_APPROBATION' }
];

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            quantity: '',
            defaultPrice: '',
            description: '',
            endDate: '',
            startDate: '',
            type: 'PRODUCT',
            saleWay: null,
            sellers: [],
            sellerLoading: true,
            seller: null,
            catalogs: [],
            catalogLoading: false,
            catalog: null,
            products: [],
            productLoading: false,
            product: null,
            leftValuesSelected: [],
            rightValuesSelected: [],
            loadingProducts: false,
            sellProcess: [],
            originalProcess: PROCESS,
            indirectSell: false,
            accept_many_payment: false,
            minimal_percentage: 0,
            number_max_of_days_payment: 0
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.fetchSeller();
        // this.fetchProducts();
    };

    fetchSeller = () => {
        this.setState({ sellerLoading: true });
        getPartnersByBranch(this.props.authUser.branchId)
            .then(res => {
                this.setState({ sellers: res });
            })
            .catch((error) => {
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ sellerLoading: false }));
    }

    loadCatalogs = (id) => {
        this.setState({ catalogLoading: true, products: [] });
        getAllCatalogs(id, 'VENTE')
            .then(res => {
                this.setState({ catalogs: res });
            })
            .catch((error) => {
                console.log("error => ", error);
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ catalogLoading: false }));
    }

    fetchProducts = () => {
        this.setState({ productLoading: true });
        // getOneCatalog(result[0].id)
        getProductsFromCatalog(this.state.catalog)
            .then(res => {
                if (res.length === 0) {
                    NotificationManager.warning("Aucun produits disponible.");
                }
                this.setState({ products: res });
            })
            .catch((error) => {
                console.log("error => ", error);
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({ productLoading: false }));
    };

    validate = () => {
        if (!this.state.product) {
            NotificationManager.error("Veuillez sélectionner un produit");
            return false;
        }

        return true;
    };


    handleOnSwitchPressed = position => {
        let dataToSend = this.state[position === 'left' ? 'leftValuesSelected' : 'rightValuesSelected'];

        if (dataToSend.length === 0) {
            NotificationManager.warning("Vous devrier d'abord selectionner un éléments dans la liste");
            return;
        }

        if (position === 'left') {
            this.setState({ sellProcess: this.state.sellProcess.concat(PROCESS.filter(o => dataToSend.includes(o.id))), originalProcess: this.state.originalProcess.filter(o => !dataToSend.includes(o.id)) });
        } else {
            this.setState({ sellProcess: this.state.sellProcess.filter(o => !dataToSend.includes(o.id)), originalProcess: this.state.originalProcess.concat(PROCESS.filter(o => dataToSend.includes(o.id))) });
        }


    };

    handleSelect = (position, event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        this.setState({ [position === 'left' ? 'leftValuesSelected' : 'rightValuesSelected']: values });
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (this.validate()) {
            let data = {
                price: this.state.price,
                // default_price: this.state.defaultPrice,
                quantity: this.state.quantity,
                partner_id: this.state.seller,
                catalog_id: this.state.catalog,
                accept_many_payment: this.state.accept_many_payment,
                number_max_of_days_payment: this.state.number_max_of_days_payment,
                minimal_percentage: this.state.minimal_percentage,
                product_id: this.state.product,
                product_type: this.state.type,
                sell_process: this.state.sellProcess.map(sp => { return sp.id}).join(','),
                inderect_sell: this.state.indirectSell
            };

            if(!this.state.accept_many_payment) {
                delete data.number_max_of_days_payment;
                delete data.minimal_percentage;
            }

            this.props.setRequestGlobalAction(true);
            addProductToOffer(data, this.props.match.params.id)
                .then(() => {
                    NotificationManager.success("Produit ajouté avec succèss");
                    this.props.history.push(COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.LIST);
                })
                .catch(() => {
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { productTypes, authUser, comOperationType, systemObject, classes } = this.props;
        const { catalogSale, indirectSell, sellers, sellerLoading, sellProcess, originalProcess, catalog, catalogs, catalogLoading, products, productLoading } = this.state;

        return (
            <div className="page-list" style={{ padding: 30 }}>
                <PageTitleBar title={"Ajout d'un produit"} />
                <RctCollapsibleCard>
                    <Form onSubmit={this.onSubmit}>
                        {/* <h1>Contexte de vente</h1> */}
                        <div className="row">
                            <CustomAsyncComponent
                                loading={sellerLoading}
                                data={sellers}
                                component={data => (
                                    <div className="col-md-6 col-sm-12 form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="partnerId-helper">
                                                Vendeur
                                            </InputLabel>
                                            <Select
                                                value={this.state.seller}
                                                onChange={event => { this.setState({ seller: event.target.value }, () => { this.loadCatalogs(this.state.seller) }) }}
                                                input={<Input name="partnerId" id="partnerId-helper" />}>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item.organisation ? item.organisation.user.id : item.person.user.id} className="center-hor-ver">
                                                        {item.organisation ? item.organisation.commercialName : item.person.firstName + ' ' + item.person.lastName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            />
                            <CustomAsyncComponent
                                loading={catalogLoading}
                                data={catalogs}
                                component={data => (
                                    <div className="col-md-6 col-sm-12 form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="catalogId-helper">
                                                Catalogue de vente
                                    </InputLabel>
                                            <Select
                                                value={this.state.catalog}
                                                onChange={event => this.setState({ catalog: event.target.value }, () => { this.fetchProducts(this.state.catalog) })}
                                                input={<Input name="catalogId" id="catalogId-helper" />}>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item.id} className="center-hor-ver">
                                                        {item.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>

                        {/* <h1>Informations sur le produit</h1> */}
                        <div className="row">
                            <CustomAsyncComponent
                                loading={productLoading}
                                data={products}
                                component={data => (
                                    <div className="col-md-6 col-sm-12 form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="product-helper">
                                                Produits
                                            </InputLabel>
                                            <Select
                                                value={this.state.product}
                                                onChange={event => {
                                                    this.setState({
                                                        product: event.target.value.id, type: event.target.value.type, defaultPrice: event.target.value.type == 'PRODUCT' ? `${event.target.value.defaultPrice} ${event.target.value.priceCurrency}` : `${Number(computeAmountFromCurrency(this.props.currencies, null, event.target.value.products.map((e) => {
                                                            return { amount: e.price, currency: e.currency, quantity: e.quantity }
                                                        }), this.props.authUser.user.currency, null, null))} ${this.props.authUser.user.currency.code}`
                                                    })
                                                }}
                                                input={<Input name="product" id="product-helper" />}>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item} className="center-hor-ver">
                                                        {item.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            />
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="name">
                                    Quantité
                            </InputLabel>
                                <InputStrap
                                    required
                                    id="quantity"
                                    type="number"
                                    name={'quantity'}
                                    value={this.state.quantity}
                                    className="has-input input-lg"
                                    onChange={event => this.setState({ quantity: event.target.value })}
                                />
                                {/* <span className="has-icon"><i className="ti-pencil"></i></span> */}
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="defautlPrice">
                                    Prix par defaut
                                </InputLabel>
                                <InputStrap
                                    required
                                    disabled
                                    id="defautlPrice"
                                    type="text"
                                    name={'defaultPrice'}
                                    value={this.state.defaultPrice}
                                    className="has-input input-lg"
                                />
                                {/* <span className="has-icon"><i className="ti-pencil"></i></span> */}
                            </FormGroup>
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="price">
                                    Prix de vente
                            </InputLabel>
                                <InputStrap
                                    required
                                    id="price"
                                    type="number"
                                    name={'price'}
                                    value={this.state.price}
                                    className="has-input input-lg"
                                    onChange={event => this.setState({ price: event.target.value })}
                                />
                                {/* <span className="has-icon"><i className="ti-pencil"></i></span> */}
                            </FormGroup>
                        </div>

                        <FormGroup check style={{ marginBottom: 30 }}>
                            <Label check>
                                <InputStrap type="checkbox" onChange={event => this.setState({ accept_many_payment: event.target.checked })} />
                                Accepter les paiements différés
                            </Label>
                        </FormGroup>

                        {this.state.accept_many_payment ?
                            <div className="row">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="defautlPrice">
                                        Pourcentage minimal de la première tranche
                            </InputLabel>
                                    <InputStrap
                                        required
                                        id="minimal_percentage"
                                        type="number"
                                        name={'minimal_percentage'}
                                        value={this.state.minimal_percentage}
                                        className="has-input input-lg"
                                        onChange={event => this.setState({ minimal_percentage: event.target.value })}
                                    />
                                    {/* <span className="has-icon"><i className="ti-pencil"></i></span> */}
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="price">
                                        Nombre de jour d'échéance
                            </InputLabel>
                                    <InputStrap
                                        required
                                        id="number_max_of_days_payment"
                                        type="number"
                                        name={'number_max_of_days_payment'}
                                        value={this.state.number_max_of_days_payment}
                                        className="has-input input-lg"
                                        onChange={event => this.setState({ number_max_of_days_payment: event.target.value })}
                                    />
                                    {/* <span className="has-icon"><i className="ti-pencil"></i></span> */}
                                </FormGroup>
                            </div>

                            : null
                        }

                        <FormGroup check style={{ marginBottom: 30 }}>
                            <Label check>
                                <InputStrap type="checkbox" onChange={event => this.setState({ indirectSell: event.target.checked })} />
                                    Produit en vente indirecte
                                    </Label>
                        </FormGroup>
                        <RctCollapsibleCard>
                            <h1 className='mb-20'>
                                Processus de vente préalable
                            </h1>
                            <Form>
                                <div className="row">
                                    <div className="col-md-5 col-sm-5">
                                        <InputStrap
                                            type="select"
                                            name="selectMulti"
                                            id="SelectMulti"
                                            onChange={event => this.handleSelect('left', event)}
                                            multiple>
                                            {originalProcess.map(p => (
                                                <option key={p.id} value={p.id}>{p.label}</option>
                                            ))}
                                        </InputStrap>
                                    </div>

                                    <div className="col-1">
                                        <IconButton
                                            edge="start"
                                            className={classes.menuButton + ' text-black mr-2'}
                                            color="inherit"
                                            onClick={() => this.handleOnSwitchPressed('left')}
                                            aria-label="menu">
                                            <ArrowForwardIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="start"
                                            className={classes.menuButton + ' text-black'}
                                            color="inherit"
                                            onClick={() => this.handleOnSwitchPressed('right')}
                                            aria-label="menu">
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </div>

                                    <div className="col-md-5 col-sm-5">
                                        <InputStrap
                                            type="select"
                                            name="selectMultiRight"
                                            id="SelectMultiRight"
                                            onChange={event => this.handleSelect('right', event)}
                                            multiple>
                                            {sellProcess.map(p => (
                                                <option key={p.id} value={p.id}>{p.label}</option>
                                            ))}
                                        </InputStrap>
                                    </div>
                                </div>
                            </Form>
                        </RctCollapsibleCard>


                        <FormGroup className="mb-15">
                            <Button
                                type="submit"
                                color="primary"
                                disabled={this.props.requestGlobalLoader}
                                variant="contained"
                                // onClick={this.onSubmit}
                                className="text-white font-weight-bold"
                            >
                                Soumettre
                            </Button>
                        </FormGroup>
                    </Form>

                </RctCollapsibleCard>

            </div >
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, productTypes, authUser, comOperationType, systemObject, packages, settings }) => {
    return {
        requestGlobalLoader,
        loading: productTypes.loading,
        productTypes: productTypes.data,
        error: productTypes.error,
        authUser: authUser.data,
        comOperationType,
        currencies: settings.currencies,
        systemObject,
        packages
    }
};

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    /*menuButton: {
        marginRight: theme.spacing(2),
    },*/
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

export default connect(mapStateToProps, { getComOffer, getPackages, getProductTypes, getComOperationType, getCatalogProducts, getSysTimeUnit, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(injectIntl(AddProduct)));