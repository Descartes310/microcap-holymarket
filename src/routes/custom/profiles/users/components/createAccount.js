import { connect } from 'react-redux';
import BankService from 'Services/banks';
import UserService from 'Services/users';
import UnitService from 'Services/units';
import AccountService from 'Services/accounts';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const CreateAccount = (props) => {

    const {show, onClose} = props;
    const [bic, setBic] = useState(null);
    const [key, setKey] = useState(null);
    const [type, setType] = useState(null);
    const [bank, setBank] = useState(null);
    const [banks, setBanks] = useState([]);
    const [iban, setIban] = useState(null);
    const [label, setLabel] = useState(null);
    const [agency, setAgency] = useState(null);
    const [agencies, setAgencies] = useState([]);
    const [balance, setBalance] = useState(null);
    const [number, setNumber] = useState(null);
    const [members, setMembers] = useState([]);
    const [units, setUnits] = useState([]);
    const [member, setMember] = useState(null);
    const [currency, setCurrency] = useState(null);

    useEffect(() => {
        getBanks();
    }, []);

    useEffect(() => {
        if(bank) {
            getBankAgencies();
            getUnits();
        }
    }, [bank]);

    useEffect(() => {
        if(agency) {
            getMembers();
        }
    }, [agency]);

    const getBanks = () => {
        props.setRequestGlobalAction(true);
        BankService.getBanks()
        .then(response => setBanks(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getBankAgencies = () => {
        if(bank) {
            props.setRequestGlobalAction(true);
            UserService.getInstitutions({type: 'BANK_AGENCY', referralCode: bank.reference})
            .then(response => setAgencies(response))
            .finally(() => props.setRequestGlobalAction(false))
        }
    }

    const getUnits = () => {
        props.setRequestGlobalAction(false);
        UnitService.getUnits()
        .then((response) => setUnits(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getMembers = () => {
        props.setRequestGlobalAction(true),
        UserService.getInstitutionMembers(agency.id, {type: 'ADVISOR'})
        .then(response => setMembers(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onSubmit = () => {

        if(!label || !iban || !bic || !number || !member || !key || !agency || !bank) {
            return;
        }

        let data = {
            label, iban, bic, type: type.value, bankCode: bank.code, agencyCode: agency.code, number, key, referral_code: member.referralCode, currency_code: currency.code
        };

        if(balance) {
            data.balance = balance;
        }

        props.setRequestGlobalAction(true);

        AccountService.createExternalAccount(data).then(() => {
            NotificationManager.success('Le compte a été enregistré');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
            onClose(true);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer un nouveau compte
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Label
                    </InputLabel>
                    <InputStrap
                        required
                        id="label"
                        type="text"
                        name='label'
                        value={label}
                        className="input-lg"
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </FormGroup>    
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Type de compte
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={type}
                        options={[{name: "Bancaire", value: "BANK"}]}
                        onChange={(__, item) => {
                            setType(item);
                        }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                {type && (
                    <>
                        <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                            <InputLabel className="text-left">
                                Banques
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={bank}
                                options={banks}
                                onChange={(__, item) => {
                                    setBank(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                            <InputLabel className="text-left">
                                Agences
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={agency}
                                options={agencies}
                                onChange={(__, item) => {
                                    setAgency(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="iban">
                                IBAN
                            </InputLabel>
                            <InputStrap
                                required
                                id="iban"
                                type="text"
                                name='iban'
                                value={iban}
                                className="input-lg"
                                onChange={(e) => setIban(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="bic">
                                BIC
                            </InputLabel>
                            <InputStrap
                                required
                                id="bic"
                                type="text"
                                name='bic'
                                value={bic}
                                className="input-lg"
                                onChange={(e) => setBic(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="number">
                                Numéro de compte
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="number"
                                name='number'
                                value={number}
                                className="input-lg"
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </FormGroup>                    
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="key">
                                Clé
                            </InputLabel>
                            <InputStrap
                                required
                                type="text"
                                id="key"
                                name='key'
                                value={key}
                                className="input-lg"
                                onChange={(e) => setKey(e.target.value)}
                            />
                        </FormGroup>

                        <h2>Domiciliation</h2>
                        <FormGroup className="has-wrapper">
                            <InputLabel className="text-left" htmlFor="balance">
                                Solde initial
                            </InputLabel>
                            <InputStrap
                                required
                                type="number"
                                id="balance"
                                name='balance'
                                value={balance}
                                className="input-lg"
                                onChange={(e) => setBalance(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Devise
                            </InputLabel>
                            <Autocomplete
                                value={currency}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setCurrency(item)
                                }}
                                getOptionLabel={(option) => option.label}
                                options={units.filter(u => ['dévise', 'devise', 'devises', 'dévises'].includes(u.type.label.toLowerCase()))}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>

                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Conseiller
                            </InputLabel>
                            <Autocomplete
                                value={member}
                                options={members}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setMember(item);
                                }}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </>
                )}

                <Button
                    color="primary"
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateAccount));