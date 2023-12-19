import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import UserAccountTypeService from 'Services/account-types';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { getProductNatures, getProductRanges, getSellWay } from 'Helpers/helpers';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Create = (props) => {

    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [units, setUnits] = useState([]);
    const [label, setLabel] = useState('');
    // const [lines, setLines] = useState(null);
    const [price, setPrice] = useState(null);
    const [range, setRange] = useState(null);
    const [nature, setNature] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [sellWay, setSellWay] = useState(null);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [saleUnit, setSaleUnit] = useState(null);
    const [typeUnits, setTypeUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priceUnit, setPriceUnit] = useState(null);
    const [isAccount, setIsAccount] = useState(false);
    const [description, setDescription] = useState('');
    const [specialType, setSpecialType] = useState(null);
    const [accountUnit, setAccountUnit] = useState(null);
    const [saleTypeUnit, setSaleTypeUnit] = useState(null);
    const [maximumByUser, setMaximumByUser] = useState(null);
    const [isAggregation, setIsAggregation] = useState(false);
    const [accountTypeUnit, setAccountTypeUnit] = useState(null);
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [userAccountType, setUserAccountType] = useState(null);
    const [isMirrorAccount, setIsMirrorAccount] = useState(false);
    const [minAccountbalance, setMinAccountBalance] = useState(null);
    const [maxAccountBalance, setMaxAccountBalance] = useState(null);
    const [associatedProducts, setAssociatedProducts] = useState([]);
    const [aggregationProducts, setAggregationProducts] = useState([]);
    const [transactionalPageCount, setTransactionalPageCount] = useState(null);
    const [hasComplementaryProducts, setHasComplementaryProducts] = useState(null);

    useEffect(() => {
        getUnits();
        getTypes();
        getProducts();
        getTypeUnits();
        getCategories();
    }, []);

    const getCategories = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCategories()
            .then(response => setCategories(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes()
        .then(response => {
            setProfiles(response);
        }).finally(() => props.setRequestGlobalAction(false))
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({types: ['PRODUCT', 'PACKAGE']})
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

    const onSubmit = () => {
        if (
            !label ||
            !code ||
            !file ||
            !price ||
            !range ||
            !nature ||
            !category ||
            !sellWay ||
            !description ||
            !maximumByUser ||
            !priceUnit ||
            selectedProfiles.length <= 0
        ) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data: any = {
            label, code, price, description, maximumByUser, sellWay: sellWay.value,
            priceUnitReference: priceUnit.reference, categoryId: category.id,
            image: file, nature: nature.value, range: range.value, type: 'PRODUCT',
            profiles: selectedProfiles.map(sp => sp.reference)
        }

        if (specialType?.value == 'PASS' && !userAccountType) {
            NotificationManager.error('Un type de compte est nécessaire');
            return;
        }

        // if(lines) data.lines = lines;

        if (isAccount || ['TRANSACTION_BOOK'].includes(specialType?.value)) {
            
            if (!minAccountbalance || !maxAccountBalance || !accountUnit) {
                NotificationManager.error('Les détails du compte sont invalides');
                return;
            }

            data.minBalance = minAccountbalance;
            data.maxBalance = maxAccountBalance;
            data.mirrorAccount = isMirrorAccount;
            data.accountUnitReference = accountUnit.reference;
        }

        if(specialType) {
            data.specialType = specialType.value;
            if(specialType?.value == 'PASS') {
                data.userAccountTypeReference = userAccountType.reference
            }
            if(specialType?.value == 'TRANSACTION_BOOK') {
                data.isAggregation = true;
                data.numberOfJournals = transactionalPageCount;
                data.aggregationIds = aggregationProducts.map(ap => ap.id);
            }
        }

        if(isAggregation) { 
            data.isAggregation = isAggregation;
            if(aggregationProducts.length > 0) {
                data.aggregationIds = aggregationProducts.map(ap => ap.id);
            }
        }

        if(hasComplementaryProducts) {
            if(associatedProducts.length <= 0) {
                NotificationManager.error('Sélectionnez les produits à associer');
                return;
            }
            data.associatedIds = associatedProducts.map(ap => ap.id);
        }

        if(saleTypeUnit) {
            data.sale_unit_reference = saleTypeUnit.reference;
        }

        //console.log(data);

        props.setRequestGlobalAction(true);
        ProductService.createProductModel(data, { fileData: ['image'], multipart: true })
        .then(() => {
            NotificationManager.success('Le modèle a été crée avec succès !');
            props.history.push(MARKETPLACE.MODEL.PRODUCT.LIST);
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error('Une erreur est survenu lors de la création du modèle !');
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit} className="pt-20">
                    <div className="row">
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="label">
                                Nom du produit
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="code">
                                Code produit
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
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Type produit
                            </InputLabel>
                            <Autocomplete
                                value={specialType}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setSpecialType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={[
                                    {
                                        label: "Pas de type spécial", value: 'NONE'
                                    }, {
                                        label: "Djangui Plan", value: "CODEV"
                                    }, {
                                        label: "Deal Plan", value: "CODEV_DEAL_PLAN"
                                    }, {
                                        label: "Pass MicroCap", value: "PASS"
                                    }, {
                                        label: "Carnet transactionnel", value: "TRANSACTION_BOOK"
                                    }
                                ]}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>
                    { specialType?.value == 'PASS' && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Profile utilisateur associé
                            </InputLabel>
                            <Autocomplete
                                options={profiles}
                                value={userAccountType}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setUserAccountType(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}
                    <div className="row">
                        <FormGroup className='col-md-12 col-sm-12 has-wrapper'>
                            <InputLabel className="text-left" htmlFor="description">
                                Description produit
                            </InputLabel>
                            <InputStrap
                                required
                                id="description"
                                type="text"
                                name='description'
                                className="input-lg"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>
                        {/* {
                            specialType?.value == 'CODEV_DEAL_PLAN' && (
                                <FormGroup className={`col-md-6 col-sm-12 has-wrapper`}>
                                    <InputLabel className="text-left" htmlFor="lines">
                                        Nombre de ligne groupée par lot
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        id="lines"
                                        value={lines}
                                        name='lines'
                                        type="number"
                                        className="input-lg"
                                        onChange={(e) => setLines(e.target.value)}
                                    />
                                </FormGroup>
                            )
                        } */}
                        {
                            specialType?.value == 'TRANSACTION_BOOK' && (
                                <>
                                    <FormGroup className={`col-md-6 col-sm-12 has-wrapper`}>
                                        <InputLabel className="text-left" htmlFor="journals">
                                            Nombre de journaux
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            id="journals"
                                            name='lines'
                                            type="number"
                                            className="input-lg"
                                            value={transactionalPageCount}
                                            onChange={(e) => setTransactionalPageCount(e.target.value)}
                                        />
                                    </FormGroup>
                                    <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Sélectionnez le type de compte constitutif
                                        </InputLabel>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            value={aggregationProducts[0]}
                                            options={products.filter(p => p.account)}
                                            onChange={(__, item) => {
                                                setAggregationProducts([item]);
                                            }}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </div>
                                </>
                            )
                        }
                    </div>
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
                            Image du produit
                        </InputLabel>
                        <FileUploader
                            classes="mw-100"
                            label="Sélectionner l'image de votre produit ici"
                            handleChange={(file) => {
                                setFile(file);
                            }} name="file" types={fileTypes} />
                    </FormGroup>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Catégorie du produit
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
                                Profiles autorisées
                            </InputLabel>
                            <Autocomplete
                                multiple
                                options={profiles}
                                value={selectedProfiles}
                                id="combo-box-demo"
                                onChange={(__, items) => {
                                    setSelectedProfiles(items);
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
                                Nature du produit
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
                                Portée du produit
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
                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                onChange={() => setIsAccount(!isAccount)}
                                disabled={['TRANSACTION_BOOK'].includes(specialType?.value)}
                                checked={isAccount || ['TRANSACTION_BOOK'].includes(specialType?.value)}
                            />
                        } label={'Associer le produit a une unité de décompte'}
                        />
                    </FormGroup>
                    {(isAccount || ['TRANSACTION_BOOK'].includes(specialType?.value)) && (
                        <>
                            <div className="row">
                                <div className="col-md-3 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Type d'unité
                                    </InputLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={typeUnits}
                                        value={accountTypeUnit}
                                        onChange={(__, item) => {
                                            setAccountTypeUnit(item);
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Unité du compte
                                    </InputLabel>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        onChange={(__, item) => {
                                            setAccountUnit(item);
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        options={units.filter(u => u.type.id === accountTypeUnit?.id)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Plancher du compte
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        type="number"
                                        className="input-lg"
                                        id="minAccountBalance"
                                        name='minAccountBalance'
                                        value={minAccountbalance}
                                        onChange={(e) => setMinAccountBalance(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Plafond du compte
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        id="maxAccountBalance"
                                        type="number"
                                        name='maxAccountBalance'
                                        className="input-lg"
                                        value={maxAccountBalance}
                                        onChange={(e) => setMaxAccountBalance(e.target.value)}
                                    />
                                </div>
                            </div>
                            <FormGroup className="col-sm-12 has-wrapper">
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                        checked={isMirrorAccount}
                                        onChange={() => setIsMirrorAccount(!isMirrorAccount)}
                                    />
                                } label={'Marquer comme compte mirroir'}
                                />
                            </FormGroup>

                            { !['TRANSACTION_BOOK'].includes(specialType?.value) && (
                                <div>
                                    <FormGroup className="col-sm-12 has-wrapper">
                                        <FormControlLabel control={
                                            <Checkbox
                                                color="primary"
                                                onChange={() => setIsAggregation(!isAggregation)}
                                                checked={isAggregation}
                                            />
                                        } label={'Compte de consolidation'}
                                        />
                                    </FormGroup>
                                    {
                                        isAggregation && (
                                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                                <InputLabel className="text-left">
                                                    Sélectionnez les comptes à consolider
                                                </InputLabel>
                                                <Autocomplete
                                                    multiple
                                                    id="combo-box-demo"
                                                    value={aggregationProducts}
                                                    options={products.filter(p => p.account)}
                                                    onChange={(__, items) => {
                                                        setAggregationProducts(items)
                                                    }}
                                                    getOptionLabel={(option) => option.label}
                                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                        </>
                    )}

                    <FormGroup className="col-sm-12 has-wrapper">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={hasComplementaryProducts}
                                onChange={() => setHasComplementaryProducts(!hasComplementaryProducts)}
                            />
                        } label={'Associer des produits complémentaires'}
                        />
                    </FormGroup>

                    {
                        hasComplementaryProducts && (
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Sélectionnez les produits à associer
                                </InputLabel>
                                <Autocomplete
                                    multiple
                                    options={products}
                                    id="combo-box-demo"
                                    value={associatedProducts}
                                    onChange={(__, items) => {
                                        setAssociatedProducts(items)
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>
                        )
                    }
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));