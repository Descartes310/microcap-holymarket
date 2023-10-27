import { connect } from 'react-redux';
import ProjectService from 'Services/projects';
import MarketService from 'Services/markets';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const AddProduct = (props) => {

    const {show, onClose} = props;
    
    const [market, setMarket] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getMarkets();
    }, [])

    useEffect(() => {
        if(market) {
            getProducts();
        }
    }, [market]);

	const getMarkets = () => {
		props.setRequestGlobalAction(true);
		MarketService.getAvailables()
		.then(response => setMarkets(response))
		.finally(() => props.setRequestGlobalAction(false))
	}

    const getProducts = () => {
		props.setRequestGlobalAction(true);
		MarketService.getProducts(market.reference)
		.then(response => setProducts(response))
		.finally(() => props.setRequestGlobalAction(false))
	}

    const onSubmit = () => {        
        if(!product) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            product_reference: product?.reference
        }

        ProjectService.addProduct(data).then(() => {
            NotificationManager.success("Le produit a été créé avec succès");
            onClose();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création");
        }).finally(() => {
            setMarket(null);
            setProducts([]);
            setProduct(null);
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajouter un produit
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Marchés
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={market}
                        options={markets}
                        onChange={(__, item) => {
                            setMarket(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Produits
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
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AddProduct));