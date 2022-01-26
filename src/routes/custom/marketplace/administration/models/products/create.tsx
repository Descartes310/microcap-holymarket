import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { FileUploader } from "react-drag-drop-files";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { getProductNatures, getProductRanges } from 'Helpers/helpers';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const Create = (props) => {

    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState('');
    const [price, setPrice] = useState(null);
    const [range, setRange] = useState(null);
    const [nature, setNature] = useState(null);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isAccount, setIsAccount] = useState(false);
    const [description, setDescription] = useState('');
    const [maximumByUser, setMaximumByUser] = useState(null);
    const [priceCurrency, setPriceCurrency] = useState(null);
    const [isAggregation, setIsAggregation] = useState(false);
    const [accountCurrency, setAccountCurrency] = useState(null);
    const [minAccountbalance, setMinAccountBalance] = useState(null);
    const [maxAccountBalance, setMaxAccountBalance] = useState(null);
    const [hasComplementaryProducts, setHasComplementaryProducts] = useState(null);   

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCategories()
        .then(response => setCategories(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if(
            !label ||
            !code ||
            !file ||
            !price ||
            !range ||
            !nature ||
            !category ||
            !priceCurrency ||
            !description ||
            !maximumByUser
        ) return;

        let data: any = {
            label, code, price, description, maximumByUser,
            currency: priceCurrency, categoryId: category.id,
            image: file, nature: nature.value, range: range.value
        }

        console.log(data);
    }

    return (
        <>
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
                    <div className="row">
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Prix par défaut
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
                            <InputLabel className="text-left" htmlFor="priceCurrency">
                                Devise
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="priceCurrency"
                                name='priceCurrency'
                                className="input-lg"
                                value={priceCurrency}
                                onChange={(e) => setPriceCurrency(e.target.value)}
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
                        <div className="col-md-4 col-sm-12 has-wrapper mb-30">
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
                                checked={isAccount}
                                onChange={() => setIsAccount(!isAccount)}
                            />
                        } label={'Associer le produit a une unité de décompte'}
                        />
                    </FormGroup>
                    {isAccount && (
                        <>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Devise du compte
                                    </InputLabel>
                                    <Autocomplete
                                        options={[]}
                                        id="combo-box-demo"
                                        onChange={(__, item) => {
                                            //setCommercialOperation(item);
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 has-wrapper mb-30">
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
                                <div className="col-md-4 col-sm-12 has-wrapper mb-30">
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
                                        checked={isAggregation}
                                        onChange={() => setIsAggregation(!isAggregation)}
                                    />
                                } label={'Associer des comptes à consolider'}
                                />
                            </FormGroup>
                            {
                                isAggregation && (
                                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Sélectionnez les comptes à aggreger
                                        </InputLabel>
                                        <Autocomplete
                                            options={[]}
                                            id="combo-box-demo"
                                            onChange={(__, item) => {
                                                //setCommercialOperation(item);
                                            }}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </div>
                                )
                            }
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
                                    options={[]}
                                    id="combo-box-demo"
                                    onChange={(__, item) => {
                                        //setCommercialOperation(item);
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