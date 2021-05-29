import React, { Component, useState } from 'react';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { useForm } from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';
import _ from 'lodash';

import Button from "@material-ui/core/Button";
import SweetAlert from 'react-bootstrap-sweetalert';
import { getCatalogsOfOneType, getPackages, getProductTypes, getCatalogProducts } from "Actions/GeneralActions";
import { connect } from "react-redux";
import { setRequestGlobalAction } from "Actions/RequestGlobalAction";
import CustomList from "Components/CustomList";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import InputComponent from "Components/InputComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import CancelIcon from '@material-ui/icons/Cancel';
import Select from "@material-ui/core/Select/Select";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorInputComponent from "Components/ErrorInputComponent";
import Input from "@material-ui/core/Input/Input";
import { createPackage, getCurrencies } from "Actions/independentActions";
import { NotificationManager } from "react-notifications";
import { ERROR_500 } from "Constants/errors";
import { PACKAGES } from "Url/frontendUrl";
import Product from "Enums/Product";
import FetchFailedComponent from "Components/FetchFailedComponent";
import AmountCurrency from "Components/AmountCurrency";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            chosenProducts: [],
            currencies: [],
            types: [],
            units: [],
            currency: null,
            storeProducts: [],
            showCreateBox: false,
            showDeleteBox: false,
            deleteProduct: {},
            catalogSale: {},
            loadingProducts: false,
        }
    }

    componentDidMount() {
        this.loadData();
        this.fetchCurrencies();
    }


    fetchCurrencies = () => {
        getCurrencies()
            .then(result => {
                this.setState({ currencies: result })
            });
    };

    loadData = () => {
        this.props.getCatalogsOfOneType(Product.SALE, this.props.authUser.user.branch.id)
            .then(result => {
                if (result.length > 0) {
                    this.setState({ catalogSale: result[0].id });
                    this.fetchProducts(result[0].id);
                } else {
                    NotificationManager.warning("Vous devez d'abord créer un catalogue de vente avant de pousuivre cette action");
                }
            })
            .catch(() => null)

        /*this.props.getProductTypes(this.props.authUser.user.branch.id)
            .then(products => {
                this.setState({storeProducts: products});
            });*/
    };

    fetchProducts = catalogId => {
        this.setState({ loadingProducts: true });
        // getOneCatalog(result[0].id)
        this.props.getCatalogProducts(catalogId)
            .then(res => {
                if (res.length === 0) {
                    NotificationManager.warning("Aucun produit disponible pour ce catalogue");
                }
                this.setState({ storeProducts: res });
            })
            .catch(() => null)
            .finally(() => this.setState({ loadingProducts: false }));
    };

    handleOnCatalogChange = (value) => {
        if (value !== this.state.catalogSale) {
            this.setState({ catalogSale: value }, () => {
                this.fetchProducts(value);
            });
        }
    };

    onAddProduct = (product, quantity, price) => {
        this.setState(prevState => ({
            chosenProducts: [...prevState.chosenProducts, { ...product, quantity, price }],
            storeProducts: prevState.storeProducts.filter(p => p.id !== product.id),
            showCreateBox: false,
        }));
    };

    onDeleteProduct = () => {
        this.setState(prevState => ({
            chosenProducts: prevState.chosenProducts.filter(p => p.id !== this.state.deleteProduct.id),
            storeProducts: [...prevState.storeProducts, this.state.deleteProduct],
            showDeleteBox: false,
        }));
    };

    validate = () => {
        if (!this.state.name || (this.state.name && this.state.name.length === 0)) {
            NotificationManager.error("Veuillez bien remplir le champ nom");
            return false;
        }

        if (!this.state.description || (this.state.description && this.state.description.length === 0)) {
            NotificationManager.error("Veuillez bien remplir le champ description");
            return false;
        }

        if (!this.state.chosenProducts || (this.state.chosenProducts && this.state.chosenProducts.length === 0)) {
            NotificationManager.error("Veuillez Selectionner au moins un produit");
            return false;
        }

        return true;
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (this.validate()) {
            const data = {
                catalog_id: this.state.catalogSale,
                label: this.state.name,
                description: this.state.description,
                // price: this.state.price,
                // currency: this.state.currency,
                // partner_id: this.props.authUser.user.id,
                items: JSON.stringify(this.state.chosenProducts.map(p => ({ type_product_id: p.id, quantity: p.quantity, price: p.price })))
            };

            this.props.setRequestGlobalAction(true);
            createPackage(data, this.props.authUser.branchId)
                .then(() => {
                    NotificationManager.success("Paquetage créé avec succèss");
                    // this.props.getPackages(this.props.authUser.branchId);
                    this.props.getPackages(this.props.authUser.user.id, this.props.authUser.user.branch.id);
                    this.props.history.push(PACKAGES.LIST);
                })
                .catch(() => null)
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { catalogTypes } = this.props;
        const { catalogSale, loadingProducts } = this.state;

        if (catalogTypes.loading) {
            return (<RctSectionLoader />);
        }

        if (!catalogTypes.loading && !catalogTypes.data) {
            return (<FetchFailedComponent _onRetryClick={this.loadData} />)
        }

        return (
            <div>
                <h1 style={{
                    marginBottom: '3%'
                }}>Création d'un package</h1>

                <Form onSubmit={this.onSubmit}>

                    <CustomAsyncComponent
                        loading={false}
                        data={catalogTypes.data}
                        component={data => (
                            <div className="form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="operator-helper">
                                        Catalogue de vente
                                    </InputLabel>
                                    <Select
                                        value={catalogSale}
                                        onChange={event => this.handleOnCatalogChange(event.target.value)}
                                        input={<Input name="operator" id="operator-helper" />}>
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

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Nom du paquetage
                        </InputLabel>
                        <InputStrap
                            required
                            id="name"
                            name={'label'}
                            value={this.state.name}
                            className="has-input input-lg"
                            onChange={event => this.setState({ name: event.target.value })}
                        />
                        {/* <span className="has-icon"><i className="ti-pencil"></i></span> */}
                    </FormGroup>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description
                        </InputLabel>
                        <InputStrap
                            required
                            id="description"
                            name={'description'}
                            value={this.state.description}
                            className="has-input input-lg"
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                        {/* <span className="has-icon"><i className="ti-pencil"></i></span> */}
                    </FormGroup>

                    {/* <div className="row align-items-center">
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="price">
                                    Prix par defaut
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
                        <div className="col-md-6 col-sm-12">
                            <FormControl fullWidth>
                                <InputLabel className="text-left" htmlFor="currency-helper">
                                    Devise
                                </InputLabel>
                                <Select onChange={e => this.setState({ currency: e.target.value })}>
                                    {this.state.currencies.map(item => (
                                        <MenuItem key={item.id} value={item.code} className="center-hor-ver">
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div> */}


                    {loadingProducts ? (
                        <RctSectionLoader />
                    ) : (
                            <>
                                <CustomList
                                    loading={false}
                                    // showSearch={false}
                                    list={this.state.chosenProducts}
                                    onAddClick={() => this.setState({ showCreateBox: true })}
                                    itemsFoundText={n => `${n} produit(s) sélectionné(s)`}
                                    addPermissions={{
                                        permissions: [],
                                    }}
                                    renderItem={list => (
                                        <>
                                            <h2>
                                                Prix du package: &nbsp; &nbsp;
                                                <AmountCurrency amounts={list.map((e) => {
                                                    return { amount: e.price, currency: e.priceCurrency, quantity: e.quantity }
                                                })} styles={{ fontWeight: 'bold', marginBottom: 40 }} />
                                            </h2>
                                            {list && list.length === 0 ? (
                                                <div className="d-flex justify-content-center align-items-center py-50">
                                                    <h4>
                                                        Aucun produits sélectionnés
                                                </h4>
                                                </div>
                                            ) : (
                                                    <div className="table-responsive">
                                                        <table className="table table-hover table-middle mb-0 text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th><IntlMessages id="components.name" /></th>
                                                                    <th>Prix</th>
                                                                    <th>Quantité</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {list && list.map((product, key) => (
                                                                    <tr key={key} className="cursor-pointer">
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <h4 className="m-0 fw-bold text-dark">{product.label}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <h4 className="m-0 fw-bold text-dark">{product.price} {product.priceCurrency}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <h4 className="m-0 fw-bold text-dark">{product.quantity}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="media">
                                                                                <div className="media-body pt-10">
                                                                                    <a href="#" className="text-danger" onClick={() => this.setState({ showDeleteBox: true, deleteProduct: product })}>
                                                                                        <span className="material-icons mr-10">delete</span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                        </>
                                    )}
                                />

                                <FormGroup className="mb-15">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        disabled={this.props.catalogTypes.data.length === 0 || this.props.requestGlobalLoader}
                                        variant="contained"
                                        // onClick={this.onSubmit}
                                        className="bg-blue text-white font-weight-bold"
                                    >
                                        Soumettre
                                </Button>
                                </FormGroup>
                            </>
                        )}

                </Form>

                <AddProduct
                    show={this.state.showCreateBox}
                    products={this.state.storeProducts}
                    onSave={this.onAddProduct}
                    onClose={() => this.setState({ showCreateBox: false })}
                />

                <SweetAlert
                    type="danger"
                    show={this.state.showDeleteBox}
                    showCancel
                    showConfirm
                    title={"Confirmation"}
                    customButtons={(
                        <>
                            <Button
                                color="blue"
                                variant="outlined"
                                onClick={() => this.setState({ showDeleteBox: false })}
                                className="text-white bg-blue font-weight-bold mr-3"
                            >
                                Non je ne veux pas
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                className="bg-danger text-white font-weight-bold"
                                onClick={this.onDeleteProduct}
                            >
                                Oui je veux
                            </Button>
                        </>
                    )}
                    onConfirm={this.onDeleteProduct}
                >
                    Etes-vous sur de vouloir supprimé ce produit ?
                </SweetAlert>

            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, productTypes, authUser, catalogTypes }) => {
    return {
        requestGlobalLoader,
        loading: productTypes.loading,
        productTypes: productTypes.data,
        error: productTypes.error,
        authUser: authUser.data,
        catalogTypes
    }
};

export default connect(mapStateToProps, { getPackages, getProductTypes, getCatalogsOfOneType, getCatalogProducts, setRequestGlobalAction })
    (injectIntl(Create));

const AddProduct = ({ show, products, onSave, onClose }) => {

    // const [product, setProduct] = useState(products[0]);
    // const [quantity, setQuantity] = useState(1);
    const theme = useTheme();
    const [id, setId] = useState(null);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { control, register, errors, handleSubmit, setValue, watch } = useForm();

    const onSubmit = (data) => {
        const productId = data.product;
        if (productId === null || productId === undefined) {
            NotificationManager.error("Vous devez choisir un produit ou en créé un d'abord");
            return;
        }

        onSave(products.find(p => p.id === productId), data.quantity, data.price);
    };

    return (
        <Dialog
            open={show}
            onClose={onClose}
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth={'lg'}
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                <div className="row justify-content-between align-items-center">
                    Ajouté un nouveau produit
                    <IconButton
                        color="primary"
                        aria-label="close"
                        className="text-danger"
                        // onClick={() => this.setState({showCreateBox: false})}>
                        onClick={onClose}>
                        <CancelIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <RctCollapsibleCard>
                    <Form onSubmit={onSubmit}>
                        <div className="w-100">

                            <CustomAsyncComponent
                                loading={false}
                                data={products}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="representativePosition">
                                                Produit
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'product'}
                                                defaultValue={data.id ? data.id : undefined}
                                                as={<Select >
                                                    {data.map((item, index) => (
                                                        <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                                            {item.label} ({item.priceCurrency})
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />

                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="price">
                                    Prix unitaire
                                    {/* Prix unitaire */}
                                </InputLabel>
                                <InputComponent
                                    isRequired
                                    type="number"
                                    id="price"
                                    errors={errors}
                                    register={register}
                                    className="input-lg"
                                    name={'price'}
                                    // placeholder="10"
                                    otherValidator={{ minLength: 1 }}
                                >
                                    {errors.price?.type === 'pattern' && (
                                        <ErrorInputComponent text="Entrer un prix supérieur à 0" />
                                    )}
                                </InputComponent>
                            </FormGroup>

                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="quantity">
                                    Quantité
                                </InputLabel>
                                <InputComponent
                                    isRequired
                                    type="number"
                                    id="quantity"
                                    errors={errors}
                                    register={register}
                                    className="input-lg"
                                    name={'quantity'}
                                    // placeholder="10"
                                    otherValidator={{ minLength: 1 }}
                                >
                                    {errors.quantity?.type === 'pattern' && (
                                        <ErrorInputComponent text="Entrer une quantité supérieur à 0" />
                                    )}
                                </InputComponent>
                            </FormGroup>
                        </div>

                        <FormGroup className="mb-15">
                            <Button
                                // type="submit"
                                color="primary"
                                // disabled={loading}
                                variant="contained"
                                className="text-white font-weight-bold mr-3"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Ajouter
                            </Button>
                        </FormGroup>
                    </Form>
                </RctCollapsibleCard>
            </DialogContent>
        </Dialog>
    );
};
