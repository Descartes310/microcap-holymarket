import { connect } from 'react-redux';
import UnitService from 'Services/units';
import { SETTING } from 'Url/frontendUrl';
import SystemService from 'Services/systems';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {setRequestGlobalAction} from 'Actions';
import ProductService from 'Services/products';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {NotificationManager} from 'react-notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { voteOptions } from 'Routes/session/100pme/components/data';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Update = (props) => {
    
    const [units, setUnits] = useState([]);
    const [unit, setUnit] = useState(null);
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [typeUnits, setTypeUnits] = useState([]);
    const [unitType, setUnitType] = useState(null);

    useEffect(() => {
        getUnits();
        findConfig();
        getProducts();
        getTypeUnits();
    }, []);

    const findConfig = () => {
        props.setRequestGlobalAction(true),
        SystemService.findVoteConfig(props.match.params.id)
        .then(response => {
            setProduct(response.productModel);
            setUnit(response.unit);
            setUnitType(response.unit.type);
            setValue(response.value);
            setOptions(voteOptions.filter(o => response.options?.includes(o.value)))
        })
        .catch((err) => {
            console.log(err);
            props.history.push(SETTING.PME_VOTE.LIST);
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({types: ['PRODUCT']})
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

        if(!product || !unit || !value) {
            return
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            product_reference: product.reference,
            unit_reference: unit.reference,
            value, options: options.map(o => o.value).join(',')
        }

        SystemService.updateVoteConfig(props.match.params.id, data).then(() => {
            NotificationManager.success("La configuration a été éditée avec succès");
            props.history.push(SETTING.PME_VOTE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'édition de la configuration");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <PageTitleBar
                title={"Création d'une configuration"}
            />
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

                    <div className="row">
                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Type d'unité
                            </InputLabel>
                            <Autocomplete
                                options={typeUnits}
                                value={unitType}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setUnitType(item);
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
                                value={unit}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setUnit(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => u.type.id === unitType?.id)}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </div>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="value">
                            Nombre de d'unité
                        </InputLabel>
                        <InputStrap
                            required
                            id="value"
                            type="number"
                            name='value'
                            className="input-lg"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Options de souscription
                        </InputLabel>
                        <Autocomplete
                            multiple
                            value={options}
                            id="combo-box-demo"
                            onChange={(__, items) => {
                                setOptions(items);
                            }}
                            options={voteOptions}
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
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Update));