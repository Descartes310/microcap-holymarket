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

    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [member, setMember] = useState(null);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);  
    const [prestations, setPrestations] = useState([]);
    const [membership, setMembership] = useState(null);
    const [commercialName, setCommercialName] = useState('');  
    const [selectedPrestations, setSelectedPrestations] = useState([]);

    useEffect(() => {
        getTypes();
        getCategories();
        getPrestations();
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

    const onSubmit = () => {

        if(!member || !commercialName || selectedPrestations.length <= 0) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        props.setRequestGlobalAction(true);

        let data = {
            commercialName: commercialName,
            referralCode: member.referralCode,
            account_type_reference: type.reference,
            prestations: selectedPrestations.map(p => p.id),

        }

        BankService.createMandate(data).then(() => {
            NotificationManager.success("Le mandat a été créé avec succès");
            props.history.push(BANK.ADMIN.MANDATE.LIST);
        }).catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur est survenu lors du partenariat");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(membership, {type: 'BROKER'})
        .then(response => {
            setMember(response);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("L'utilisateur fourni n'est pas un broker");
        })
        .finally(() => {
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
                        <>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.userName}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={member.email}
                                />
                            </FormGroup>
                            <FormGroup className="has-wrapper">
                                <InputStrap
                                    disabled
                                    className="input-lg"
                                    value={getReferralTypeLabel(member.referralType)}
                                />
                            </FormGroup>
                        </>
                    )}

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="label">
                            Nom commercial
                        </InputLabel>
                        <InputStrap
                            required
                            id="label"
                            type="text"
                            name='label'
                            className="input-lg"
                            value={commercialName}
                            onChange={(e) => setCommercialName(e.target.value)}
                        />
                    </FormGroup>

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Prestations
                        </InputLabel>
                        <Autocomplete
                            multiple
                            id="combo-box-demo"
                            options={prestations}
                            value={selectedPrestations}
                            onChange={(__, items) => {
                                setSelectedPrestations(items);
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

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));