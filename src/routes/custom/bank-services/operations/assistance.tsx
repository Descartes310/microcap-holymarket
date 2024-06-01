import { connect } from 'react-redux';
import UserService from 'Services/users';
import UnitService from 'Services/units';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { getSpecificOperations } from 'Helpers/datas';
import { getReferralTypeLabel } from 'Helpers/helpers';
import DepositTickets from './components/depositTickets';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import VerifyUserOTPModal from './components/verifyUserOTPModal';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const Create = (props) => {

    const [step, setStep] = useState(1);
    const [member, setMember] = useState(null);
    const [amount, setAmount] = useState(null);
    const [details, setDetails] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [minAmount, setMinAmount] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [prestation, setPrestation] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [membership, setMembership] = useState(null);
    const [specificity, setSpecificity] = useState(null);

    useEffect(() => {
        getCurrencies();
    }, []);

    useEffect(() => {
        if(account) {
            getPrestations(account.reference);
        } else {
            setPrestation(null);
            setPrestations([]);
        }
    }, [account]);

    const findUserByMembership = () => {
        props.setRequestGlobalAction(true);
        UserService.findUserByReference(membership)
        .then(response => {
            setMember(response);
            //getPrestations(membership);
            getAccounts(membership);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce numéro utilisateur est inexistant");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
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

    const getPrestations = (reference: string) => {
        props.setRequestGlobalAction(true);
        BankService.getDomiciliationPrestations(reference)
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getAccounts = (reference: string) => {
        props.setRequestGlobalAction(true);
        BankService.getUserAccounts(reference)
        .then(response => setAccounts(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const onChangeDetails = (value, index) => {
        let remainingDetails = details.filter(d => d.id !== index);
        let newDetails = {id: index, value};
        setDetails([...remainingDetails, newDetails]);
    }

    const onSubmit = () => {
        if(!member || !account || !prestation || !currency) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        if(specificity?.value  == 'CODEV_DEPOSIT' && amount < minAmount) {
            NotificationManager.warning("Le montant minimum pour les tickets de "+minAmount+" "+currency.code);
            return;
        }

        let data: any = {
            amount,
            reference: membership,
            accountId: account.id,
            currency: currency.code,
            prestationId: prestation.id,
            detailsValues: details.map(d => d.value),
            detailsIds: details.map(d => d.id.split('-')[1]),
        };

        if(specificity?.value  == 'CODEV_DEPOSIT') {
            data.tickets = tickets.map(t => t.code);
        }

        props.setRequestGlobalAction(true);
        BankService.createOperation(data).then(() => {
            NotificationManager.success("L'opération a été créée avec succès!");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const sendCodeToUser = () => {

        if(!member || !account || !prestation) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        setShowModal(false);

        let data: any = {
            account_id: account.id
        };

        props.setRequestGlobalAction(true);
        BankService.sendCodeToClient(data).then(() => {
            setShowModal(true);
        }).catch(err => {
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const checkOTP = () => {
        setStep(2);
        setShowModal(false);
    }

    return (
        <>
            <PageTitleBar
                title={"Assistance"}
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
                                <>
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
                                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Compte
                                        </InputLabel>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            value={account}
                                            options={accounts}
                                            onChange={(__, item) => {
                                                setAccount(item);
                                            }}
                                            getOptionLabel={(option) => option.iban}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
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
                                            getOptionLabel={(option) => option.prestation.label}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </div> 
                                </>
                            )}
                        </>
                    :
                        <>
                            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="key">
                                    Compte
                                </InputLabel>
                                <InputStrap
                                    disabled
                                    type="text"
                                    value={account.iban}
                                    className="input-lg"
                                />
                            </FormGroup>

                            <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                                <InputLabel className="text-left" htmlFor="key">
                                    Opération
                                </InputLabel>
                                <InputStrap
                                    disabled
                                    type="text"
                                    value={prestation?.prestation.label}
                                    className="input-lg"
                                />
                            </FormGroup>

                            { (prestation?.direction == 'CASH_IN') && (
                                <div>
                                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Spécificité
                                        </InputLabel>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            value={specificity}
                                            options={getSpecificOperations(account?.paymentAccount)}
                                            onChange={(__, item) => {
                                                setSpecificity(item);
                                            }}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </div>
                                    {
                                        specificity?.value  == 'CODEV_DEPOSIT' && (
                                            <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                                <InputLabel className="text-left">
                                                    Bonds de versement
                                                </InputLabel>
                                                <DepositTickets 
                                                    referralCode={membership}
                                                    updateAmount={(selectedTickets) => {
                                                        setTickets(selectedTickets)
                                                        setMinAmount(selectedTickets.reduce((amt, currentValue) => amt + currentValue.amount, 0))
                                                    }}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            )}

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
                                    onClick={() => sendCodeToUser()}
                                    className="text-white font-weight-bold"
                                    disabled={!member || !account || !prestation}
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
                <VerifyUserOTPModal 
                    show={showModal}
                    type="INIT_OPERATION"
                    accountId={account?.id}
                    title={'Entrer le code de validation'}
                    callback={(otp) => checkOTP()}
                    onClose={() => setShowModal(false)}
                />
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));