import { connect } from 'react-redux';
import { FUNDING } from 'Url/frontendUrl';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import FundingService from 'Services/funding';
import ProductService from 'Services/products';
import CustomList from "Components/CustomList";
import UnitSelect from 'Components/UnitSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import AddProgramInvestment from '../../components/AddProgramInvestment';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [label, setLabel] = useState('');
    const [values, setValues] = useState([]);
    const [details, setDetails] = useState([]);
    const [amount, setAmount] = useState(null);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [strategy, setStrategy] = useState(null);
    const [strategies, setStrategies] = useState([]);
    const [showAddValueBox, setShowAddValueBox] = useState(false);
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
        if (!label || !minimalSubscription || !strategy || !product || !amount || !currency || values.length <= 0) {
            NotificationManager.error('Le formulaire est mal renseigné')
            return;
        }

        var data: any = {
            currency: currency.code,
            label, strategy_reference: strategy.reference,
            model_reference: product.reference, amount, minimalSubscription,
            values: JSON.stringify(values)
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
                            Plan CODEV
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
                    <InputLabel className="text-left">
                        Liste des investissements
                    </InputLabel>
                    <CustomList
                        list={values}
                        loading={false}
                        itemsFoundText={n => `${n} paramètre trouvé`}
                        onAddClick={() => setShowAddValueBox(true)}
                        renderItem={list => (
                            <>
                                {list && list.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center py-50">
                                        <h4>
                                            Aucune paramètre trouvé
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="fw-bold">Intitulé</th>
                                                    <th className="fw-bold">Coût</th>
                                                    <th className="fw-bold">Durée</th>
                                                    <th className="fw-bold">Option sortie</th>
                                                    <th className="fw-bold">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list && list.map((item, key) => (
                                                    <tr key={key} className="cursor-pointer">
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.label}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.amount} {item?.currency}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.period}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="media">
                                                                <div className="media-body pt-10">
                                                                    <p className="m-0 text-dark">{item?.exit}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    setValues([...values.filter(v => v.label != item.label && v.period != item.period)])
                                                                }}
                                                                className="btn-danger text-white font-weight-bold mr-3"
                                                            >
                                                                Supprimer
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
            { showAddValueBox && (
                <AddProgramInvestment
                    show={showAddValueBox}
                    onClose={() => setShowAddValueBox(!showAddValueBox)}
                    onSubmit={(item) => {
                        setValues([...values, item]);
                        setShowAddValueBox(false)
                    }}
                />
            )}
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));