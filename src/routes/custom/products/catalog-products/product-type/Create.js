import React, { useEffect, useState } from 'react';
import { Form, FormGroup } from "reactstrap";
import InputComponent from "Components/InputComponent";
import Button from "@material-ui/core/Button";
import SweetAlert from 'react-bootstrap-sweetalert';
import { useForm } from "react-hook-form";
import IntlMessages from "Util/IntlMessages";
import { injectIntl } from 'react-intl';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {
    setRequestGlobalAction,
    createCatalog,
    getCategoryProducts,
    createCategoryProducts,
    getCatalogsOfOneType,
    getSysProductNature,
    getRootProductType,
    getUnitTypes,
    getUnitbyType,
    getAccountsByUnit
} from "Actions";
import { NotificationManager } from "react-notifications";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { connect } from "react-redux";

import CustomList from "Components/CustomList";
// Material
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Product from "Enums/Product";
import CustomAsyncComponent from "Components/CustomAsyncComponent";
import { createProductType, getCurrencies } from "Actions/independentActions";
import { getProductTypes } from "Actions/GeneralActions";
import { ERROR_500 } from "Constants/errors";
import { PRODUCT_TYPE } from "Url/frontendUrl";

const CategoryProductsCreate = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { categoryProducts, catalogTypes, authUser, catalog, loading, intl, onClose, show, setRequestGlobalAction, getCatalogsOfOneType, getCategoryProducts, getProductTypes, systemObject, getSysProductNature } = props;

    const [rootProductType, setRootProductType] = useState({
        loading: true,
        data: null
    });

    const [products, setProducts] = useState(props.productTypes);
    const [chosenProducts, setChosenProducts] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [showCreateBox, setShowCreateBox] = useState(false);
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [units, setUnits] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [file, setFile] = useState(null);
    const [accountsAdd, setAccountsAdd] = useState([]);

    const { control, register, errors, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            isAvailable: false,
            isDefaultPfm: false,
            isDefaultMember: false,
            isAccount: false,
            isNegativeBalance: false,
            isAggregation: false
        }
    });

    const isAvailableWatch = watch('isAvailable');
    const isAccountWatch = watch('isAccount');
    const isNegativeBalanceWatch = watch('isNegativeBalance');
    const isAggregationWatch = watch('isAggregation');
    const isDefaultPfmWatch = watch('isDefaultPfm');
    const isDefaultMemberWatch = watch('isDefaultMember');

    useEffect(() => {
        fetchCategoryProducts();
        fetchCatalogTypes();
        fetchUnitType();
        fetchSysProductNature();
        fetchCurrencies();
        if (!authUser.isExploitant())
            fetchRootProductType();
    }, []);

    useEffect(() => {
        if (type)
            if (type.id != 0)
                fetchUnits(type.id);
            else
                setUnits(currencies)
    }, [type]);

    /**
     * On submit
     */
    const onSubmit = (data) => {

        const _data = { ...data };

        if (_data.price_currency == null || _data.price_currency + "".length <= 1) {
            NotificationManager.error("Selectionner une devise");
            return;
        }

        if (_data.isAccount) {
            if (_data.minBalance == null || _data.maxBalance == null) {
                NotificationManager.error("Le planché et le plafond sont obligatoire");
                return;
            }
            if (!_data.isNegativeBalance && _data.minBalance < 0) {
                NotificationManager.error("Le planché ne peut pas être inférieur à 0");
                return;
            }

            if (_data.minBalance >= _data.maxBalance) {
                NotificationManager.error("Le planché ne peut pas être supérieur au plafond");
                return;
            }
        }

        setRequestGlobalAction(true);

        if (type != null)
            if (type.id == 0) {
                _data.currency = currencies.filter(c => c.id == _data.unit_id)[0].code;
                delete _data.unit_id;
            } else {
                delete _data.currency;
            }
        else {
            delete _data.unit_id;
            delete _data.currency;
            _data.is_negative_balance = false;
            _data.is_aggregation = false;
        }


        _data.organisationId = authUser.id;

        _data.image = file;

        _data.type_products = JSON.stringify(chosenProducts.map(p => p.id));

        if (isAggregationWatch)
            _data.aggragated_products = JSON.stringify(accountsAdd.map(p => p.id));

        if (!isAvailableWatch)
            delete _data.productAvailability;

        createProductType(_data, authUser.user.branch.id, { fileData: ['image'], multipart: true })
            .then(() => {
                NotificationManager.success("Type de produits créée avec succès");
                getProductTypes(authUser.user.branch.id);
                props.history.push(PRODUCT_TYPE.LIST)
            })
            .catch((error) => {
                NotificationManager.error("Une erreur est survenue");
            })
            .finally(() => setRequestGlobalAction(false));
    };

    const fetchCatalogTypes = () => {
        getCatalogsOfOneType(Product.PRODUCT, authUser.user.branch.id);
    };

    const fetchCategoryProducts = () => {
        getCategoryProducts(authUser.user.branch.id);
    };

    const fetchSysProductNature = () => {
        getSysProductNature();
    };

    const changeAccount = (item, adding) => {
        if (adding) {
            setAccounts(accounts.filter(a => a.id != item.id));
            setAccountsAdd([item, ...accountsAdd]);
        } else {
            setAccountsAdd(accountsAdd.filter(a => a.id != item.id));
            setAccounts([item, ...accounts]);
        }
    };

    const fetchRootProductType = () => {
        getRootProductType(authUser.branchId)
            .then(result => {
                setRootProductType({
                    loading: false,
                    data: result
                })
            })
            .catch(() => {
                setRootProductType({
                    loading: false,
                    data: null
                })
            })
    };

    const fetAccountsByUnit = (id) => {
        getAccountsByUnit(id)
            .then(result => {
                setAccounts(result);
                setAccountsAdd([]);
            })
            .catch(() => {
                setAccounts([]);
                setAccountsAdd([]);
            })
    };

    const fetchCurrencies = () => {
        getCurrencies()
            .then(result => {
                setCurrencies(result)
            });
    };

    const fetchUnitType = () => {
        getUnitTypes()
            .then(result => {
                setTypes(result)
            });
    };

    const fetchUnits = (id) => {
        getUnitbyType(id)
            .then(result => {
                setUnits(result)
            });
    };

    const onAddProduct = (product) => {
        setChosenProducts([...chosenProducts, { ...product }]);
        setShowCreateBox(false);
        setProducts(products.filter(p => p.id !== product.id));
    };

    const onDeleteProduct = () => {
        setProducts([...products, deleteProduct]);
        setShowCreateBox(false);
        setChosenProducts(chosenProducts.filter(p => p.id !== deleteProduct.id));
    };

    return (
        <>

            <div>
                <h1 style={{
                    marginBottom: '3%'
                }}>Création d'un type de produit</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    {!authUser.isExploitant() && (
                        <CustomAsyncComponent
                            loading={rootProductType.loading}
                            data={rootProductType.data}
                            onRetryClick={fetchRootProductType}
                            component={data => (
                                <div className="form-group text-left">
                                    <FormControl fullWidth>
                                        <InputLabel className="text-left" htmlFor="nature-helper">
                                            Racine du produit
                                                </InputLabel>
                                        <InputComponent
                                            isRequired
                                            className="mt-0"
                                            errors={errors}
                                            control={control}
                                            register={register}
                                            componentType="select"
                                            name={'parent_type'}
                                            defaultValue={data[0] ? data[0].id : undefined}
                                            as={<Select input={<Input name="nature" id="nature-helper" />}>
                                                {data.map((item, index) => (
                                                    <MenuItem key={index} value={item.id} className="">
                                                        {item.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>}
                                        />
                                    </FormControl>
                                </div>
                            )}
                        />
                    )}

                    <div className="row align-items-center">
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="designation">
                                    Code
                                        </InputLabel>
                                <InputComponent
                                    id="designation"
                                    isRequired
                                    errors={errors}
                                    register={register}
                                    name={'code'}
                                    className="input-lg"
                                // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                />
                                {/* <span className="has-icon"><i className="ti-pencil" /></span> */}
                            </FormGroup>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="designation">
                                    Nom
                                        </InputLabel>
                                <InputComponent
                                    id="designation"
                                    isRequired
                                    errors={errors}
                                    register={register}
                                    name={'label'}
                                    className="input-lg"
                                // placeholder={intl.formatMessage({id: "common.commercialName"})}
                                />
                                {/* <span className="has-icon"><i className="ti-pencil" /></span> */}
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-12 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="description">
                                    <IntlMessages id="widgets.description" />
                                </InputLabel>
                                <InputComponent
                                    id="description"
                                    isRequired
                                    errors={errors}
                                    register={register}
                                    name={'description'}
                                    className="input-lg"
                                />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-8 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="max_user_product">
                                    Nombre max par utilisateur
                                </InputLabel>
                                <InputComponent
                                    id="max_user_product"
                                    isRequired
                                    type='number'
                                    errors={errors}
                                    register={register}
                                    name={'max_user_product'}
                                    className="input-lg"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <FormGroup>
                                <InputLabel className="text-left">
                                    Image du produit
                                </InputLabel>
                                <Input
                                    id="File"
                                    type="file"
                                    name="avatar"
                                    onChange={event => setFile(event.target.files[0])}
                                />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="defaultPrice">
                                    Prix par defaut
                                </InputLabel>
                                <InputComponent
                                    id="defaultPrice"
                                    errors={errors}
                                    register={register}
                                    name={'defaultPrice'}
                                    className="input-lg"
                                    type='number'
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <CustomAsyncComponent
                                loading={false}
                                data={currencies}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="currency-helper">
                                                Devise
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'price_currency'}
                                                defaultValue={data[0]}
                                                as={<Select input={<Input name="price_currency" id="currency-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.code} className="">
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-4 col-sm-12">
                            <FormControl fullWidth>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    id="isAccount"
                                    name={'isAccount'}
                                    // defaultValue={data[0]}
                                    as={<FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={isAccountWatch}
                                            onChange={() => setValue('isAccount', !isAccountWatch)}
                                        />
                                    } label={"Associer une unité de compte"}
                                    />}
                                />
                            </FormControl>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CustomAsyncComponent
                                loading={false}
                                data={[{ name: 'Devise', id: 0 }, ...types]}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="currency-helper">
                                                Type d'unité
                                            </InputLabel>
                                            <Select onChange={e => setType(e.target.value)} disabled={!isAccountWatch}>
                                                {[{ name: 'Devise', id: 0 }, ...types].map(item => (
                                                    <MenuItem key={item.id} value={item} className="">
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <CustomAsyncComponent
                                loading={false}
                                data={units}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="currency-helper">
                                                Unité de compte
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                disabled={!isAccountWatch}
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'unit_id'}
                                                defaultValue={data[0]}
                                                as={<Select input={<Input name="unit_id" id="currency-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} onClick={() => fetAccountsByUnit(item.value != null && item.decimal != null ? null : item.id)} className="">
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    {
                        isAccountWatch ?

                            <div className="row align-items-center">
                                <div className="col-md-4 col-sm-12">
                                    <FormControl fullWidth>
                                        <InputComponent
                                            isRequired
                                            className="mt-0"
                                            errors={errors}
                                            control={control}
                                            register={register}
                                            componentType="select"
                                            id="isNegativeBalance"
                                            name={'isNegativeBalance'}
                                            // defaultValue={data[0]}
                                            as={<FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={isNegativeBalanceWatch}
                                                    onChange={() => setValue('isNegativeBalance', !isNegativeBalanceWatch)}
                                                />
                                            } label={"Autoriser les soldes négatifs"}
                                            />}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="min">
                                            Plancher du compte
                                        </InputLabel>
                                        <InputComponent
                                            id="min"
                                            errors={errors}
                                            min={!isNegativeBalanceWatch ? 0 : null}
                                            register={register}
                                            name={'minBalance'}
                                            className="input-lg"
                                            type='number'
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <FormGroup className="has-wrapper">
                                        <InputLabel className="text-left" htmlFor="max">
                                            Plafond du compte
                                        </InputLabel>
                                        <InputComponent
                                            id="max"
                                            errors={errors}
                                            register={register}
                                            name={'maxBalance'}
                                            className="input-lg"
                                            type='number'
                                        />
                                    </FormGroup>
                                </div>
                            </div> : null
                    }

                    {
                        isAccountWatch ?
                            <div className="row align-items-center">
                                <div className="col-md-4 col-sm-12">
                                    <FormControl fullWidth>
                                        <InputComponent
                                            isRequired
                                            className="mt-0"
                                            errors={errors}
                                            control={control}
                                            register={register}
                                            componentType="select"
                                            id="isAggregation"
                                            name={'isAggregation'}
                                            // defaultValue={data[0]}
                                            as={<FormControlLabel control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={isAggregationWatch}
                                                    onChange={() => setValue('isAggregation', !isAggregationWatch)}
                                                />
                                            } label={"Agrégation de compteurs"}
                                            />}
                                        />
                                    </FormControl>
                                </div>
                            </div> : null
                    }
                    {
                        isAggregationWatch ?
                            <RctCollapsibleCard>
                                <h3>Sélectionnez les comptes</h3>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginTop: 50
                                }}>
                                    <div style={{ flex: 1, marginRight: 10 }}>
                                        <h3>Liste des comptes</h3>
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th><IntlMessages id="widgets.action" /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {accounts && accounts.map((account, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{account.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3 bg-blue"}
                                                                        onClick={() => changeAccount(account, true)}
                                                                    >
                                                                        Ajouter
                                                                        <i className="zmdi zmdi-arrow-right mr-2" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ flex: 1, marginLeft: 10 }}>
                                        <h3>Comptes agrégés</h3>
                                        <table className="table table-hover table-middle mb-0 text-center">
                                            <thead>
                                                <tr>
                                                    <th><IntlMessages id="components.name" /></th>
                                                    <th><IntlMessages id="widgets.action" /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {accountsAdd && accountsAdd.map((account, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{account.label}</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <Button
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="contained"
                                                                        className={"text-white font-weight-bold mr-3 bg-red"}
                                                                        onClick={() => changeAccount(account, false)}
                                                                    >
                                                                        <i className="zmdi zmdi-arrow-left mr-2" />
                                                                        Retirer
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </RctCollapsibleCard>
                            : null
                    }

                    <InputLabel className="text-left" style={{ fontWeight: 'bold' }} htmlFor="currency-helper">
                        Associer des produits par défaut
                    </InputLabel>
                    <CustomList
                        loading={false}
                        // showSearch={false}
                        list={chosenProducts}
                        onAddClick={() => setShowCreateBox(true)}
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
                                                                        <a href="#" className="text-danger" onClick={() => { setShowDeleteBox(true); setDeleteProduct(product); }}>
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

                    <CustomAsyncComponent
                        loading={systemObject.productNature.loading}
                        data={systemObject.productNature.data}
                        onRetryClick={fetchSysProductNature}
                        component={data => (
                            <div className="form-group text-left">
                                <FormControl fullWidth>
                                    <InputLabel className="text-left" htmlFor="nature-helper">
                                        Nature du produit
                                            </InputLabel>
                                    <InputComponent
                                        isRequired
                                        className="mt-0"
                                        errors={errors}
                                        control={control}
                                        register={register}
                                        componentType="select"
                                        name={'nature'}
                                        defaultValue={data[0]}
                                        as={<Select input={<Input name="nature" id="nature-helper" />}>
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item} className="">
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>}
                                    />
                                </FormControl>
                            </div>
                        )}
                    />

                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <FormControl fullWidth>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    id="isAvailable"
                                    name={'isAvailable'}
                                    // defaultValue={data[0]}
                                    as={<FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={isAvailableWatch}
                                            onChange={() => setValue('isAvailable', !isAvailableWatch)}
                                        />
                                    } label={"Disponible ?"}
                                    />}
                                />
                            </FormControl>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <FormControl fullWidth>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    id="isDefaultPfm"
                                    name={'isDefaultPfm'}
                                    // defaultValue={data[0]}
                                    as={<FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={isDefaultPfmWatch}
                                            onChange={() => setValue('isDefaultPfm', !isDefaultPfmWatch)}
                                        />
                                    } label={"Par defaut pour ?"}
                                    />}
                                />
                            </FormControl>
                        </div>

                        <div className="col-md-4 col-sm-6">
                            <FormControl fullWidth>
                                <InputComponent
                                    isRequired
                                    className="mt-0"
                                    errors={errors}
                                    control={control}
                                    register={register}
                                    componentType="select"
                                    id="isDefaultMember"
                                    name={'isDefaultMember'}
                                    // defaultValue={data[0]}
                                    as={<FormControlLabel control={
                                        <Checkbox
                                            color="primary"
                                            checked={isDefaultMemberWatch}
                                            onChange={() => setValue('isDefaultMember', !isDefaultMemberWatch)}
                                        />
                                    } label={"Par defaut pour membre ?"}
                                    />}
                                />
                            </FormControl>
                        </div>
                    </div>
                    
                    <div className="row mt-10">
                        <div className="col-md-6 col-sm-12">
                            <CustomAsyncComponent
                                loading={categoryProducts.loading}
                                data={categoryProducts.data}
                                onRetryClick={fetchCategoryProducts}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="categoryProductId-helper">
                                                Categorie produit
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'categoryProductId'}
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="categoryProductId" id="categoryProductId-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="">
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            /></div>
                        <div className="col-md-6 col-sm-12">
                            <CustomAsyncComponent
                                loading={catalogTypes.loading}
                                data={catalogTypes.data}
                                onRetryClick={fetchCatalogTypes}
                                component={data => (
                                    <div className="form-group text-left">
                                        <FormControl fullWidth>
                                            <InputLabel className="text-left" htmlFor="catalogId-helper">
                                                Catalogue produit
                                            </InputLabel>
                                            <InputComponent
                                                isRequired
                                                className="mt-0"
                                                errors={errors}
                                                control={control}
                                                register={register}
                                                componentType="select"
                                                name={'catalogId'}
                                                defaultValue={data[0] ? data[0].id : undefined}
                                                as={<Select input={<Input name="catalogId" id="catalogId-helper" />}>
                                                    {data.map((item, index) => (
                                                        <MenuItem key={index} value={item.id} className="">
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
                    </div>
                    <FormGroup className="mb-15">
                        <Button
                            // type="submit"
                            color="primary"
                            disabled={loading}
                            variant="contained"
                            className="text-white font-weight-bold mr-3"
                            onClick={handleSubmit(onSubmit)}
                        >
                            <IntlMessages id="button.submit" />
                        </Button>
                    </FormGroup>
                </Form>
                <AddProduct
                    show={showCreateBox}
                    products={products}
                    onSave={onAddProduct}
                    onClose={() => setShowCreateBox(false)}
                />

                <SweetAlert
                    type="danger"
                    show={showDeleteBox}
                    showCancel
                    showConfirm
                    title={"Confirmation"}
                    customButtons={(
                        <>
                            <Button
                                color="blue"
                                variant="outlined"
                                onClick={() => setShowDeleteBox(false)}
                                className="text-white bg-blue font-weight-bold mr-3"
                            >
                                Non je ne veux pas
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                className="bg-danger text-white font-weight-bold"
                                onClick={onDeleteProduct}
                            >
                                Oui je veux
                            </Button>
                        </>
                    )}
                    onConfirm={onDeleteProduct}
                >
                    Etes-vous sur de vouloir supprimé ce produit ?
                </SweetAlert>
            </div>
            {/* </DialogContent>
            </Dialog> */}
        </>
    );
};

const mapStateToProps = ({ requestGlobalLoader, authUser, catalogTypes, categoryProducts, systemObject, productTypes }) => {
    return {
        loading: requestGlobalLoader, authUser: authUser.data, catalogTypes: catalogTypes, categoryProducts: categoryProducts, systemObject,
        productTypes: productTypes.data,
    };
};

export default connect(mapStateToProps, { getProductTypes, getCategoryProducts, getCatalogsOfOneType, getSysProductNature, setRequestGlobalAction })(injectIntl(CategoryProductsCreate));

const AddProduct = ({ show, products, onSave, onClose }) => {

    // const [product, setProduct] = useState(products[0]);
    // const [quantity, setQuantity] = useState(1);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { control, register, errors, handleSubmit, setValue, watch } = useForm();

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
                                                        <MenuItem key={item.id} value={item.id} className="">
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