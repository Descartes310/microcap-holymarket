import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import UserService from 'Services/users';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import UserAccountTypeService from 'Services/account-types';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { getReferralTypeLabel, PAYMENT_METHODS } from 'Helpers/helpers';

const Create = (props) => {

    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [agents, setAgents] = useState([]);
    const [member, setMember] = useState(null); 
    const [broker, setBroker] = useState(null);
    const [brokerCode, setBrokerCode] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [membership, setMembership] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);  

    useEffect(() => {
        getTypes();
        getPrestations();
    }, []);

    useEffect(() => {
        if(broker) {
            getPotentialAgents();
        }
    }, [broker])

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(membership, {from_group: true})
        .then(response => {
            if(response.referralType === 'PERSON' || (props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && props.authUser.referralId === response.referralCode)) {
                setMember(response);
            } else {
                NotificationManager.error("Uniquement les personnes physiques sont autorisées");
            }
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes({based_from_member: true})
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
        BankService.getPotentialAgents({referralCode: brokerCode})
        .then(response => setAgents(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!selectedAgent || !type || !paymentMethod || !name) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            name: name,
            reference: membership,
            payment_mode: paymentMethod.value,
            account_type_reference: type.reference,
            agence_reference: selectedAgent.reference
        }

        BankService.createAgent(data).then(() => {
            NotificationManager.success("Le point de service a été créé avec succès");
            props.history.push(BANK.PARTY.AGENT.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue lors de la création du point de service");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <UserSelect label={"Réference du Broker"} type='BROKER' fromMyOrganisation={false} onChange={(membership, user) => {
                            setBrokerCode(membership);
                            setBroker(user);
                        }}/>
                    </div>
                    {broker && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Potentiels point de service
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
                    )}

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Nom du point
                        </InputLabel>
                        <InputStrap
                            required
                            id="name"
                            type="text"
                            name='name'
                            value={name}
                            className="input-lg"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="membership">
                            Numéro utilisateur
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="membership"
                            name='membership'
                            value={membership}
                            className="input-lg"
                            onChange={(e) => setMembership(e.target.value)}
                        />
                    </FormGroup>

                    {member && (
                        <div className="row">
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.userName}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.email}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4 col-sm-12 has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={getReferralTypeLabel(member.referralType)}
                                />
                            </FormGroup>
                        </div>
                    )}

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
                            Type du mandat
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            options={types}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <FormGroup>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!membership}
                            onClick={() => findUserByMembership()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Vérifier l'utilisateur
                        </Button>
                        <Button
                            color="primary"
                            onClick={onSubmit}
                            variant="contained"
                            disabled={!member}
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