import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const ComplexTableMenu = (props) => {

    const {show, onClose} = props;
    
    const [amount, setAmount] = useState(null);

    useEffect(() => {

    }, []);
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Option
                </h3>
            )}
        >
            <Form>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="price">
                        Test
                    </InputLabel>
                    <InputStrap
                        required
                        id="price"
                        type="number"
                        name='price'
                        value={amount}
                        className="input-lg"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        className="text-white font-weight-bold"
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
                
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ComplexTableMenu));