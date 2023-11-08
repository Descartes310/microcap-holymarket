import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateTicket = (props) => {

    const {show, onClose, ticket} = props;
    
    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = () => {
        props.setRequestGlobalAction(true);
        ProductService.getTicketTypes()
        .then((response) => setTypes(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {        
        if(!amount || !type) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            amount,
            type_reference: type.reference
        }

        ProductService.createChildTicket(ticket.reference, data).then(() => {
            NotificationManager.success("Le versement a été créé avec succès");
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de la création");
        }).finally(() => {
            setAmount(null);
            setType(null);
            onClose();
            props.setRequestGlobalAction(false);
        })
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer un nouveau versement
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="amount">
                        Montant
                    </InputLabel>
                    <InputStrap
                        required
                        id="amount"
                        type="number"
                        name='amount'
                        value={amount}
                        className="input-lg"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Types
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={type}
                        options={types}
                        onChange={(__, item) => {
                            setType(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onSubmit}
                        className="text-white font-weight-bold"
                    >
                        Enregistrer
                    </Button>
                </FormGroup>
            </Form>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateTicket));