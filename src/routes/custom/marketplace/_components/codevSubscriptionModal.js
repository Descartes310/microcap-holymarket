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
    const [subscriptionCount, setSubscriptionCount] = useState(null);
    const [unitAmount, setUnitAmount] = useState(product?.details.find(d => d.type == 'DEPOSIT_AMOUNT')?.value);
  
    const getDiscountedAmountToPay = () => {
        let baseAmount = product?.price;
        if(discount) {
           baseAmount = baseAmount - (baseAmount * discount.percentage/100);
        }
        return baseAmount;
     }

    const onSubmit = () => {
        if(!subscriptionCount || !unitAmount) {
            NotificationManager.error("Le formulaire n'est pas bien renseigné");
            return;
        }
        let data = {
            subscriptionCount, unitAmount
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

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="subscription">
                        Souscription à payer
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        disabled={true}
                        id="subscription"
                        name='subscription'
                        value={getDiscountedAmountToPay()}
                        className="input-lg"
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
                        value={Number(subscriptionCount)*Number(unitAmount) + getDiscountedAmountToPay()}
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