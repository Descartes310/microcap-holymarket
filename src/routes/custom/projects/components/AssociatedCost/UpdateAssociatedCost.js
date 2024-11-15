import { connect } from 'react-redux';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const UpdateAssociatedCost = (props) => {

    const [label, setLabel] = useState(props.item?.label);
    const [amount, setAmount] = useState(props.item?.amount);
    const [quantity, setQuantity] = useState(props.item?.quantity);

    const {show, onClose} = props;

    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Editer un coût associé
                </h3>
            )}
        >
            <RctCardContent>
                <Form onSubmit={props.onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Poste
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
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Montant
                        </InputLabel>
                        <InputStrap
                            required
                            id="amount"
                            type="number"
                            name='amount'
                            className="input-lg"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="quantity">
                            Quantité
                        </InputLabel>
                        <InputStrap
                            required
                            id="quantity"
                            type="number"
                            name='quantity'
                            className="input-lg"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            className="text-white font-weight-bold"
                            onClick={() => {
                                props.onSubmit({...props.item, amount, label, quantity});
                                setAmount(null);
                                setLabel(null);
                                setQuantity(null);
                                props.onClose();
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(UpdateAssociatedCost));