import { connect } from 'react-redux';
import UnitService from 'Services/units';
import MarketService from 'Services/markets';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CustomList from "Components/CustomList";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { getPriceWithCurrency } from "Helpers/helpers";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const Cotation = (props) => {

    const {show, onClose, product} = props;
    
    const [unit, setUnit] = useState(null);
    const [units, setUnits] = useState([]);
    const [price, setPrice] = useState(null);
    const [market, setMarket] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [cotations, setCotations] = useState([]);
    const [cotation, setCotation] = useState(null);
    const [addCotation, setAddCotation] = useState(false);
    const [updateCotation, setUpdateCotation] = useState(false);

    useEffect(() => {
        getUnits();
        getMarkets();
    }, [])

    useEffect(() => {
        getCotations();
    }, [product]);

    const getCotations = () => {
        props.setRequestGlobalAction(true);
        ProductService.getCotations(product.reference).then(response => {
            setCotations(response);
        })
        .finally(() => props.setRequestGlobalAction(false));
    }

    const getMarkets = () => {
        props.setRequestGlobalAction(true);
        MarketService.getMines().then(response => {
            setMarkets(response);
        })
        .finally(() => props.setRequestGlobalAction(false));
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

    const onSubmit = () => {        
        if(!price || !unit || !market) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            price,
            currency: unit.code,
            market_reference: market.reference
        }

        ProductService.updateCotation(product.reference, data).then(() => {
            NotificationManager.success("La cotation a été créé avec succès");
            getCotations();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création de la cotation");
        }).finally(() => {
            setAddCotation(false);
            setUpdateCotation(false);
            setPrice(null);
            setUnit(null);
            setMarket(null);
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={() => {
                setAddCotation(false);
                setUpdateCotation(false);
                onClose();
            }}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Cotations
                </h3>
            )}
        >
            {
                (addCotation || updateCotation) ? (
                    <Form onSubmit={onSubmit}>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="price">
                                Prix
                            </InputLabel>
                            <InputStrap
                                required
                                id="price"
                                type="number"
                                name='price'
                                value={price}
                                className="input-lg"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Devise
                            </InputLabel>
                            <Autocomplete
                                value={unit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Marché
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
                ) :
                <CustomList
                    list={cotations}
                    loading={false}
                    onAddClick={() => setAddCotation(true)}
                    itemsFoundText={n => `${n} cotations trouvées`}
                    renderItem={list => (
                        <>
                            {list && list.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center py-50">
                                    <h4>
                                        Aucune cotation trouvée
                                    </h4>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover table-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th className="fw-bold">Marché</th>
                                                <th className="fw-bold">Prix</th>
                                                <th className="fw-bold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list && list.map((item, key) => (
                                                <tr key={key} className="cursor-pointer">
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{item.marketName}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="media">
                                                            <div className="media-body pt-10">
                                                                <h4 className="m-0 fw-bold text-dark">{getPriceWithCurrency(item.price, item.currency)}</h4>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                setCotation(item);
                                                                setPrice(item.price);
                                                                setUnit(units.find(u => u.code === item.currency));
                                                                setMarket(markets.find(m => m.label == item.marketName));
                                                                setUpdateCotation(true);

                                                            }}
                                                            className="text-white font-weight-bold mr-3"
                                                        >
                                                            Editer
                                                        </Button>
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
            }
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Cotation));