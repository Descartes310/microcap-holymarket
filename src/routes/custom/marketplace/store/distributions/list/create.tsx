import { connect } from 'react-redux';
import { MARKETPLACE } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import UnitService from 'Services/units';


const Create = (props) => {

    const [units, setUnits] = useState([]);
    const [price, setPrice] = useState(null);
    const [member, setMember] = useState(null);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [currency, setCurrency] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if(product) {
            getUnits();
        }
    }, [product]);

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProducts()
            .then(response => {
                setProducts(response);
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getUnits = () => {
        props.setRequestGlobalAction(true);
        UnitService.getUnits()
        .then((response) => {
            setUnits(response);
            setPrice(product.price);
            setCurrency(response.find(c => c.code == product.currency))
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }
    
    const onSubmit = () => {

        if(!product || !member) {
            NotificationManager.error("Le formulaire n'est pas bien renseigné");
            return;
        }

        let data: any = {
            productReference: product.reference,
            referralCode: member.referralCode
        }

        if(price && currency) {
            data.price = price;
            data.currency = currency.code
        }

        ProductService.createProductDistribution(data).then(() => {
            NotificationManager.success("La distribution a été ajoutée avec succès");
            props.history.push(MARKETPLACE.STORE.DISTRIBUTION.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de la distribution");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <RctCollapsibleCard>
            <Form onSubmit={onSubmit}>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
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
                <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                    setMember(user);
                }}/>
                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="price">
                            Prix recommandé
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
                            Devise recommandée
                        </InputLabel>
                        <Autocomplete
                            value={currency}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setCurrency(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                </div>

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
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));