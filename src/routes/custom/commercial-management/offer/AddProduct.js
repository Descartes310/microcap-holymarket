import {
    getPackages,
    getSysTimeUnit,
    getProductTypes,
    getCatalogProducts,
    getComOperationType,
    getAllProductTypeBySale,
} from "Actions";
import _ from 'lodash';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem";
import React, { Component, useState } from 'react';
import { getComOffer } from "Actions/GeneralActions";
import Select from "@material-ui/core/Select/Select";
import FormControl from "@material-ui/core/FormControl";
import { NotificationManager } from "react-notifications";
import { computeAmountFromCurrency } from 'Helpers/helpers';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { COMMERCIAL_MANAGEMENT, PACKAGES } from "Url/frontendUrl";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import { Form, FormGroup, Input as InputStrap, Col, Label } from 'reactstrap';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import IndirectProducts from "Routes/custom/commercial-management/offer/IndirectProducts";
import { getPartnersByBranch, getUserCommunities, getAllCatalogs, getProductsFromCatalog, addProductToOffer } from "Actions";

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
            range: "NETWORK",
            catalogLoading: false,
            availability: false,
            showCommunities: false,
            community: null,
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
            number_max_of_days_payment: 0,
            docsChosen: [],
        }
    }

    componentDidMount() {
        this.loadData();
        this.props.getUserCommunities(this.props.authUser.user.id);
    };

    loadData = () => {
        this.fetchSeller();
        this.loadCatalogs(this.props.authUser.id);
    };

    fetchSeller = () => {
        this.setState({ sellerLoading: true });
        getPartnersByBranch(this.props.authUser.branchId)
            .then(res => {
                this.setState({ sellers: res });
            })
            .catch(() => null)
            .finally(() => this.setState({ sellerLoading: false }));
    };

    loadCatalogs = (id) => {
        this.setState({ catalogLoading: true, products: [] });
        getAllCatalogs(id, 'VENTE')
            .then(res => {
                this.setState({ catalogs: res });
            })
            .catch(() => null)
            .finally(() => this.setState({ catalogLoading: false }));
    };

    fetchProducts = () => {
        this.setState({ productLoading: true });
        getProductsFromCatalog(this.state.catalog)
            .then(res => {
                if (res.length === 0) {
                    NotificationManager.warning("Aucun produits disponible.");
                }
                this.setState({ products: res });
            })
            .catch(() => null)
            .finally(() => this.setState({ productLoading: false }));
    };

    validate = () => {
        if (!this.state.product) {
            NotificationManager.error("Veuillez sélectionner un produit");
            return false;
        }

        if (this.state.indirectSell && this.state.docsChosen.length === 0) {
            NotificationManager.error("Veuillez sélectionner au moins un documents");
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
                quantity: this.state.quantity,
                catalog_id: this.state.catalog,
                accept_many_payment: this.state.accept_many_payment,
                number_max_of_days_payment: this.state.number_max_of_days_payment,
                minimal_percentage: this.state.minimal_percentage,
                product_id: this.state.product.id,
                product_type: this.state.type,
                sell_process: this.state.sellProcess.map(sp => { return sp.id }).join(','),
                inderect_sell: this.state.indirectSell,
            };

            if (this.state.indirectSell) {
                data.product_piece_id = this.state.docsChosen;
            }

            if (this.state.range) {
                data.range = this.state.range;
                if(this.state.range == 'COMMUNITY') {
                    data.community_id = this.state.community;
                }
            }

            if (!this.state.accept_many_payment) {
                delete data.number_max_of_days_payment;
                delete data.minimal_percentage;
            }

            this.props.setRequestGlobalAction(true);
            addProductToOffer(data, this.props.match.params.id)
                .then(() => {
                    NotificationManager.success("Produit ajouté avec succèss");
                    this.props.history.push(COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.LIST);
                })
                .catch(() => null)
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    onDocsChange = docsChosen => {
        if (!_.isEqual(this.state.docsChosen, docsChosen)) {
            this.setState({ docsChosen });
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
                        <div className="row">
                            <CustomAsyncComponent
                                loading={catalogLoading}
                                data={catalogs}
                                component={data => (
                                    <div className="col-md-12 col-sm-12 form-group text-left">
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
                                                value={this.state.product && `${this.state.product.id}_${this.state.product.type}`}
                                                onChange={event => {
                                                    const _product = data.find(p => `${p.id}_${p.type}` === event.target.value);
                                                    this.setState({
                                                        product: _product,
                                                        type: _product.type,
                                                        defaultPrice: _product.type === 'PRODUCT'
                                                            ? `${_product.defaultPrice} ${_product.priceCurrency}`
                                                            : `${Number(computeAmountFromCurrency(this.props.currencies, null, _product.products.map((e) => {
                                                                return { amount: e.price, currency: e.currency, quantity: e.quantity }
                                                            }), this.props.authUser.user.currency, null, null))} ${this.props.authUser.user.currency.code}`
                                                    })
                                                }}
                                                input={<Input name="product" id="product-helper" />}>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={`${item.id}_${item.type}`} className="center-hor-ver">
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
                                </FormGroup>
                            </div>

                            : null
                        }

                        <FormGroup check style={{ marginBottom: 30 }}>
                            <Label check>
                                <InputStrap type="checkbox" onChange={event => this.setState({ availability: event.target.checked })} />
                                Disponibilité du produit
                            </Label>
                        </FormGroup>



                        {this.state.availability && (
                            <CustomAsyncComponent
                                loading={false}
                                data={[{ label: 'Communauté', id: 'COMMUNITY' }, { label: 'Opérateur', id: 'OPERATOR' }, { label: 'Pays', id: 'COUNTRY' }, { label: 'Réseau', id: 'NETWORK' }]}
                                component={data => (
                                    <div className="form-group text-left mt-10">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="productAvailability-helper">
                                                Portée du produit
                                            </InputLabel>
                                            <Select
                                                value={this.state.range}
                                                onChange={event => {
                                                    this.setState({ range: event.target.value, showCommunities: event.target.value == 'COMMUNITY' });
                                                }}
                                                input={<Input name="productAvailability" id="productAvailability-helper" />}>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item.id}>
                                                        {item.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            />
                        )}

                        {this.state.showCommunities && (
                            <CustomAsyncComponent
                                loading={false}
                                data={this.props.userCommunities}
                                component={data => (
                                    <div className="form-group text-left mt-10">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="community-helper">
                                                Sélectionner la communauté
                                            </InputLabel>
                                            <Select
                                                value={this.state.community}
                                                onChange={event => {
                                                    this.setState({ community: event.target.value });
                                                }}
                                                input={<Input name="community" id="community-helper" />}>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item.group.id}>
                                                        {item.group.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            />
                        )}

                        <FormGroup check style={{ marginBottom: 30 }}>
                            <Label check>
                                <InputStrap type="checkbox" onChange={event => this.setState({ indirectSell: event.target.checked })} />
                                Produit en vente indirecte
                            </Label>
                        </FormGroup>

                        <IndirectProducts
                            showProcess={indirectSell}
                            onDocsChange={this.onDocsChange}
                        />

                        <FormGroup className="mb-15">
                            <Button
                                type="submit"
                                color="primary"
                                disabled={this.props.requestGlobalLoader}
                                variant="contained"
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
const mapStateToProps = ({ requestGlobalLoader, userCommunities, productTypes, authUser, comOperationType, systemObject, packages, settings }) => {
    return {
        requestGlobalLoader,
        loading: productTypes.loading,
        productTypes: productTypes.data,
        error: productTypes.error,
        authUser: authUser.data,
        userCommunities: userCommunities.data,
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

export default connect(mapStateToProps, { getUserCommunities, getComOffer, getPackages, getProductTypes, getComOperationType, getCatalogProducts, getSysTimeUnit, setRequestGlobalAction })
    (withStyles(useStyles, { withTheme: true })(injectIntl(AddProduct)));
