import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import {FormGroup, Input as InputStrap, InputGroup, Col, Label, InputGroupAddon} from 'reactstrap';

const CodevSubscriptionModal = (props) => {

    const {onSendData, product, show, onClose} = props;

    const [discount, setDiscount] = useState(null);
    const [discountCode, setDiscountCode] = useState(null);
    const [subscriptionCode, setSubscriptionCode] = useState(null);
    const [showDiscountField, setShowDiscountField] = useState(null);
    const [subscriptionCount, setSubscriptionCount] = useState(null);
    const [showSubscriptionCodeField, setShowSubscriptionCodeField] = useState(false);
    const [unitAmount, setUnitAmount] = useState(product?.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value);
    const [subscription, setSubscription] = useState(product?.details.find(d => d.type == 'SUBSCRIPTION_FEES')?.value);

    useEffect(() => {
        console.log(product);
    }, []);

    const findDiscount = () => {
        if(showDiscountField && discountCode) {
           props.setRequestGlobalAction(true);
           OrderService.findDiscount('0', {code: discountCode, productIds: [product?.id]})
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
           OrderService.findSubscription('0', {code: subscriptionCode, productIds: [product?.id]})
           .then(() => {
              NotificationManager.success("Le code de souscription est valide");
           })
           .catch((err) => {
              NotificationManager.error("Ce code est incorrect");
           })
           .finally(() => props.setRequestGlobalAction(false))
        }
     }

    const onSubmit = () => {
        if(!subscriptionCount || !unitAmount || !subscription) {
            NotificationManager.error("Le formulaire n'est pas bien renseigné");
            return;
        }
        let data = {
            subscriptionCount, subscription, unitAmount
        }
        if(discount && discountCode) {
            data.discountCode = discountCode
        }
        if(subscriptionCode) {
            data.subscriptionCode = subscriptionCode
        }
        onSendData(data);
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Souscription à un produit CODEV
                </h3>
            )}
        >
            <RctCardContent>

                <div className="row mb-30">
                
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="product">
                            Produit
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="product"
                            name='product'
                            disabled={true}
                            className="input-lg"
                            value={product?.label}
                        />
                    </FormGroup>
                </div>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="amount">
                        Frais de souscription
                    </InputLabel>
                    <InputStrap
                        required
                        id="amount"
                        type="text"
                        name='amount'
                        disabled={true}
                        className="input-lg"
                        value={product?.price}
                    />
                </FormGroup>

                <FormGroup row className="mb-0">
                    <Col sm={12}>
                        <Label className="ml-4">
                            <InputStrap
                                type="checkbox"
                                checked={showDiscountField}
                                onChange={(e) => setShowDiscountField(e.target.value)}
                            />
                            <p>J'ai un code de réduction</p>
                        </Label>
                    </Col>
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
                <FormGroup row className="mb-0">
                    <Col sm={12}>
                        <Label className="ml-4">
                            <InputStrap 
                                type="checkbox"
                                checked={showSubscriptionCodeField}
                                onChange={(e) => setShowSubscriptionCodeField(e.target.checked)}
                            />
                            <p>J'ai un code de reservation</p>
                        </Label>
                    </Col>
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
                    <InputLabel className="text-left" htmlFor="subscription">
                        Souscription à payer
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="subscription"
                        name='subscription'
                        value={subscription}
                        className="input-lg"
                        onChange={(e) => setSubscription(e.target.value)}
                        disabled={product?.details.find(d => d.type == 'SUBSCRIPTION_FEES')?.value}
                    />
                </FormGroup>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="unitAmount">
                        Montant d'un versement
                    </InputLabel>
                    <InputStrap
                        required
                        type="number"
                        id="unitAmount"
                        name='unitAmount'
                        value={unitAmount}
                        className="input-lg"
                        onChange={(e) => setUnitAmount(e.target.value)}
                        disabled={product?.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value}
                    />
                </FormGroup>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="subscriptionCount">
                        Nombre de versement
                    </InputLabel>
                    <InputStrap
                        required
                        type="number"
                        className="input-lg"
                        id="subscriptionCount"
                        name='subscriptionCount'
                        value={subscriptionCount}
                        onChange={(e) => setSubscriptionCount(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="subscriptionTotal">
                        Montant total des versements
                    </InputLabel>
                    <InputStrap
                        required
                        type="number"
                        disabled={true}
                        className="input-lg"
                        id="subscriptionTotal"
                        name='subscriptionTotal'
                        value={Number(subscriptionCount)*Number(unitAmount)}
                    />
                </FormGroup>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="totalAmount">
                        Total à payer
                    </InputLabel>
                    <InputStrap
                        required
                        type="number"
                        disabled={true}
                        id="totalAmount"
                        name='totalAmount'
                        value={Number(subscriptionCount)*Number(unitAmount) + product?.price}
                        className="input-lg"
                    />
                </FormGroup>
                
                <div className="row mt-20">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => onSubmit()}
                        className="col-md-12 col-sm-12 text-white font-weight-bold mb-20"
                    >
                        Valider
                    </Button>
                </div>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CodevSubscriptionModal));