import { connect } from 'react-redux';
import UserService from 'Services/users';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { getReferralTypeLabel } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [step, setStep] = useState(1);
    const [key, setKey] = useState(null);
    const [member, setMember] = useState(null);
    const [amount, setAmount] = useState(null);
    const [details, setDetails] = useState([]);
    const [bankCode, setBankCode] = useState(null);
    const [prestation, setPrestation] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [agencyCode, setAgencyCode] = useState(null);
    const [membership, setMembership] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [accountNumber, setAccountNumber] = useState(null);

    useEffect(() => {
        getPrestations();
    }, []);

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(membership)
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

    const getPrestations = () => {
        props.setRequestGlobalAction(true);
        BankService.getPrestations()
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onChangeDetails = (value, index) => {
        let remainingDetails = details.filter(d => d.id !== index);
        let newDetails = {id: index, value};
        setDetails([...remainingDetails, newDetails]);
    }

    const onSubmit = () => {
        if(!member || !countryCode || !bankCode || !agencyCode
            || !accountNumber || !key || !prestation) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        console.log()
        let data: any = {
            referral_code: membership, countryCode, bankCode,
            agencyCode, accountNumber, key        
        }

        // props.setRequestGlobalAction(true);
        // BankService.createSubscription(data).then(response => {
        //     console.log(response);
        // }).catch(err => {
        //     console.log(err);
        // }).finally(() => {
        //     props.setRequestGlobalAction(false);
        // })
    }

    return (
        <>
            <PageTitleBar
                title={"Créer une opération"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    { 
                        step === 1 ?
                        <>
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
                                <InputLabel className="text-left" htmlFor="countryCode">
                                    Code pays
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="countryCode"
                                    name='countryCode'
                                    value={countryCode}
                                    className="input-lg"
                                    onChange={(e) => setCountryCode(e.target.value)}
                                />
                            </FormGroup>
                            <div className="row">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="bankCode">
                                        Code banque
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        type="text"
                                        id="bankCode"
                                        name='bankCode'
                                        value={bankCode}
                                        className="input-lg"
                                        onChange={(e) => setBankCode(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="agencyCode">
                                        Code guichet
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        type="text"
                                        id="agencyCode"
                                        name='agencyCode'
                                        value={agencyCode}
                                        className="input-lg"
                                        onChange={(e) => setAgencyCode(e.target.value)}
                                    />
                                </FormGroup>
                            </div>
                            <div className="row">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor="accountNumber">
                                        Numéro de compte
                                    </InputLabel>
                                    <InputStrap
                                        required
                                        type="text"
                                        id="accountNumber"
                                        name='accountNumber'
                                        value={accountNumber}
                                        className="input-lg"
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
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
                            </div>

                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                <InputLabel className="text-left">
                                    Prestation
                                </InputLabel>
                                <Autocomplete
                                    id="combo-box-demo"
                                    value={prestation}
                                    options={prestations}
                                    onChange={(__, item) => {
                                        setPrestation(item);
                                    }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </div> 
                        </>
                    :
                        <>
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="key">
                                    Opération
                                </InputLabel>
                                <InputStrap
                                    disabled
                                    type="text"
                                    value={prestation.label}
                                    className="input-lg"
                                />
                            </FormGroup>

                            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="amount">
                                    Montant
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="number"
                                    id="amount"
                                    name='amount'
                                    value={amount}
                                    className="input-lg"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </FormGroup>

                            { prestation.details.map(prestationDetails => (
                                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left" htmlFor={'details-'+prestationDetails.id}>
                                        {prestationDetails.label}
                                    </InputLabel>
                                    <InputStrap
                                        type="text"
                                        required={false}
                                        className="input-lg"
                                        id={'details-'+prestationDetails.id}
                                        name={'details-'+prestationDetails.id}
                                        value={details.find(d => d.id === 'details-'+prestationDetails.id)?.value}
                                        onChange={(e) => onChangeDetails(e.target.value, 'details-'+prestationDetails.id)}
                                    />
                                </FormGroup>
                            ))}
                        </>
                    }

                    <FormGroup>
                        { step === 1 ?
                            <>
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
                                    onClick={() => setStep(2)}
                                    disabled={!member || !countryCode || !bankCode || !agencyCode
                                        || !accountNumber || !key || !prestation}
                                    className="text-white font-weight-bold"
                                >
                                    Continuer
                                </Button>
                            </>
                        :
                            <>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => setStep(1)}
                                    className="text-white font-weight-bold mr-20 bg-blue"
                                >
                                    Précédent
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={onSubmit}
                                    disabled={!member}
                                    className="text-white font-weight-bold"
                                >
                                    Enregister l'opération
                                </Button>
                            </>
                        }
                    </FormGroup>
                </Form>
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));