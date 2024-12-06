import { connect } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const ConfigurePlacementModal = (props) => {

    const {show, onClose, deal, validate} = props;
    
    const [amount, setAmount] = useState(deal.amount);
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajouter un deal/spot
                </h3>
            )}
        >
            <Form>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="amount">
                        Montant souhaité
                    </InputLabel>
                    <InputStrap
                        required
                        id="amount"
                        type="text"
                        name='amount'
                        value={amount}
                        className="input-lg"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            if(amount <= deal.amount) {
                                validate({amount, deal})
                            }
                        }}
                        className="text-white font-weight-bold"
                    >
                        Valider
                    </Button>
                </FormGroup>
            </Form>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ConfigurePlacementModal));