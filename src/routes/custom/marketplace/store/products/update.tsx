import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { MARKETPLACE } from 'Url/frontendUrl';
import ProductService from 'Services/products';
import SettingService from 'Services/settings';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { getProductRanges } from 'Helpers/helpers';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { getIndirectSaleProcess, uneditableProductModelType } from 'Helpers/datas';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import AccountVentilation from 'Components/Product/Ventilation/AccountVentilation';
import UnitService from 'Services/units';
import { setCurrency } from 'Actions/AppSettingsActions';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Update = (props) => {

    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [units, setUnits] = useState([]);
    const [price, setPrice] = useState(null);
    const [range, setRange] = useState(null);
    const [group, setGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const [product, setProduct] = useState(null);
    const [userFiles, setUserFiles] = useState([]);
    const [priceUnit, setPriceUnit] = useState(null);
    const [updatable, setUpdatable] = useState(true);
    const [description, setDescription] = useState('');
    const [aggregations, setAggregations] = useState([]);
    const [selectedPieces, setSelectedPieces] = useState([]);
    const [isIndirectSell, setIsIndirectSell] = useState(false);
    const [selectedProcesses, setSelectedProcesses] = useState([]);
    const [maximumDaysToPay, setMaximumDaysToPay] = useState(null);
    const [acceptManyPayment, setAcceptManyPayment] = useState(false);
    const [minimumPaymentAmount, setMinimumPaymentAmount] = useState(null);
    const [minimalPercentageForFirstPayment, setMinimalPercentageForFirstPayment] = useState(null);

    useEffect(() => {
        findProduct();
        getGroups();
        getUserFiles();
    }, []);

    useEffect(() => {
        if(product) {
            getAggregations();
            getUnits();
        }
    }, [product])

    const findProduct = () => {
        props.setRequestGlobalAction(true);
        ProductService.findProduct(props.match.params.reference).then(response => {
            setProduct(response);
            setCode(response.code);
            setLabel(response.label);
            setPrice(response.price);
            setDescription(response.description);
            setAcceptManyPayment(response.acceptManyPayment);
            setMinimumPaymentAmount(response.minimumPaymentAmount);
            setMaximumDaysToPay(response.numberMaxOfDaysForPayment);
            setIsIndirectSell(response?.mirrorAccount || response?.account);
            setRange(getProductRanges().find(pr => pr.value === response.range));
            setUpdatable(!uneditableProductModelType.includes(response.specialType));
            setMinimalPercentageForFirstPayment(response.minimalPercentageForFirstPayment);
            if(response.indirectSalePieces) {
                setSelectedProcesses(getIndirectSaleProcess());
                setSelectedPieces(response.pieces);
            }
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getUserFiles = () => {
        props.setRequestGlobalAction(true),
        SettingService.getUserFileTypes()
        .then(response => {
            setUserFiles(response);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getUnits = () => {
        props.setRequestGlobalAction(true);
        UnitService.getUnits()
        .then((response) => {
            setUnits(response);
            setPriceUnit(response.find(c => c.code == product.currency))
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getGroups = () => {
        props.setRequestGlobalAction(true),
            GroupService.getCommunityDatas({ belongs: 'IN' })
                .then(response => setGroups(response))
                .finally(() => props.setRequestGlobalAction(false))
    }

    const getAggregations = () => {
        props.setRequestGlobalAction(true);
        ProductService.findProductModelAggregations(product.reference)
            .then(response => setAggregations(response.map(a => {
                return {id: a.id, label: a.label, percentage: 0};
            })))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if (
            !label ||
            !code ||
            !price ||
            !priceUnit ||
            !range ||
            !description ||
            !product
        ) {
            NotificationManager.error('Le formulaire est mal renseigné');
            return;
        }

        if(['SEGRAGATED_ACCOUNT'].includes(product?.specialProduct) && aggregations.reduce((sum, item) => sum+item.percentage, 0) !== 100) {
            NotificationManager.error('Ventilation incorrecte');
            return;
        }

        let data: any = {
            label, code, description, price, range: range.value,
            acceptManyPayment: acceptManyPayment, currency: priceUnit.code
        }

        data.indirectSell = isIndirectSell || product?.mirrorAccount || product?.account

        if (file)
            data.image = file;

        if (range.value === 'COMMUNITY' && !group) {
            NotificationManager.error('Sélectionnez la communauté');
        }

        if (range.value === 'COMMUNITY')
            data.groupReference = group.groupReference;

        if (acceptManyPayment) {
            if (!maximumDaysToPay || !minimalPercentageForFirstPayment || !minimumPaymentAmount) {
                NotificationManager.error('Remplissez les informations de payements');
                return;
            }
            data.minimumPaymentAmount = minimumPaymentAmount;
            data.numberMaxOfDaysForPayment = maximumDaysToPay;
            data.minimalPercentageForFirstPayment = minimalPercentageForFirstPayment;
        }

        if (isIndirectSell) {
            if (selectedProcesses.length <= 0) {
                NotificationManager.error('Remplissez les informations de vente indirecte');
                return;
            }
            if(selectedPieces.length > 0) {
                data.indirect_sale_pieces = selectedPieces.map(p => p.reference).join(',');
            }
        }

        if(['SEGRAGATED_ACCOUNT'].includes(product?.specialProduct) && aggregations.length > 0) {
            data.aggregations = aggregations.map(a => a.id);
            data.ventilations = aggregations.map(a => Number(a.percentage));
        }

        props.setRequestGlobalAction(true);
        ProductService.updateProduct(props.match.params.reference, data, { fileData: ['image'], multipart: true })
        .then(() => {
            NotificationManager.success('Le produit a été édité avec succès !');
            props.history.push(MARKETPLACE.STORE.PRODUCT.LIST);
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error('Une erreur est survenu lors de la mise a jour du produit !');
        }).finally(() => {
            props.setRequestGlobalAction(false);
        });
    }

    return (
        <>
            <PageTitleBar
                title={"Edition du produit"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit} className="pt-20">
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
                                    value={label}
                                    disabled={!updatable}
                                    className="input-lg"
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
                                    value={code}
                                    className="input-lg"
                                    disabled={!updatable}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="description">
                                Description du produit
                            </InputLabel>
                            <InputStrap
                                required
                                id="description"
                                type="textarea"
                                name='description'
                                className="input-lg"
                                value={description}
                                disabled={!updatable}
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
                            <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                            <div className={`col-md-${range?.value !== 'COMMUNITY' ? '12' : '6'} col-sm-12 has-wrapper mb-30`}>
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
                                <div className="col-md-6 col-sm-12 has-wrapper mb-30">
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
                                        getOptionLabel={(option) => option.userName}
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
                                disabled={!updatable}
                                label="Sélectionner l'image de votre package ici"
                                handleChange={(file) => { setFile(file);}} name="file" types={fileTypes} />
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
                                    <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Nombre maximum de jour pour payer
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            type="number"
                                            className="input-lg"
                                            id="maximumDaysToPay"
                                            name='maximumDaysToPay'
                                            value={maximumDaysToPay}
                                            onChange={(e) => setMaximumDaysToPay(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Pourcentage minimal du premier payement
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            type="number"
                                            className="input-lg"
                                            id="minimalPercentageForFirstPayment"
                                            name='minimalPercentageForFirstPayment'
                                            value={minimalPercentageForFirstPayment}
                                            onChange={(e) => setMinimalPercentageForFirstPayment(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Montant minimal initial
                                        </InputLabel>
                                        <InputStrap
                                            required
                                            type="number"
                                            className="input-lg"
                                            id="minimumPaymentAmount"
                                            name='minimumPaymentAmount'
                                            value={minimumPaymentAmount}
                                            onChange={(e) => setMinimumPaymentAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <FormGroup className="col-sm-12 has-wrapper">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    checked={isIndirectSell}
                                    disabled={product?.mirrorAccount || product?.account || !updatable}
                                    onChange={() => {
                                        if(isIndirectSell) {
                                            setSelectedPieces([]);
                                            setSelectedProcesses([]);
                                        }
                                        setIsIndirectSell(!isIndirectSell);
                                    }}
                                />
                            } label={'Produit en vente indirecte'}
                            />
                        </FormGroup>
                        {(isIndirectSell || product?.mirrorAccount) && (
                            <div className="row">
                                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Processus de vente
                                    </InputLabel>
                                    <Autocomplete
                                        multiple
                                        id="combo-box-demo"
                                        onChange={(__, items) => {
                                            setSelectedProcesses(items);
                                            if(items.length <= 0)
                                                setSelectedPieces([]); 
                                        }}
                                        value={selectedProcesses}
                                        options={getIndirectSaleProcess()}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                            </div>
                        )}

                        {(isIndirectSell || product?.mirrorAccount) && selectedProcesses.map(p => p.value).includes('PIECES') && (
                            <div className="row">
                                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Pièces à demander
                                    </InputLabel>
                                    <Autocomplete
                                        multiple
                                        id="combo-box-demo"
                                        onChange={(__, items) => {
                                            setSelectedPieces(items);
                                        }}
                                        options={userFiles}
                                        value={selectedPieces}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                            </div>
                        )}


                        { ['SEGRAGATED_ACCOUNT'].includes(product?.specialProduct) && aggregations.length > 0 && (
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Configurer les compartiments
                                </InputLabel>
                                <AccountVentilation 
                                    accounts={aggregations}
                                    editable={true}
                                    onSubmit={(item) => {
                                        setAggregations(aggregations.map(aggregation => {
                                            if(aggregation.id === item.id) {
                                                return {...aggregation, percentage: item.percentage};
                                            }
                                            return aggregation;
                                        }));
                                    }}
                                />
                            </div>
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
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Update));