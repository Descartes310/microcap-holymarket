import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getProductRanges } from 'Helpers/helpers';
import TextField from '@material-ui/core/TextField';
import CommercialService from 'Services/commercials';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Create = (props) => {

    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState(null);
    const [range, setRange] = useState(null);
    const [group, setGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [description, setDescription] = useState('');
    const [isIndirectSell, setIsIndirectSell] = useState(false);
    const [commercialOffer, setCommercialOffer] = useState(null);
    const [commercialOffers, setCommercialOffers] = useState([]);
    const [maximumDaysToPay, setMaximumDaysToPay] = useState(null);
    const [acceptManyPayment, setAcceptManyPayment] = useState(false);
    const [minimalPercentageForFirstPayment, setMinimalPercentageForFirstPayment] = useState(null);

    useEffect(() => {
        getGroups();
        getProducts();
        getCommercialOffers();
    }, []);

    useEffect(() => {
        if (product) {
            setLabel(product.label);
            setCode(product.code);
            setPrice(product.price);
            setDescription(product.description);
            setRange(getProductRanges().find(pr => pr.value === product.range));
        }
    }, [product]);

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModelAvailables()
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getGroups = () => {
        props.setRequestGlobalAction(true),
            GroupService.getCommunityDatas({ belongs: true })
                .then(response => setGroups(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    const getCommercialOffers = () => {
        props.setRequestGlobalAction(true);
        CommercialService.getCommercialOffers(true)
            .then(response => setCommercialOffers(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if (
            !label ||
            !code ||
            !price ||
            !range ||
            !description ||
            !product ||
            !commercialOffer
        ) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        let data: any = {
            label, code, description, price, range: range.value,
            indirectSell: isIndirectSell, acceptManyPayment: acceptManyPayment,
            productModelId: product.id, commercialOfferId: commercialOffer.id
        }

        if (file)
            data.image = file;

        if (range.value === 'COMMUNITY' && !group) {
            NotificationManager.error('Sélectionnez la communauté');
        }

        if (range.value === 'COMMUNITY')
            data.groupReference = group.reference;

        if (acceptManyPayment) {
            if (!maximumDaysToPay || !minimalPercentageForFirstPayment) {
                NotificationManager.error('Remplissez les informations de payements');
                return;
            }
            data.numberMaxOfDaysForPayment = maximumDaysToPay;
            data.minimalPercentageForFirstPayment = minimalPercentageForFirstPayment;
        }

        props.setRequestGlobalAction(true);
        ProductService.createProduct(data, { fileData: ['image'], multipart: true })
            .then(() => {
                NotificationManager.success('Le produit a été crée avec succès !');
                props.history.push(MARKETPLACE.STORE.PRODUCT.LIST);
            })
            .catch(err => {
                console.log(err);
                NotificationManager.error('Une erreur est survenu lors de la création du produit !');
            }).finally(() => {
                props.setRequestGlobalAction(false);
            });
    }

    return (
        <>
            <PageTitleBar
                title={"Nouveau produit"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit} className="pt-20">
                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Modèle de produit
                            </InputLabel>
                            <Autocomplete
                                value={product}
                                options={products}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setProduct(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Offre commerciale
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={commercialOffer}
                                options={commercialOffers}
                                onChange={(__, item) => {
                                    setCommercialOffer(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>
                    {product && commercialOffer && (
                        <>
                            <div className="row">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                            </div>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="description">
                                    Description package
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
                            <div className="row">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="price">
                                        Prix
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
                                <div className={`col-md-${range?.value !== 'COMMUNITY' ? '6' : '3'} col-sm-12 has-wrapper mb-30`}>
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
                                {range?.value === 'COMMUNITY' && (
                                    <div className="col-md-3 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Communauté cible
                                        </InputLabel>
                                        <Autocomplete
                                            value={group}
                                            options={groups}
                                            id="combo-box-demo"
                                            onChange={(__, item) => {
                                                setGroup(item);
                                            }}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </div>
                                )}
                            </div>
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="title">
                                    Image du produit
                                </InputLabel>
                                <FileUploader
                                    classes="mw-100"
                                    label="Sélectionner l'image de votre package ici"
                                    handleChange={(file) => {
                                        setFile(file);
                                    }} name="file" types={fileTypes} />
                            </FormGroup>
                            <FormGroup className="col-sm-12 has-wrapper">
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                        checked={isIndirectSell}
                                        onChange={() => setIsIndirectSell(!isIndirectSell)}
                                    />
                                } label={'Produit en vente indirecte'}
                                />
                            </FormGroup>
                            <FormGroup className="col-sm-12 has-wrapper">
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                        checked={acceptManyPayment}
                                        onChange={() => setAcceptManyPayment(!acceptManyPayment)}
                                    />
                                } label={'Accepter les payements différés'}
                                />
                            </FormGroup>
                            {acceptManyPayment && (
                                <>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                                            <InputLabel className="text-left">
                                                Nombre maximum de jour pour payer
                                            </InputLabel>
                                            <InputStrap
                                                required
                                                type="number"
                                                className="input-lg"
                                                id="minAccountBalance"
                                                name='minAccountBalance'
                                                value={maximumDaysToPay}
                                                onChange={(e) => setMaximumDaysToPay(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6 col-sm-12 has-wrapper mb-30">
                                            <InputLabel className="text-left">
                                                Pourcentage minimal du premier payement
                                            </InputLabel>
                                            <InputStrap
                                                required
                                                id="maxAccountBalance"
                                                type="number"
                                                name='maxAccountBalance'
                                                className="input-lg"
                                                value={minimalPercentageForFirstPayment}
                                                onChange={(e) => setMinimalPercentageForFirstPayment(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
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
                        </>
                    )}
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));