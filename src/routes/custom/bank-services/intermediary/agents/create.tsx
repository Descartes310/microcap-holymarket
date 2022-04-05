import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import UserService from 'Services/users';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import UserAccountTypeService from 'Services/account-types';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const PAYMENT_METHODS = [
        {
            label: 'Règlement par cession d\'effets',
            value: 'EFFECT_SESSION'
        },
        {
            label: 'Règlement par compensation',
            value: 'COMPENSATION'
        }
    ]

    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [agents, setAgents] = useState([]);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);  
    const [prestations, setPrestations] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);  

    useEffect(() => {
        getTypes();
        getCategories();
        getPrestations();
        getPotentialAgents();
    }, []);

    const getCategories = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypeCategories()
        .then(response => setCategories(response))
        .finally(() => props.setRequestGlobalAction(false))
    }    
    
    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes()
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getPrestations = () => {
        props.setRequestGlobalAction(true),
        BankService.getPrestations()
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getPotentialAgents = () => {
        props.setRequestGlobalAction(true),
        BankService.getPotentialAgents()
        .then(response => setAgents(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!selectedAgent || !type || !paymentMethod) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            payment_mode: paymentMethod.value,
            reference: selectedAgent.reference,
            account_type_reference: type.reference
        }

        BankService.createAgent(data).then(() => {
            NotificationManager.success("L'agent a été créé avec succès");
            props.history.push(BANK.PARTY.AGENT.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors de l'agent");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Potentiel agents
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={agents}
                            value={selectedAgent}
                            onChange={(__, item) => {
                                setSelectedAgent(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Méthode de règlement
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={PAYMENT_METHODS}
                            value={paymentMethod}
                            onChange={(__, item) => {
                                setPaymentMethod(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Catégorie du mandat
                        </InputLabel>
                        <Autocomplete
                            id="combo-box-demo"
                            options={categories}
                            value={category}
                            onChange={(__, item) => {
                                setCategory(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Type du mandat
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={types.filter(t => t.userAccountTypeCategory.id === category?.id)}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                            className="text-white font-weight-bold"
                        >
                            Ajouter
                        </Button>
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));