import { connect } from 'react-redux';
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

const CustomCart = (props) => {

    const {show, onClose, project} = props;
    
    //const [label, setLabel] = useState('');
    const [market, setMarket] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

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
        if(selectedProducts.length <= 0 || !market) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            market_reference: market.reference,
            project_reference: project.reference,
            product_references: selectedProducts.map(p => p.reference)
        }

        ProductService.createCustomCart(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            onClose();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            setMarket(null);
            setProducts([]);
            setSelectedProducts([]);
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
                    Parnier personnalisé
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
                        multiple
                        options={products}
                        id="combo-box-demo"
                        value={selectedProducts}
                        onChange={(__, items) => {
                            setSelectedProducts(items);
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CustomCart));