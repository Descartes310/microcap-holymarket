import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {FormGroup, Input as InputStrap, InputGroup, InputGroupAddon} from 'reactstrap';
import { getOrderTypes, getPaymentMethods } from 'Helpers/datas';

const PaymentRequestSupport = (props) => {

    const {show, onClose, order, onValidate} = props;

    const [amount, setAmount] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('DEPOSIT');
    const [subscriptionCode, setSubscriptionCode] = useState(null);
    const [reference, setReference] = useState(order ? order.reference : null);
    const [discountCode, setDiscountCode] = useState(order?.discountCode ?? null);
    const [showSubscriptionCodeField, setShowSubscriptionCodeField] = useState(false);
    const [showDiscountField, setShowDiscountField] = useState(order?.discountCode != null);
    const [type, setType] = useState(order ? getOrderTypes().find(ot => ot.value == order.orderType) : null);

    useEffect(() => {
        if(order && discountCode) {
            findDiscount();
         }
    }, [order])

    useEffect(() => {
        if(order && !order.product.acceptManyPayment) {
            if(discount) {
                setAmount(getDiscountedAmountToPay())
            } else {
                setAmount(order.amount);
            }
         }
    }, [discount])

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
        let data = {
            amount
        }

        if(discount && discountCode && showDiscountField) {
            data.discountCode = discountCode
        }

        if(subscriptionCode && showSubscriptionCodeField) {
            data.subscriptionCode = subscriptionCode
        }

        onValidate(data);
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Règlement commerçant
                </h3>
            )}
        >
            <RctCardContent>

                { order && (
                    <h1 className='mb-30'>
                        <span style={discount?.percentage && { textDecoration: 'line-through', color: 'red' } }>{getAmountToPay()} {order?.items[0]?.currency}</span> { discount?.percentage && <>{getDiscountedAmountToPay()} {order?.items[0]?.currency}</>}
                    </h1>
                )}

                <div className="row mb-30">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Demande
                        </InputLabel>
                        <Autocomplete
                            disabled={true}
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
                
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="reference">
                            Reference
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="reference"
                            disabled={true}
                            name='reference'
                            value={reference}
                            className="input-lg"
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </FormGroup>

                </div>

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
                        disabled={!order.product.acceptManyPayment}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </FormGroup>

                <h1 className='mb-20'>Mode de règlement</h1>
                <div className="row">
                    { getPaymentMethods().map(pm => 
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-0">
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                    disabled={true}
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
                
                <FormGroup className="float-right mb-20">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => onSubmit()}
                        className="text-white font-weight-bold mb-20"
                    >
                        Envoyer
                    </Button>
                </FormGroup>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(PaymentRequestSupport));