import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import {FormGroup, Input as InputStrap, InputGroup} from 'reactstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { getOrderTypes, getPaymentMethods, getNotificationMethods } from 'Helpers/datas';

const PaymentRequest = (props) => {

    const {onError, defaultReference, defaultType, hideReference, onSendData, defaultPaymentMethod, disabled} = props;

    const [order, setOrder] = useState(null);
    const [amount, setAmount] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [otherPhone, setOtherPhone] = useState(null);
    const [otherEmail, setOtherEmail] = useState(null);
    const [reference, setReference] = useState(defaultReference ?? null);
    const [discountCode, setDiscountCode] = useState(order?.discountCode ?? null);
    const [showDiscountField, setShowDiscountField] = useState(order?.discountCode != null);
    const [notificationMethod, setNotificationMethod] = useState(['LOGIN_EMAIL', 'ADDRESS']);
    const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod ? [defaultPaymentMethod] : []);
    const [type, setType] = useState(defaultType ? getOrderTypes().find(ot => ot.value == defaultType) : null);

    useEffect(() => {
        if(paymentMethod.includes('DEPOSIT')) {
            getAccounts();
        } else {
            setAccounts([])
        }
    }, [paymentMethod, order]);

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getSubscriptionAccounts()
        .then(response => {
            setAccounts(response);
            if(order && order?.details.find(d => d.type == "MECHANT_ACCOUNT_REFERENCE")) {
                setAccount(response.find(a => a.reference == order?.details.find(d => d.type == "MECHANT_ACCOUNT_REFERENCE")?.value));
            }
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    useEffect(() => {
        if(defaultReference) {
            findOrder(defaultReference);
        }
    }, [defaultReference])

    useEffect(() => {
        if(order) {
            if(discountCode) {
                findDiscount();
            } else {
                setAmount(getDiscountedAmountToPay());
            }
         }
    }, [order])

    useEffect(() => {
        if(order) {
            setAmount(getDiscountedAmountToPay())
         }
    }, [discount])

    const findOrder = (ref) => {
        props.setRequestGlobalAction(true);
        OrderService.findOrderByReference(ref).then((response) => {
            if(response.discountCode) {
                setShowDiscountField(true);
                setDiscountCode(response.discountCode);
            }
            if(!response?.product.acceptManyPayment) {
                setAmount(response.amount);
            }
            setNotificationMethod(response?.details.find(d => d.type == 'NOTICATION_METHODS')?.value?.split(",") ?? []);
            setPaymentMethod(defaultPaymentMethod == null ? response?.details.find(d => d.type == 'PAYMENT_METHOD')?.value?.split(",") ?? [] : [defaultPaymentMethod]);
            setOtherEmail(response?.details.find(d => d.type == 'OTHER_NOTIFICATION_EMAIL')?.value ?? null)
            setOtherPhone(response?.details.find(d => d.type == 'OTHER_NOTIFICATION_PHONE')?.value ?? null)
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

    const getAmountToPay = () => {
        let baseAmount = order?.amount;
        return baseAmount + order.complementaryPayment - order.amountPaid;
     }
  
    const getDiscountedAmountToPay = () => {
        let baseAmount = order?.amount;
        if(discount) {
           baseAmount = baseAmount - (baseAmount * discount.percentage/100);
        }
        return baseAmount + order.complementaryPayment - order.amountPaid;
     }


    const onSubmit = () => {
        if(!paymentMethod || !notificationMethod || !amount || !order || (paymentMethod.includes('DEPOSIT') && !account)) {
            NotificationManager.error("Le formulaire est mal renseigné");
            return;
        }

        let data = {
            paymentMethod: paymentMethod.join(','), notificationMethod: notificationMethod.join(','), amount, reference: order.reference,
            currency: order?.items[0]?.currency, id: order.id
        }

        if(showDiscountField && discount && discountCode) {
            data.discountCode = discount.code;
        }

        if(paymentMethod.includes('DEPOSIT')) {
            data.accountReference = account.reference
        }

        if(otherEmail) {
            data.otherEmail = otherEmail
        }

        if(otherPhone) {
            data.otherPhone = otherPhone
        }

        onSendData(data);

    }
    
    return (
        <div>

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
                            disabled={disabled}
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
                            disabled={disabled}
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </FormGroup>
                </div>
            )}

            { showDiscountField && (
                <div className="d-flex">
                    <FormGroup className="col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="discountCode">
                            Code du coupon
                        </InputLabel>
                        <InputGroup>
                            <InputStrap
                                type="text"
                                disabled={true}
                                id="discountCode"
                                value={discountCode}
                                name={'discountCode'}
                                className="has-input input-lg custom-input"
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
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
                    disabled={!order || !order.product.acceptManyPayment || getAmountToPay() <= 0 || disabled}
                />
            </FormGroup>

            <h1 className='mb-20'>Mode de règlement</h1>
            <div className="row">
                { getPaymentMethods().map(pm => 
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                disabled={!pm.enabled || defaultPaymentMethod != null || disabled}
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
                        disabled={disabled}
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
                                disabled={disabled}
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
                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="otherEmail">
                        Autre email (facultatif)
                    </InputLabel>
                    <InputStrap
                        type="text"
                        id="otherEmail"
                        name='otherEmail'
                        value={otherEmail}
                        disabled={disabled}
                        className="input-lg"
                        onChange={(e) => setOtherEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="otherPhone">
                        Autre téléphone (facultatif)
                    </InputLabel>
                    <InputStrap
                        type="text"
                        id="otherPhone"
                        name='otherPhone'
                        value={otherPhone}
                        disabled={disabled}
                        className="input-lg"
                        onChange={(e) => setOtherPhone(e.target.value)}
                    />
                </FormGroup>
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
        </div>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(PaymentRequest));