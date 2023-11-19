import { connect } from 'react-redux';
import GroupService from 'Services/groups';
import Button from '@material-ui/core/Button';
import UnitSelect from 'Components/UnitSelect';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {Form, FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const CreateFundingOption = (props) => {

    const {show, onClose} = props;
    
    const [label, setLabel] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const [isin, setIsin] = useState(false);
    const [amount, setAmount] = useState(null);
    const [market, setMarket] = useState(null);
    const [category, setCategory] = useState([]);
    const [supports, setSupports] = useState([]);
    const [support, setSupport] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        if(category) {
            getTypes();
        } else {
            setTypes([]);
            setType(null);
            setSupports([]);
            setSupport(null);
        }
    }, [category]);

    useEffect(() => {
        if(type) {
            getSupports();
        } else {
            setSupports([]);
            setSupport(null);
        }
    }, [type]);

    const getCategories = () => {
        props.setRequestGlobalAction(true),
        GroupService.getFundingOptionCategories()
        .then(response => setCategories(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        GroupService.getOptionTypeByCategory(category?.reference)
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getSupports = () => {
        props.setRequestGlobalAction(true),
        GroupService.getOptionTypesSupport(type?.reference)
        .then(response => setSupports(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {        
        if(!support || !type || !quantity || !amount || !label || !currency) {
            NotificationManager.error('Veuillez bien remplir le formulaire')
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            isin, label, 
            emission: quantity,
            nominal_amount: amount,
            currency: currency?.code,
            option_type_reference: type?.reference,
            support_type_reference: support?.reference
        }

        GroupService.createFundingOption(data).then(() => {
            NotificationManager.success("L'item a été créé avec succès");
            onClose();
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'item");
        }).finally(() => {
            resetForm(); 
            props.setRequestGlobalAction(false);
        })
    }

    const resetForm = () => {
        setLabel(null);
        setTypes([]);
        setType(null);
        setSupports([]);
        setSupport(null);
        setAmount(null);
        setQuantity(null);
        setIsin(false)
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Initialisation d'une structure financiere
                </h3>
            )}
        >
            <Form onSubmit={onSubmit}>

                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Catégorie d'option de financement
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={category}
                        options={categories}
                        onChange={(__, item) => {
                            setCategory(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Type d'option de financement autorisé
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

                <FormGroup className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Type de support
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={support}
                        options={supports}
                        onChange={(__, item) => {
                            setSupport(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormGroup>

                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="amount">
                            Valeur nominale
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
                    <UnitSelect label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                </div>

                <div className="row">
                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="quantity">
                            Emission
                        </InputLabel>
                        <InputStrap
                            required
                            id="quantity"
                            type="number"
                            name='quantity'
                            value={quantity}
                            className="input-lg"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Désignation
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
                </div>

                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={isin}
                            onChange={() => setIsin(!isin)}
                        />
                    } label={'ISIN MicroCap'}
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateFundingOption));