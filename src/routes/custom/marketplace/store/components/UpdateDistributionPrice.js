import { connect } from 'react-redux';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import {NotificationManager} from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';


const UpdateDistributionPrice = (props) => {

    const {show, onClose, distribution} = props;
    const [price, setPrice] = useState(distribution.price);

    const updatePrice = () => {
        props.setRequestGlobalAction(true),
        ProductService.updateProductDistributionPrice(distribution.reference, {price})
        .then(() => {
            NotificationManager.success("Le prix a été mis à jour.");
            onClose();
        })
        .catch((err) => {
            NotificationManager.error("Une erreur est survenue, veuillez reéssayer plus tard.");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Editer le prix
                </h3>
            )}
        >
            <RctCardContent>
                <Form>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="price">
                            Prix du produit
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="currency">
                            Devise
                        </InputLabel>
                        <InputStrap
                            disabled={true}
                            id="currency"
                            type="text"
                            name='currency'
                            value={distribution.currency}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold"
                            onClick={() => {
                                updatePrice();
                            }}
                        >
                            Editer
                        </Button>
                    </FormGroup>
                </Form>
            </RctCardContent>
        </DialogComponent>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(UpdateDistributionPrice));