import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {FormGroup, Input as InputStrap, InputGroup, InputGroupAddon} from 'reactstrap';
import { getOrderTypes, getPaymentMethods, getNotificationMethods } from 'Helpers/datas';

const PaymentRequest = (props) => {

    const {onError, defaultReference, defaultType, hideReference, onSendData} = props;

    const [order, setOrder] = useState(null);
    const [amount, setAmount] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [discountCode, setDiscountCode] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [subscriptionCode, setSubscriptionCode] = useState(null);
    const [showDiscountField, setShowDiscountField] = useState(false);
    const [notificationMethod, setNotificationMethod] = useState(null);
    const [reference, setReference] = useState(defaultReference ?? null);
    const [showSubscriptionCodeField, setShowSubscriptionCodeField] = useState(false);
    const [type, setType] = useState(defaultType ? getOrderTypes().find(ot => ot.value == defaultType) : null);

    useEffect(() => {
        if(defaultReference) {
            findOrder(defaultReference);
        }
    }, [defaultReference])

    useEffect(() => {
        if(order && discountCode) {
            findDiscount();
         }
    }, [order])

    useEffect(() => {
        if(order && !order?.product.acceptManyPayment) {
            if(discount) {
                setAmount(getDiscountedAmountToPay())
            } else {
                setAmount(order.amount);
            }
         }
    }, [discount])

    const findOrder = (ref) => {
        props.setRequestGlobalAction(true);
        OrderService.findOrderByReference(ref).then((response) => {
            if(response.discountCode) {
                setDiscountCode(response.discountCode);
                setShowDiscountField(true);
            }
            if(!response?.product.acceptManyPayment) {
                setAmount(response.amount);
            }
           setOrder(response);
        }).catch(() => {
            NotificationManager.error("Une erreur s'est produite");
            onError();
        }).finally(() => {
           props.setRequestGlobalAction(false);
        });
     }

    const findDiscount = () => {
        if(showDiscountField && discountCode) {
           props.setRequestGlobalAction(true);
           OrderService.findDiscount(order.id, {code: discountCode})
           .then((discount) => {
                NotificationManager.success("Le coupon est valide");
                setDiscount(discount);
            })
           .catch((err) => {
              NotificationManager.error("Ce code est incorrect");
           })
           .finally(() => props.setRequestGlobalAction(false))
        }
     }
  
     const findSubscriptionCode = () => {
        if(showSubscriptionCodeField && subscriptionCode) {
           props.setRequestGlobalAction(true);
           OrderService.findSubscription(order.id, {code: subscriptionCode})
           .then(() => {
              NotificationManager.success("Le code de souscription est valide");
           })
           .catch((err) => {
              NotificationManager.error("Ce code est incorrect");
           })
           .finally(() => props.setRequestGlobalAction(false))
        }
    }

    const getAmountToPay = () => {
        let baseAmount = order?.amount;
        return baseAmount-order.amountPaid;
     }
  
    const getDiscountedAmountToPay = () => {
        let baseAmount = order?.amount;
        if(discount) {
           baseAmount = baseAmount - (baseAmount * discount.percentage/100);
        }
        return baseAmount-order.amountPaid;
     }


    const onSubmit = () => {
        if(!paymentMethod || !notificationMethod || !amount || !order) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data = {
            paymentMethod, notificationMethod, amount, reference: order.reference,
            currency: order?.items[0]?.currency, id: order.id
        }

        if(showDiscountField && discount && discountCode) {
            data.discountCode = discount.code;
        }

        if(showSubscriptionCodeField && subscriptionCode) {
            data.subscriptionCode = subscriptionCode;
        }

        onSendData(data);

    }
    
    return (
        <>

            { order && (
                <h1 className='mb-30'>
                    <span style={discount?.percentage && { textDecoration: 'line-through', color: 'red' } }>{getAmountToPay()} {order?.items[0]?.currency}</span> { discount?.percentage && <>{getDiscountedAmountToPay()} {order?.items[0]?.currency}</>}
                </h1>
            )}

            { !hideReference && (
                <div className="row mb-30">
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Demande
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            value={type}
                            options={getOrderTypes()}
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Reference
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="reference"
                            name='reference'
                            value={reference}
                            className="input-lg"
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </FormGroup>
                </div>
            )}

            <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                    <Checkbox
                        color="primary"
                        checked={showDiscountField}
                        onChange={(e) => setShowDiscountField(e.target.checked)}
                    />
                    } label={'J\'ai un coupon'}
                    />
            </FormGroup>
            { showDiscountField && (
                <div className="d-flex">
                <FormGroup className="col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="discountCode">
                        Code du coupon
                    </InputLabel>
                    <InputGroup>
                        <InputStrap
                            type="text"
                            id="discountCode"
                            value={discountCode}
                            name={'discountCode'}
                            className="has-input input-lg custom-input"
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="primary" variant="contained" onClick={() => {
                                findDiscount();
                            }} >
                                <span className='text-white'>Rechercher</span>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                </div> 
            )}
            <FormGroup className="col-sm-12 has-wrapper">
                <FormControlLabel control={
                <Checkbox
                    color="primary"
                    checked={showSubscriptionCodeField}
                    onChange={(e) => setShowSubscriptionCodeField(e.target.checked)}
                />
                } label={'J\'ai un code de reservation'}
                />
            </FormGroup>
            { showSubscriptionCodeField && (
                <div className="d-flex">
                <FormGroup className="col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="subscriptionCode">
                        Code de reservation
                    </InputLabel>
                    <InputGroup>
                        <InputStrap
                            type="text"
                            id="subscriptionCode"
                            value={subscriptionCode}
                            name={'subscriptionCode'}
                            className="has-input input-lg custom-input"
                            onChange={(e) => setSubscriptionCode(e.target.value)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="primary" variant="contained" onClick={() => {
                                findSubscriptionCode();
                            }} >
                                <span className='text-white'>Vérifier</span>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                </div> 
            )}

            <FormGroup className="has-wrapper">
                <InputLabel className="text-left" htmlFor="label">
                    Montant à payer
                </InputLabel>
                <InputStrap
                    required
                    id="amount"
                    type="text"
                    name='amount'
                    value={amount}
                    className="input-lg"
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!order || !order.product.acceptManyPayment}
                />
            </FormGroup>

            <h1 className='mb-20'>Mode de règlement</h1>
            <div className="row">
                { getPaymentMethods().map(pm => 
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                disabled={!pm.enabled}
                                checked={paymentMethod == pm.value}
                                onChange={() => {
                                    setPaymentMethod(pm.value);
                                }}
                            />
                        } label={pm.label}
                        />
                    </FormGroup>
                )}
            </div>

            <h1 className='mb-20 mt-20'>Notifications</h1>
            <div className="row">
                { getNotificationMethods().map(nm => 
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                checked={notificationMethod == nm.value}
                                onChange={() => {
                                    setNotificationMethod(nm.value);
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
                    Envoyer
                </Button>
            </div>
        </>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(PaymentRequest));