import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import BankService from 'Services/banks';
import UserService from 'Services/users';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UnitSelect from 'Components/UnitSelect';
import AccountService from 'Services/accounts';
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [name, setName] = useState(null);
    const [member, setMember] = useState(null); 
    const [agency, setAgency] = useState(null);
    const [agencies, setAgencies] = useState([]);
    const [membership, setMembership] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [selectedPrestations, setSelectedPrestations] = useState([]);
    
    const [bank, setBank] = useState(null);
    const [banks, setBanks] = useState([]);
    const [currency, setCurrency] = useState(null);
    const [bic, setBic] = useState(null);
    const [iban, setIban] = useState(null);
    const [accountKey, setAccountKey] = useState(null);
    const [accountNumber, setAccountNumber] = useState(null);

    useEffect(() => {
        getPrestations();
        getAgencies();
        getBanks();
    }, []);

    const getPrestations = () => {
        props.setRequestGlobalAction(true);
        BankService.getPrestations()
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getAgencies = () => {
        props.setRequestGlobalAction(true),
        UserService.getInstitutions({type: 'PSG_AGENCY'})
        .then(response => setAgencies(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getBanks = () => {
        props.setRequestGlobalAction(true),
        AccountService.getAvailableBanks()
        .then(response => setBanks(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!name || !membership || selectedPrestations.length <= 0) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        
        let data: any = {
            name: name,
            referralCode: membership,
            prestations: selectedPrestations.map(p => p.id),
        }
        
        if(agency) {
            data.agency_id = agency.id;
        }

        if(!bank || !accountKey || !accountNumber || !bic || !iban || !currency) {
            NotificationManager.error("Les informations renseignées sont incompletes ou incorrectes");
            return;
        }

        data.bank_reference = bank.referralCode;
        data.account_key = accountKey;
        data.account_bic = bic;
        data.account_iban = iban;
        data.account_balance = 0;
        data.account_currency = currency.code;
        data.account_number = accountNumber;
        
        props.setRequestGlobalAction(true);
        if(props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT')) {
            BankService.createSubAgentMandate(data).then(() => {
                NotificationManager.success("Le réseau a été créée avec succès");
                props.history.push(BANK.PARTY.SUPER_AGENT.LIST);
            }).catch((err) => {
                console.log(err);
                NotificationManager.error("Une erreur est survenue lors de la création du réseau");
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        } else {
            BankService.createSuperAgentMandate(data).then(() => {
                NotificationManager.success("Le réseau a été créée avec succès");
                props.history.push(BANK.PARTY.SUPER_AGENT.LIST);
            }).catch((err) => {
                console.log(err);
                NotificationManager.error("Une erreur est survenue lors de la création du réseau");
            }).finally(() => {
                props.setRequestGlobalAction(false);
            })
        }
    }

    return (
        <>
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>

                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="name">
                            Nom du réseau
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
                        <UserSelect type={props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT') ? 'PROVIDER_AGENT' : 'PROVIDER_SUPER_AGENT'} label={props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT') ? 'Sélectionner l\'agent d\'agent de guichet' : 'Sélectionner le prestataire de guichet'} onChange={(_, user) => {
                            setMember(user);
                            setMembership(user.referralCode)
                        }}/>
                    </FormGroup>

                    {props.authUser.referralTypes.includes('PROVIDER_SUPER_AGENT') && (
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <InputLabel className="text-left">
                                Etablissement
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                options={agencies}
                                value={agency}
                                onChange={(__, item) => {
                                    setAgency(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    )}

                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                        <InputLabel className="text-left">
                            Prestations autorisées
                        </InputLabel>
                        <Autocomplete
                            multiple={true}
                            id="combo-box-demo"
                            options={prestations}
                            value={selectedPrestations}
                            onChange={(__, items) => {
                                setSelectedPrestations(items);
                            }}
                            getOptionLabel={(option) => `${option.label} (${option.bank})`}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>

                    <h2 className='mt-10'>Compte d'opération</h2>
                    <div className='row mt-10'>
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="iban">
                                    IBAN
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="iban"
                                    name='iban'
                                    value={iban}
                                    className="input-lg"
                                    onChange={(e) => setIban(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="bic">
                                    BIC
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="bic"
                                    name='bic'
                                    value={bic}
                                    className="input-lg"
                                    onChange={(e) => setBic(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="number">
                                    Numéro de compte
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="number"
                                    name='number'
                                    value={accountNumber}
                                    className="input-lg"
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6 col-sm-12">             
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="key">
                                    Clé
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="key"
                                    name='key'
                                    value={accountKey}
                                    className="input-lg"
                                    onChange={(e) => setAccountKey(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-6 col-sm-12">
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                <InputLabel className="text-left">
                                    Banque
                                </InputLabel>
                                <Autocomplete
                                    value={bank}
                                    options={banks}
                                    id="combo-box-demo"
                                    onChange={(__, item) => {
                                        setBank(item)
                                    }}
                                    getOptionLabel={(option) => option.userName}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormGroup>
                        </div>
                        <UnitSelect className="col-md-6 col-sm-12" label="Devise" isCurrency={true} onChange={(c) => setCurrency(c)} />
                    </div>

                    <FormGroup>
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

const mapStateToProps = ({ authUser }) => {
    return {
        authUser: authUser.data,
    }
};

export default connect(mapStateToProps, { setRequestGlobalAction })(withRouter(Create));