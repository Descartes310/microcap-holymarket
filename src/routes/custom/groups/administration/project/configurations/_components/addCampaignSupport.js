import { connect } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const AddCampaignSupport = (props) => {

    const {show, onClose} = props;
    
    const [support, setSupport] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const onSubmit = () => {        
        if(!support || !quantity) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        if(support.quantity < quantity) {
            NotificationManager.error('La quantité de support est trop elevée')
            return;
        }

        let data = {
            support,
            quantity
        }

        props.onSubmit(data);
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Ajouter un produit
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Option de financement
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={support}
                        options={props.supports}
                        onChange={(__, item) => {
                            setSupport(item);
                        }}
                        getOptionLabel={(option) => option.supportType.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="quantity">
                        Quantité ()
                    </InputLabel>
                    <InputStrap
                        required
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={quantity}
                        className="input-lg"
                        onChange={(e) => setQuantity(e.target.value)}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AddCampaignSupport));