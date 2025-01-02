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
import { getReferralTypeLabel, PAYMENT_METHODS } from 'Helpers/helpers';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [name, setName] = useState(null);
    const [party, setParty] = useState(null);
    const [parties, setParties] = useState([]);
    const [member, setMember] = useState(null);
    const [membership, setMembership] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null); 

    useEffect(() => {
        getTypes();
        if(props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY')) {
            getParties();
        }
    }, []);

    const getParties = () => {
        props.setRequestGlobalAction(true),
        BankService.getAgents()
        .then(response => setParties(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getTypes = () => {
        props.setRequestGlobalAction(true),
        UserAccountTypeService.getAccountTypes({based_from_member: true})
        .then(response => setTypes(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!member || !type || !paymentMethod || !name || (!party && props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY'))) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        props.setRequestGlobalAction(true);

        let data: any = {
            name: name,
            reference: membership,
            payment_mode: paymentMethod.value,
            account_type_reference: type.reference,
        }

        if(props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY')) {
            data.party_reference = party.reference;
            // data.counter_reference = counter.reference
        }

        BankService.createCounter(data).then(() => {
            NotificationManager.success("Le guichet a été créé avec succès");
            props.history.push(BANK.PARTY.COUNTER.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors du guichet");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <UserSelect isSelect={true} label={'Sélectionner un utilisateur'} onChange={(_, user) => {
                        setMember(user);
                        setMembership(user.referralId)
                    }}/>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Nom du guichet
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

                    { props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && (
                        <>
                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Agence
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={parties}
                                    value={party}
                                    onChange={(__, item) => {
                                        setParty(item);
                                    }}
                                    getOptionLabel={(option) => option.commercialName}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div>
                            {/* <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Guichets potentiels
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={counters}
                                    value={counter}
                                    onChange={(__, item) => {
                                        setCounter(item);
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div> */}
                        </>
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
                            Type d'accès
                        </InputLabel>
                        <Autocomplete
                            value={type}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setType(item);
                            }}
                            getOptionLabel={(option) => option.label}
                            options={types}
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

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Create));