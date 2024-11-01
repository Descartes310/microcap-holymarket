import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { MARKETPLACE } from 'Url/frontendUrl';
import AccountService from 'Services/accounts';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {FormGroup, Input as InputStrap} from 'reactstrap';
import PaymentConfigService from 'Services/paymentConfig';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { getPaymentMethods, getNotificationMethods, getPaymentConfigNatures, getPaymentConfigTypes } from 'Helpers/datas';

const Create = (props) => {

    const {defaultPaymentMethod} = props;

    const [label, setLabel] = useState(null);
    const [type, setType] = useState(null);
    const [orders, setOrders] = useState([]);
    const [nature, setNature] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [products, setProducts] = useState([]);
    const [account, setAccount] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [notificationMethod, setNotificationMethod] = useState(['LOGIN_EMAIL', 'ADDRESS']);
    const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod ? [defaultPaymentMethod] : []);

    useEffect(() => {
        getOrders();
        getProducts();
    }, []);

    useEffect(() => {
        if(paymentMethod.includes('DEPOSIT')) {
            getAccounts();
        } else {
            setAccounts([])
        }
    }, [paymentMethod]);
    
    const getProducts = () => {
        props.setRequestGlobalAction(true);
        ProductService.getProducts()
            .then(response => setProducts(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getOrders = () => {
        props.setRequestGlobalAction(true);
        OrderService.getPurchases()
        .then(response => setOrders(response.filter(o => o.paymentStatus != 'PAID')))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getSubscriptionAccounts()
        .then(response => setAccounts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }


    const onSubmit = () => {
        if(!paymentMethod || !notificationMethod || (paymentMethod.includes('DEPOSIT') && !account) || !label || !type || !nature || !startDate || !endDate || (selectedOrders.length <= 0 && selectedProducts.length <= 0)) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data: any = {
            paymentMethods: paymentMethod.join(','), notificationMethods: notificationMethod.join(','),
            label, type: type.value, nature: nature.value, startDate, endDate
        }

        if(nature.value == 'MODEL') {
            data.references = selectedProducts.map(p => p.reference).join(',')
        } else {
            data.references = selectedOrders.map(o => o.reference).join(',')
        }

        if(paymentMethod.includes('DEPOSIT')) {
            data.accountReference = account.reference
        }

        props.setRequestGlobalAction(true);
        PaymentConfigService.create(data)
            .then(() => {
                props.history.push(MARKETPLACE.STORE.PAYMENT.CONFIGURATION.LIST)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })

    }
    
    return (
        <RctCollapsibleCard>

            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                <InputLabel className="text-left">
                    Type
                </InputLabel>
                <Autocomplete
                    id="combo-box-demo"
                    onChange={(__, item) => {
                        setType(item);
                    }}
                    value={type}
                    options={getPaymentConfigTypes()}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </div>

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="label">
                    Désignation
                </InputLabel>
                <InputStrap
                    required
                    id="label"
                    type="text"
                    name='label'
                    value={label}
                    className="input-lg"
                    onChange={(e) => setLabel(e.target.value)}
                />
            </FormGroup>
            <div className="row has-wrapper">
                <FormGroup className="col-md-6 col-sm-12">
                    <InputLabel className="text-left" htmlFor="startDate">
                        Date début validité
                    </InputLabel>
                    <InputStrap
                        required
                        id="startDate"
                        type="date"
                        name='startDate'
                        value={startDate}
                        className="input-lg"
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-6 col-sm-12">
                    <InputLabel className="text-left" htmlFor="endDate">
                        Date fin de validité
                    </InputLabel>
                    <InputStrap
                        required
                        id="endDate"
                        type="date"
                        name='endDate'
                        value={endDate}
                        className="input-lg"
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </FormGroup>
            </div>

            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                <InputLabel className="text-left">
                    Nature
                </InputLabel>
                <Autocomplete
                    id="combo-box-demo"
                    onChange={(__, item) => {
                        setNature(item);
                    }}
                    value={nature}
                    options={getPaymentConfigNatures()}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </div>

            { nature && nature.value == 'MODEL' && (
            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                <InputLabel className="text-left">
                    Produits
                </InputLabel>
                <Autocomplete
                    multiple
                    id="combo-box-demo"
                    onChange={(__, items) => {
                        setSelectedProducts(items);
                    }}
                    options={products}
                    value={selectedProducts}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            </div>
            )}

            { nature && nature.value == 'SALE' && (
                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Ventes
                    </InputLabel>
                    <Autocomplete
                        multiple
                        id="combo-box-demo"
                        onChange={(__, items) => {
                            setSelectedOrders(items);
                        }}
                        options={orders}
                        value={selectedOrders}
                        getOptionLabel={(option) => option.reference.split('sal_ord_')[1]+' - '+option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
            )}

            <h1 className='mb-20'>Mode de règlement</h1>
            <div className="row">
                { getPaymentMethods().map(pm => 
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                disabled={!pm.enabled || defaultPaymentMethod != null}
                                checked={paymentMethod.includes(pm.value)}
                                onChange={() => {
                                    if(!paymentMethod.includes(pm.value)) {
                                        setPaymentMethod([...paymentMethod, pm.value]);
                                    } else {
                                        setPaymentMethod([...paymentMethod.filter(n => n != pm.value)]);
                                    }
                                }}
                            />
                        } label={pm.label}
                        />
                    </FormGroup>
                )}
            </div>
            { paymentMethod.includes('DEPOSIT') && (
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left">
                        Compte bancaire d'encaissement
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={account}
                        options={accounts}
                        onChange={(__, item) => {
                            setAccount(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>
            )}

            <h1 className='mb-20 mt-20'>Notifications</h1>
            <div className="row">
                { getNotificationMethods().map(nm => 
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={notificationMethod.includes(nm.value)}
                                onChange={() => {
                                    if(!notificationMethod.includes(nm.value)) {
                                        setNotificationMethod([...notificationMethod, nm.value]);
                                    } else {
                                        setNotificationMethod([...notificationMethod.filter(n => n != nm.value)]);
                                    }
                                }}
                            />
                        } label={nm.label}
                        />
                    </FormGroup>
                )}
            </div>
            
            <div className="row mt-20">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => onSubmit()}
                    className="col-md-12 col-sm-12 text-white font-weight-bold mb-20"
                >
                    Enregistrer
                </Button>
            </div>
        </RctCollapsibleCard>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(Create));