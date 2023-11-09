import { connect } from 'react-redux';
import UserService from 'Services/users';
import UnitService from 'Services/units';
import { FUNDING } from 'Url/frontendUrl';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import FundingService from 'Services/funding';
import AccountService from 'Services/accounts';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { getFundingOfferInterventionTypes } from 'Helpers/datas';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { Form, FormGroup, Input as InputStrap, InputGroup, InputGroupAddon } from 'reactstrap';

const Create = (props) => {
    
    const [label, setLabel] = useState(null);
    const [amount, setAmount] = useState(null);
    const [member, setMember] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [reference, setReference] = useState('');
    const [affected, setAffected] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [negociable, setNegociable] = useState(false);
    const [interventionType, setInterventionType] = useState(null);

    useEffect(() => {
        getCurrencies();
    }, []);

    useEffect(() => {
        if(interventionType) {
            getAccounts();
        } else {
            setAccount(null);
            setAccounts([]);
        }
    }, [interventionType]);

    const getAccounts = () => {
        props.setRequestGlobalAction(true),
        AccountService.getAccountBySpeciality({special_product: interventionType?.value})
            .then(response => {
                setAccounts(response);
                setAccount(null);
            })
            .finally(() => props.setRequestGlobalAction(false))
    }

    const getCurrencies = () => {
        props.setRequestGlobalAction(false);
        UnitService.getCurrencies()
        .then((response) => setCurrencies(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(reference)
        .then(response => {
            setMember(response);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {

        if(!currency || !interventionType || !amount || !label) {
            NotificationManager.error("Le formulaire est mal rempli");
            return;
        }

        let data: any = {
            label, currency: currency.code, affected, amount,
            negociable, intervention_type: interventionType.value,
            nature: 'OFFER'
        };

        if(account) {
            data.account_reference = account?.reference;
        }

        if(member) {
            data.user_reference = member?.referralCode;
        }

        props.setRequestGlobalAction(true);
        FundingService.createFundingOffer(data).then(() => {
            props.history.push(FUNDING.BOURSE.OFFER.MINE);
        }).catch(err => {
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
        <RctCollapsibleCard>
            <Form onSubmit={onSubmit}>

                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={affected}
                            onChange={() => setAffected(!affected)}
                        />
                    } label={'Offre affectée'}
                    />
                </FormGroup>
                {
                    affected && (
                        <>
                        <FormGroup className="col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="reference">
                                    Réference utilisateur
                                </InputLabel>
                                <InputGroup>
                                    <InputStrap
                                        type="text"
                                        id="reference"
                                        value={reference}
                                        name={'reference'}
                                        className="has-input input-lg custom-input"
                                        onChange={event => setReference(event.target.value)}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" variant="contained" onClick={() => {
                                            findUserByMembership();
                                        }} >
                                            <span className='text-white'>Rechercher</span>
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            {member && (
                                <>
                                    <div className="row">
                                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                            <InputStrap
                                                disabled
                                                className="input-lg"
                                                value={member.userName}
                                            />
                                        </FormGroup>
                                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                            <InputStrap
                                                disabled
                                                className="input-lg"
                                                value={member.email}
                                            />
                                        </FormGroup>
                                    </div>
                                </>
                            )}
                        </>
                    )
                }

                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={negociable}
                            onChange={() => setNegociable(!negociable)}
                        />
                    } label={'Offre ferme (non négociable)'}
                    />
                </FormGroup>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="label">
                        Désignation
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

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Mode d'intervention
                    </InputLabel>
                    <Autocomplete
                        value={interventionType}
                        id="combo-box-demo"
                        onChange={(__, item) => {
                            setInterventionType(item);
                        }}
                        getOptionLabel={(option) => option.label}
                        options={getFundingOfferInterventionTypes()}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Compte payeur
                    </InputLabel>
                    <Autocomplete
                        value={account}
                        id="combo-box-demo"
                        onChange={(__, item) => {
                            setAccount(item);
                        }}
                        options={accounts}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>

                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="amount">
                        Montant de l'offre
                    </InputLabel>
                    <InputStrap
                        required
                        id="amount"
                        name='amount'
                        type="number"
                        value={amount}
                        className="input-lg"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </FormGroup>

                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                    <InputLabel className="text-left">
                        Devise
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={currency}
                        options={currencies}
                        onChange={(__, item) => {
                            setCurrency(item);
                        }}
                        getOptionLabel={(option) => option.label}
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
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));