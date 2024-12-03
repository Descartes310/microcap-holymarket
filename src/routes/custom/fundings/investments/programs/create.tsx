import { connect } from 'react-redux';
import { FUNDING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import FundingService from 'Services/funding';
import ProductService from 'Services/products';
import UnitSelect from 'Components/UnitSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [details, setDetails] = useState([]);
    const [amount, setAmount] = useState(null);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [strategy, setStrategy] = useState(null);
    const [strategies, setStrategies] = useState([]);
    const [minimalSubscription, setMinimalSubscription] = useState(null);

    useEffect(() => {
        getDatas();
        getProducts();
    }, []);

    useEffect(() => {
        if(product) {
            getProductDetails();
        }
    }, [product]);

    const getDatas = () => {
        props.setRequestGlobalAction(true),
        FundingService.getFundingStrategies()
        .then(response => setStrategies(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProductDetails = () => {
        props.setRequestGlobalAction(true),
        ProductService.getProductModelDetails(product.reference)
        .then(response => setDetails(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProductModels({ types: ['PRODUCT'], nature: 'CODEV' })
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {
        if (!label || !minimalSubscription || !strategy || !product || !amount || !currency) {
            NotificationManager.error('Le formulaire est mal renseigné')
            return;
        }

        var data: any = {
            currency,
            label, strategy_reference: strategy.reference,
            model_reference: product.reference, amount, minimalSubscription
        }

        props.setRequestGlobalAction(true);

        FundingService.createFundingProgram(data).then(() => {
            NotificationManager.success('Programme créé avec succès');
            props.history.push(FUNDING.INVESTMENT.PROGRAM.LIST);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error('Une erreur est survenues à la création du programme');
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getNumberOfLine = () => {
        if(product && amount && details.length > 0) {
            const quotient = details.find(d => d.type == 'QUOTIENT')?.value;
            const cycleTime = details.find(d => d.type == 'CYCLE_TIME')?.value;
            const depositAmount = details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value;

            return Math.ceil(amount / ((Number(depositAmount) * Number(cycleTime)) * (Number(quotient)/100)))
        } else {
            return 0;
        }
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Label
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
                    <div className="row">
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="amount">
                                Enveloppe d'investissement
                            </InputLabel>
                            <InputStrap
                                required
                                id="amount"
                                type="number"
                                name='amount'
                                value={amount}
                                className="input-lg"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                        <UnitSelect className="col-md-4 col-sm-12 has-wrapper" label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                        <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="minimalSubscription">
                                Nombre min. de souscription
                            </InputLabel>
                            <InputStrap
                                required
                                id="minimalSubscription"
                                type="number"
                                name='minimalSubscription'
                                value={minimalSubscription}
                                className="input-lg"
                                onChange={(e) => setMinimalSubscription(e.target.value)}
                            />
                        </FormGroup>
                    </div>                  
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Modèle de Ndjangui
                        </InputLabel>
                        <Autocomplete
                            value={product}
                            id="combo-box-demo"
                            onChange={(__, i) => {
                                setProduct(i)
                            }}
                            options={products}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="numberOfLine">
                            Nombre de ligne
                        </InputLabel>
                        <InputStrap
                            disabled
                            type="number"
                            id="numberOfLine"
                            name='numberOfLine'
                            className="input-lg"
                            value={getNumberOfLine()}
                        />
                    </FormGroup>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Stratégies
                        </InputLabel>
                        <Autocomplete
                            value={strategy}
                            id="combo-box-demo"
                            onChange={(__, i) => {
                                setStrategy(i)
                            }}
                            options={strategies}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>  
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