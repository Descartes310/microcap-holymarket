import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import AddAssociationToProduct from '../components/AddAssociationToProduct'
import { getProductNatures, getProductRanges, getSellWay } from 'Helpers/helpers';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import UserAccountTypeService from 'Services/account-types';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Update = (props) => {

    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [units, setUnits] = useState([]);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState(null);
    const [range, setRange] = useState(null);
    const [nature, setNature] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [sellWay, setSellWay] = useState(null);
    const [products, setProducts] = useState([]);
    const [saleUnit, setSaleUnit] = useState(null);
    const [category, setCategory] = useState(null);
    const [typeUnits, setTypeUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceUnit, setPriceUnit] = useState(null);
    const [description, setDescription] = useState('');
    const [saleTypeUnit, setSaleTypeUnit] = useState(null);
    const [sellerProfiles, setSellerProfiles] = useState([]);
    const [maximumByUser, setMaximumByUser] = useState(null);
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [showAddProductbox, setShowAddProductbox] = useState(false);
    const [associatedProducts, setAssociatedProducts] = useState([]);


    useEffect(() => {
        getTypes();
        getUnits();
        getProducts();
        getTypeUnits();
        getCategories();
    }, []);

    useEffect(() => {
        if(units.length > 0 && profiles.length > 0 && categories.length > 0 && products.length > 0) {
            findProductModel();
        }
    }, [units, profiles, categories, products]);

    const getCategories = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCategories()
            .then(response => setCategories(response))
            .finally(() => props.setRequestGlobalAction(false))
    }


    const findProductModel = () => {
        props.setRequestGlobalAction(true);
        ProductService.findDetailedProductModel(props.match.params.reference).then(response => {
            setLabel(response.label);
            setCode(response.code);
            setDescription(response.description);
            setPrice(response.price);
            setPriceUnit(units.find(u => u.reference == response.priceUnitReference));
            setMaximumByUser(response.maximumByUser);
            setSaleUnit(units.find(u => u.reference == response.saleUnitReference));
            if(response.saleUnitReference) {
                setSaleTypeUnit(units.find(u => u.reference == response.saleUnitReference).type);
            }
            setCategory(categories.find(c => c.id == response.categoryProduct.id));
            setSellWay(getSellWay().find(s => s.value == response.sellWay));
            setNature(getProductNatures().find(p => p.value == response.nature));
            setRange(getProductRanges().find(r => r.value == response.range));
            setSelectedProfiles(profiles.filter(p => response.buyerProfiles.includes(p.reference)));
            setSellerProfiles(profiles.filter(p => response.sellerProfiles.includes(p.reference)));
            setAssociatedProducts(response.fullAssociations.map(p => { return {product: products.find(product => product.reference == p.productReference) ?? {}, quantity: p.quantity, price: p.price} }));
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes()
        .then(response => {
            setProfiles(response.filter(at => at.show));
        }).finally(() => props.setRequestGlobalAction(false))
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({ types: ['PRODUCT', 'PACKAGE'] })
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits()
            .then((response) => setUnits(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const getTypeUnits = () => {
        props.setRequestGlobalAction(true);
        UnitService.getTypeUnits()
            .then((response) => setTypeUnits(response))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const addProductToPackage = (product, price, quantity) => {
        let association = {
            product,
            price,
            quantity
        }
        setAssociatedProducts([...associatedProducts, association]);
        setShowAddProductbox(false);
    }

    const removeProductToPackage = (product) => {
        setAssociatedProducts([...associatedProducts.filter(p => p.product.id !== product.id )]);
    }

    const getAvailableProducts = () => {
        return products.filter(p => !associatedProducts.map(ap => ap.product.id).includes(p.id));
    }

    const onSubmit = () => {
        if (
            !label ||
            !code ||
            !price ||
            !range ||
            !nature ||
            !category ||
            !description ||
            !sellWay ||
            !maximumByUser ||
            !priceUnit ||
            associatedProducts.length <= 0 ||
            selectedProfiles.length <= 0 ||
            sellerProfiles.length <= 0
        ) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data: any = {
            label, code, price, description, maximumByUser, sellWay: sellWay.value,
            priceUnitReference: priceUnit.reference, categoryId: category.id,
            nature: nature.value, range: range.value, type: 'PACKAGE',
            profiles: selectedProfiles.map(sp => sp.reference), seller_profiles: sellerProfiles.map(sp => sp.reference)
        }

        if (associatedProducts.length <= 0) {
            NotificationManager.error('Sélectionnez les produits à associer');
            return;
        }

        if(file) {
            data.image = file;
        }

        if(saleUnit) {
            data.sale_unit_reference = saleUnit.reference;
        }

        data.associatedIds = associatedProducts.map(ap => ap.product.id);
        data.quantities_for_package = associatedProducts.map(ap => ap.quantity);
        data.prices_for_package = associatedProducts.map(ap => ap.price);

        props.setRequestGlobalAction(true);
        ProductService.updateProductModel(props.match.params.reference, data, { fileData: ['image'], multipart: true })
            .then(() => {
                NotificationManager.success('Le package a été édité avec succès !');
                props.history.push(MARKETPLACE.MODEL.PACKAGE.LIST);
            })
            .catch(err => {
                console.log(err);
                NotificationManager.error('Une erreur est survenu lors de la mise à jour du package !');
            }).finally(() => {
                props.setRequestGlobalAction(false);
            });
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit} className="pt-20">
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Nom du package
                            </InputLabel>
                            <InputStrap
                                required
                                id="label"
                                type="text"
                                name='label'
                                className="input-lg"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="code">
                                Code package
                            </InputLabel>
                            <InputStrap
                                required
                                id="code"
                                type="text"
                                name='code'
                                className="input-lg"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="description">
                            Description package
                        </InputLabel>
                        <InputStrap
                            required
                            id="description"
                            type="textarea"
                            name='description'
                            className="input-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Prix unitaire par défaut
                            </InputLabel>
                            <InputStrap
                                required
                                id="price"
                                type="number"
                                name='price'
                                className="input-lg"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Devise
                            </InputLabel>
                            <Autocomplete
                                value={priceUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setPriceUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="maxByUser">
                                Nombre max. par membre
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="maxByUser"
                                name='maxByUser'
                                className="input-lg"
                                value={maximumByUser}
                                onChange={(e) => setMaximumByUser(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Type d'unité
                            </InputLabel>
                            <Autocomplete
                                options={typeUnits}
                                value={saleTypeUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setSaleTypeUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Unité
                            </InputLabel>
                            <Autocomplete
                                value={saleUnit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setSaleUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => u.type.id === saleTypeUnit?.id)}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="title">
                            Image du package
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner l'image de votre package ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Catégorie du package
                            </InputLabel>
                            <Autocomplete
                                value={category}
                                options={categories}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setCategory(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Profiles autorisées à acheter
                            </InputLabel>
                            <Autocomplete
                                multiple
                                options={profiles}
                                id="combo-box-demo"
                                value={selectedProfiles}
                                onChange={(__, items) => {
                                    setSelectedProfiles(items);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Profiles autorisées à vendre
                            </InputLabel>
                            <Autocomplete
                                multiple
                                options={profiles}
                                value={sellerProfiles}
                                id="combo-box-demo"
                                onChange={(__, items) => {
                                    setSellerProfiles(items);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Canal de vente
                            </InputLabel>
                            <Autocomplete
                                value={sellWay}
                                options={getSellWay()}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setSellWay(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Nature du package
                            </InputLabel>
                            <Autocomplete
                                value={nature}
                                id="combo-box-demo"
                                options={getProductNatures()}
                                onChange={(__, item) => {
                                    setNature(item)
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Portée du package
                            </InputLabel>
                            <Autocomplete
                                value={range}
                                id="combo-box-demo"
                                options={getProductRanges()}
                                onChange={(__, item) => {
                                    setRange(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </div>

                    <CustomList
                        loading={false}
                        list={associatedProducts}
                        addText={'Ajouter un produits au package'}
                        onAddClick={() => setShowAddProductbox(true)}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucun produit ajouté
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Désignation</th>
                                                    <th className="fw-bold">Code</th>
                                                    <th className="fw-bold">Prix</th>
                                                    <th className="fw-bold">Quantité</th>
                                                    <th className="fw-bold">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{ item.product.label }</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{ item.product.code }</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{ item.price }</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold text-dark">{ item.quantity }</h4>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td onClick={() => removeProductToPackage(item.product)}>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <h4 className="m-0 fw-bold" style={{ color: 'red' }}>Rétirer</h4>
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
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Enregistrer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>

            <AddAssociationToProduct
                show={showAddProductbox}
                onSave={addProductToPackage}
                products={getAvailableProducts()}
                onClose={() => setShowAddProductbox(false)}
            />
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));