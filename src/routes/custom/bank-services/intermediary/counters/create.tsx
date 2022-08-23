import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import UserService from 'Services/users';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
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
    const [name, setName] = useState(null);
    const [member, setMember] = useState(null);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);  
    const [membership, setMembership] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null); 

    useEffect(() => {
        getTypes();
        getCategories();
    }, []);

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(membership)
        .then(response => {
            if(response.referralType === 'PERSON' || 
                (props.authUser.referralTypes.includes('PROVIDER_INTERMEDIARY') && props.authUser.referralId === response.referralCode))
                setMember(response);
            else 
                NotificationManager.error("Uniquement les personnes physiques sont autorisées");
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

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

    const onSubmit = () => {

        if(!member || !type || !paymentMethod || !name) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            name: name,
            reference: membership,
            payment_mode: paymentMethod.value,
            account_type_reference: type.reference,
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
                            Catégorie d'accès
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
                            Type d'accès
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
                            disabled={!membership}
                            onClick={() => findUserByMembership()}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Vérifier l'utilisateur
                        </Button>
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