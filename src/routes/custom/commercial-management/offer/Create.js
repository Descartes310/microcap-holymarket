import React, {Component, useState} from 'react';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import {useForm} from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import {injectIntl} from 'react-intl';
import _ from 'lodash';

import Button from "@material-ui/core/Button";
import SweetAlert from 'react-bootstrap-sweetalert';
import {
    getCatalogsOfOneType,
    getPackages,
    getProductTypes,
    getCatalogProducts,
    getComOperationType,
    getAllProductTypeBySale,
    getSysTimeUnit
} from "Actions";
import {connect} from "react-redux";
import {setRequestGlobalAction} from "Actions/RequestGlobalAction";
import CustomList from "Components/CustomList";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import InputComponent from "Components/InputComponent";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import CancelIcon from '@material-ui/icons/Cancel';
import Select from "@material-ui/core/Select/Select";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorInputComponent from "Components/ErrorInputComponent";
import Input from "@material-ui/core/Input/Input";
import {createOffer, createPackage, getOneCatalog} from "Actions/independentActions";
import {NotificationManager} from "react-notifications";
import {ERROR_500} from "Constants/errors";
import {COMMERCIAL_MANAGEMENT, PACKAGES} from "Url/frontendUrl";
import Product from "Enums/Product";
import FetchFailedComponent from "Components/FetchFailedComponent";
import {getComOffer} from "Actions/GeneralActions";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            quantity: '',
            description: '',
            validityUnit: '',
            validityValue: '',
            commercialOperatorId: '',
            image: '',

            chosenProducts: [],
            storeProducts: [],
            showCreateBox: false,
            showDeleteBox: false,
            deleteProduct: {},
            catalogSale: {},
            loadingProducts: false,

            chosenPackage: [],
            storePackage: [],
            showCreateBoxPackage: false,
            showDeleteBoxPackage: false,
            deletePackage: {},
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.fetchProducts();
        this.props.getComOperationType(this.props.authUser.branchId);
        this.props.getPackages(this.props.authUser.user.branch.id)
            .then(res => this.setState({storePackage: res}));

        this.props.getSysTimeUnit();
    };

    fetchProducts = () => {
        this.setState({loadingProducts: true});
        // getOneCatalog(result[0].id)
        getAllProductTypeBySale(this.props.authUser.branchId)
            .then(res => {
                if (res.length === 0) {
                    NotificationManager.warning("Aucun produits disponible.");
                }
                this.setState({storeProducts: res});
            })
            .catch((error) => {
                console.log("error => ", error);
                NotificationManager.error(ERROR_500);
            })
            .finally(() => this.setState({loadingProducts: false}));
    };

    onAddProduct = (product) => {
        this.setState(prevState => ({
            chosenProducts: [...prevState.chosenProducts, {...product}],
            storeProducts: prevState.storeProducts.filter(p => p.id !== product.id),
            showCreateBox: false,
        }));
    };

    onAddPackage = (_package) => {
        this.setState(prevState => ({
            chosenPackage: [...prevState.chosenPackage, {..._package}],
            storePackage: prevState.storePackage.filter(p => p.id !== _package.id),
            showCreateBoxPackage: false,
        }));
    };

    onDeleteProduct = () => {
        this.setState(prevState => ({
            chosenProducts: prevState.chosenProducts.filter(p => p.id !== this.state.deleteProduct.id),
            storeProducts: [...prevState.storeProducts, this.state.deleteProduct],
            showDeleteBox: false,
        }));
    };

    onDeletePackage = () => {
        this.setState(prevState => ({
            chosenPackage: prevState.chosenPackage.filter(p => p.id !== this.state.deletePackage.id),
            storePackage: [...prevState.storePackage, this.state.deletePackage],
            showDeleteBoxPackage: false,
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

        /*if (!this.state.chosenPackage || (this.state.chosenPackage && this.state.chosenPackage.length === 0)) {
            NotificationManager.error("Veuillez Selectionner au moins un paquetage");
            return false;
        }*/

        return true;
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (this.validate()) {
            const data = {
                label: this.state.name,
                price: this.state.price,
                validity_unit: this.state.validityUnit,
                validity_value: this.state.validityValue,
                quantity: this.state.quantity,
                partner_id: this.props.authUser.user.id,
                type_products: JSON.stringify(this.state.chosenProducts.map(p => p.id)),
                packages: JSON.stringify(this.state.chosenPackage.map(p => p.id)),
                commercial_operation_id: this.state.commercialOperatorId,
                description: this.state.description,
                image: this.state.image,
            };

            this.props.setRequestGlobalAction(true);
            createOffer(data, this.props.authUser.branchId, {fileData: ['image'], multipart: true})
                .then(() => {
                    NotificationManager.success("Paquetage créé avec succèss");
                    this.props.getComOffer(this.props.authUser.branchId);
                    this.props.history.push(COMMERCIAL_MANAGEMENT.COMMERCIAL_OFFER.LIST);
                })
                .catch(() => {
                    NotificationManager.error(ERROR_500);
                })
                .finally(() => this.props.setRequestGlobalAction(false));
        }
    };

    render() {
        const { productTypes, authUser, comOperationType, systemObject } = this.props;
        const { catalogSale, loadingProducts } = this.state;

        return (
            <div>
                <Form onSubmit={this.onSubmit}>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="name">
                                Désignation
                            </InputLabel>
                            <InputStrap
                                required
                                id="name"
                                name={'name'}
                                value={this.state.name}
                                className="has-input input-lg"
                                onChange={event => this.setState({name: event.target.value})}
                            />
                            <span className="has-icon"><i className="ti-pencil"></i></span>
                        </FormGroup>

                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="description">
                                Description
                            </InputLabel>
                            <InputStrap
                                required
                                id="description"
                                name={'description'}
                                value={this.state.description}
                                className="has-input input-lg"
                                onChange={event => this.setState({description: event.target.value})}
                            />
                            <span className="has-icon"><i className="ti-pencil"></i></span>
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="name">
                                Prix
                            </InputLabel>
                            <InputStrap
                                required
                                id="name"
                                type="number"
                                name={'name'}
                                value={this.state.price}
                                className="has-input input-lg"
                                onChange={event => this.setState({price: event.target.value})}
                            />
                            <span className="has-icon"><i className="ti-pencil"></i></span>
                        </FormGroup>

                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="quantity">
                                Quantité
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="quantity"
                                name={'quantity'}
                                value={this.state.quantity}
                                className="has-input input-lg"
                                onChange={event => this.setState({quantity: event.target.value})}
                            />
                            <span className="has-icon"><i className="ti-pencil"></i></span>
                        </FormGroup>
                    </div>

                    <div className="row">
                        <CustomAsyncComponent
                            loading={systemObject.timeUnit.loading}
                            data={systemObject.timeUnit.data}
                            component={data => (
                                <div className="col-md-6 col-sm-12 form-group text-left">
                                    <FormControl fullWidth>
                                        <InputLabel className="text-left" htmlFor="validityUnit-helper">
                                            Unité de temps
                                        </InputLabel>
                                        <Select
                                            value={this.state.validityUnit}
                                            onChange={event => this.setState({validityUnit: event.target.value})}
                                            input={<Input name="validityUnit" id="validityUnit-helper" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item} className="center-hor-ver">
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                        />

                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="validityValue">
                                Valeur
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="validityValue"
                                name={'validityValue'}
                                value={this.state.validityValue}
                                className="has-input input-lg"
                                onChange={event => this.setState({validityValue: event.target.value})}
                            />
                            <span className="has-icon"><i className="ti-pencil"></i></span>
                        </FormGroup>
                    </div>

                    <CustomAsyncComponent
                        loading={comOperationType.loading}
                        data={comOperationType.data}
                        component={data => (
                            <div className="form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="commercialOperatorId-helper">
                                        Opérateur commercial
                                    </InputLabel>
                                    <Select
                                        value={this.state.commercialOperatorId}
                                        onChange={event => this.setState({commercialOperatorId: event.target.value})}
                                        input={<Input name="commercialOperatorId" id="commercialOperatorId-helper" />}>
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

                    {loadingProducts ? (
                        <RctSectionLoader/>
                    ) : (
                        <>
                            <CustomList
                                loading={false}
                                // showSearch={false}
                                list={this.state.chosenProducts}
                                onAddClick={() => this.setState({showCreateBox: true})}
                                itemsFoundText={n => `${n} produit(s) sélectionné(s)`}
                                addPermissions={{
                                    permissions: [],
                                }}
                                renderItem={list => (
                                    <>
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
                                                                        <a href="#" className="text-danger" onClick={() => this.setState({showDeleteBox: true, deleteProduct: product})}>
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

                            <CustomList
                                loading={false}
                                // showSearch={false}
                                list={this.state.chosenPackage}
                                onAddClick={() => this.setState({showCreateBoxPackage: true})}
                                itemsFoundText={n => `${n} paquetage(s) sélectionné(s)`}
                                addPermissions={{
                                    permissions: [],
                                }}
                                renderItem={list => (
                                    <>
                                        {list && list.length === 0 ? (
                                            <div className="d-flex justify-content-center align-items-center py-50">
                                                <h4>
                                                    Aucun paquetages sélectionnés
                                                </h4>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-hover table-middle mb-0 text-center">
                                                    <thead>
                                                        <tr>
                                                            <th><IntlMessages id="components.name" /></th>
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
                                                                        <a href="#" className="text-danger" onClick={() => this.setState({showDeleteBoxPackage: true, deletePackage: product})}>
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

                            <FormGroup>
                                <InputLabel className="text-left" htmlFor="operatorEmail">
                                    Image
                                </InputLabel>
                                <Input
                                    id="File"
                                    type="file"
                                    name="file"
                                    onChange={event => this.setState({image: event.target.files[0]})}
                                />
                            </FormGroup>

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
                        </>
                    )}

                </Form>

                <AddProduct
                    show={this.state.showCreateBox}
                    products={this.state.storeProducts}
                    onSave={this.onAddProduct}
                    onClose={() => this.setState({showCreateBox: false})}
                />

                <AddPackage
                    show={this.state.showCreateBoxPackage}
                    products={this.state.storePackage}
                    onSave={this.onAddPackage}
                    onClose={() => this.setState({showCreateBoxPackage: false})}
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
                                onClick={() => this.setState({showDeleteBox: false})}
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

                <SweetAlert
                    type="danger"
                    show={this.state.showDeleteBoxPackage}
                    showCancel
                    showConfirm
                    title={"Confirmation"}
                    customButtons={(
                        <>
                            <Button
                                color="blue"
                                variant="outlined"
                                onClick={() => this.setState({showDeleteBoxPackage: false})}
                                className="text-white bg-blue font-weight-bold mr-3"
                            >
                                Non je ne veux pas
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                className="bg-danger text-white font-weight-bold"
                                onClick={this.onDeletePackage}
                            >
                                Oui je veux
                            </Button>
                        </>
                    )}
                    onConfirm={this.onDeletePackage}
                >
                    Etes-vous sur de vouloir supprimé ce paquetage ?
                </SweetAlert>

            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ requestGlobalLoader, productTypes, authUser, comOperationType, systemObject, packages }) => {
    return {
        requestGlobalLoader,
        loading: productTypes.loading,
        productTypes: productTypes.data,
        error: productTypes.error,
        authUser: authUser.data,
        comOperationType,
        systemObject,
        packages
    }
};

export default connect(mapStateToProps, {getComOffer, getPackages, getProductTypes, getComOperationType, getCatalogProducts, getSysTimeUnit, setRequestGlobalAction})
(injectIntl(Create));

const AddProduct = ({show, products, onSave, onClose}) => {

    // const [product, setProduct] = useState(products[0]);
    // const [quantity, setQuantity] = useState(1);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { control, register, errors, handleSubmit, setValue, watch} = useForm();

    const onSubmit = (data) => {
        const productId = data.product;
        if (productId === null || productId === undefined) {
            NotificationManager.error("Vous devez choisir un produit ou en créé un d'abord");
            return;
        }

        onSave(products.find(p => p.id === productId));
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
                                                as={<Select input={<Input name="representativePosition" id="representativePosition" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
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

const AddPackage = ({show, products, onSave, onClose}) => {

    // const [product, setProduct] = useState(products[0]);
    // const [quantity, setQuantity] = useState(1);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { control, register, errors, handleSubmit, setValue, watch} = useForm();

    const onSubmit = (data) => {
        const productId = data.product;
        if (productId === null || productId === undefined) {
            NotificationManager.error("Vous devez choisir un package ou en créé un d'abord");
            return;
        }

        onSave(products.find(p => p.id === productId));
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
                    Ajouté un nouveau paquetage
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
                                                Pquetage
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
                                                as={<Select input={<Input name="representativePosition" id="representativePosition" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={item.id} value={item.id} className="center-hor-ver">
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
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
