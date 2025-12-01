import { connect } from 'react-redux';
import UserService from 'Services/users';
import BankService from 'Services/banks';
import UnitService from 'Services/units';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import UserSelect from 'Components/UserSelect';
import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import TextField from '@material-ui/core/TextField';
import DepositTickets from 'Components/DepositTickets';
import { getUserAssistanceTypes } from 'Helpers/datas';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import VerifyUserOTPModal from 'Components/verifyUserOTPModal';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { setRequestGlobalAction, onAddItemToCart, onClearCart } from 'Actions';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import AccountVentilation from 'Components/Product/Ventilation/AccountVentilation';
import { getPriceWithCurrency, getReferralTypeLabel, getUserPermissions } from 'Helpers/helpers';

const regularisationAssistance = (props) => {

    const [otp, setOtp] = useState(null);
    const [order, setOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [member, setMember] = useState(null);
    const [action, setAction] = useState(null);
    const [membership, setMembership] = useState(null);
    const [beneficiairy, setBeneficiairy] = useState(null);
    const [showOTPModal, setShowOTPModal] = useState(false);
    
    const [date, setDate] = useState(null);
    const [reason, setReason] = useState(null);
    const [amount, setAmount] = useState(null);
    const [details, setDetails] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [minAmount, setMinAmount] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [prestation, setPrestation] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [aggregations, setAggregations] = useState([]);

    useEffect(() => {
        getCurrencies();
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

    useEffect(() => {
        if(action) {
            switch (action.value) {
                case 'PAY_ORDER':
                    getUnpaidOrders();
                    break;
                case 'INITIATE_OPERATION':
                    getPrestations();
                    break;
                default:
                    break;
            }
        }
    }, [action])

    const getUnpaidOrders = () => {
        props.setRequestGlobalAction(true);
        OrderService.getUnpaidOrders({referral_code: member.referralCode, payment_status: ['NONE', 'PAYING'], })
            .then(response => setOrders(response))
            .finally(() => props.setRequestGlobalAction(false))
    }

    useEffect(() => {
        if(prestation) {
            if(prestation.prestation.direction === 'THIRD_PARTY_PAYMENT') {
                if(beneficiairy) {
                    getAccounts(beneficiairy.referralCode);
                } else {
                    setAccounts([]);
                    setAccount(null);
                }
            } else {
                setAccounts([]);
                setAccount(null);
                getAccounts(member.referralCode);
            }
        } else {
            setAccounts([]);
            setAccount(null);
        }
    }, [prestation, beneficiairy])

    const sendOtp = () => {
        if(!member || !action) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }
        props.setRequestGlobalAction(true);
        UserService.sendAuthOTP({targetReference: member.referralCode, type: action.value})
        .then(response => {
            setShowOTPModal(true);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("L'envoi du code de vérification a échoué");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    useEffect(() => {
        if(otp) {
            onSubmit();
        }
    }, [otp])

    const initiatePayment = () => {
        createNonFinancialOperation({type: 'PAY_ORDER', order_reference: order.reference});
    }

    const getPrestations = () => {
        props.setRequestGlobalAction(true);
        BankService.getPrestations()
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getAccounts = (reference: string) => {
        props.setRequestGlobalAction(true);
        BankService.getUserAccounts(reference, {all: true})
        .then(response => setAccounts(response))
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

    const askForBankAuthorization = () => {
        if(!member || !account || !prestation || !currency || !date || !reason) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        if(prestation?.prestation?.type  == 'DEPOSIT_SCHEDULED' && amount < minAmount) {
            NotificationManager.warning("Le montant minimum pour les tickets de "+minAmount+" "+currency.code);
            return;
        }

        if(prestation?.prestation?.type  == 'DEPOSIT_PARAMETERIZED' && aggregations.reduce((sum, item) => sum+item.percentage, 0) !== 100) {
            NotificationManager.error('Ventilation incorrecte');
            return;
        }

        let data: any = {
            amount, date, reason,
            reference: membership,
            accountId: account.reference,
            currency: currency.code,
            prestationId: prestation.prestation ? prestation.prestation.id : 0,
        };

        if(details && details.length > 0) {
            data.detailsValues = details.map(d => d.value);
            data.detailsIds = details.map(d => d.id.split('-')[1]);
        }

        if(prestation?.prestation?.type  == 'DEPOSIT_SCHEDULED') {
            data.tickets = tickets.map(t => t.code);
        }

        if(prestation?.prestation?.type  == 'DEPOSIT_PARAMETERIZED' && aggregations.length > 0) {
            data.aggregationIds = aggregations.map(ag => ag.id);
            data.aggregationPercentages = aggregations.map(ag => ag.percentage);
        }

        props.setRequestGlobalAction(true);
        BankService.createOperation(data).then(() => {
            NotificationManager.success("L'opération a été créée avec succès!");
            setShowAlert(true);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = () => {

        if(!member || !action || !date || !reason) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        switch (action.value) {

            case 'PAY_ORDER':
                initiatePayment()
                break;

            case 'INITIATE_OPERATION':
                askForBankAuthorization()
                break;
        
            default:
                break;
        }
    }

    const createNonFinancialOperation = (data: any) => {
        props.setRequestGlobalAction(true);
        BankService.createNonFinancialOperation({...data, referral_code: membership}, { fileData: ['file', 'agreement'], multipart: true }).then(() => {
            NotificationManager.success("L'opération a été créée avec succès!");
            setShowAlert(true);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    return (
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
                                Action à effectuer
                            </InputLabel>
                            <Autocomplete
                                id="combo-box-demo"
                                value={action}
                                options={
                                    getUserAssistanceTypes()
                                    .filter(a => getUserPermissions(props.authUser).includes(a.permission) && a.regularizable)
                                }
                                onChange={(__, item) => {
                                    setAction(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="date">
                                    Date de valeur
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="date"
                                    id="date"
                                    name='date'
                                    value={date}
                                    className="input-lg"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                            <FormGroup className="has-wrapper">
                                <InputLabel className="text-left" htmlFor="reason">
                                    Motif de l'opération
                                </InputLabel>
                                <InputStrap
                                    required
                                    type="text"
                                    id="reason"
                                    name='reason'
                                    value={reason}
                                    className="input-lg"
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                    </>
                )}
                { (action?.value == 'PAY_ORDER') && (
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Mes commandes
                        </InputLabel>
                        <Autocomplete
                            value={order}
                            options={orders.filter(o => (o.paymentStatus !== 'PAID' && ['PAY_ORDER', 'ORDER_PAYMENT'].includes(action?.value)) || !['PAY_ORDER', 'ORDER_PAYMENT'].includes(action?.value))}
                            id="combo-box-demo"
                            onChange={(__, item) => {
                                setOrder(item);
                            }}
                            getOptionLabel={(option) => `${option.label} ${getPriceWithCurrency(option.amount, option.currency)}`}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </FormGroup>
                )}
                { action?.value == 'INITIATE_OPERATION' && (
                    <div>

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
                        
                        { prestation && (
                            <>
                                { prestation.prestation?.direction == 'THIRD_PARTY_PAYMENT' && (
                                    <UserSelect label={'Numéro utilisateur du bénéficiaire'} onChange={(_, user) => {
                                        setBeneficiairy(user);
                                    }}/>
                                )}
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
                                        disabled={prestation?.prestation?.type  == 'DEPOSIT_SCHEDULED'}
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
                                        disabled={prestation?.prestation?.type  == 'DEPOSIT_SCHEDULED'}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </div>
                            </>
                        )}

                        { (prestation && prestation?.prestation?.direction == 'CASH_IN') && (
                            <div>
                                { prestation?.prestation?.type  == 'DEPOSIT_SCHEDULED' && (
                                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Bonds de versement
                                        </InputLabel>
                                        <DepositTickets 
                                            referralCode={membership}
                                            account={account}
                                            available={true}
                                            updateAmount={(selectedTickets) => {
                                                setTickets(selectedTickets)
                                                setMinAmount(selectedTickets.reduce((amt, currentValue) => amt + currentValue.amount, 0));
                                                if(selectedTickets && selectedTickets.length > 0) {
                                                    setCurrency(currencies.find(c => c.code == selectedTickets[0].currency));
                                                    setAmount(selectedTickets.reduce((amt, currentValue) => amt + currentValue.amount, 0))
                                                } else {
                                                    setCurrency(null);
                                                    setAmount(0);
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                                { aggregations?.length > 0 && prestation?.prestation?.type == 'DEPOSIT_PARAMETERIZED' && (
                                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Configurer la ventilation
                                        </InputLabel>
                                        <AccountVentilation 
                                            accounts={aggregations}
                                            editable={true}
                                            onSubmit={(item) => {
                                                setAggregations(aggregations.map(aggregation => {
                                                    if(aggregation.id === item.id) {
                                                        return {...aggregation, percentage: item.percentage};
                                                    }
                                                    return aggregation;
                                                }));
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
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
                    {
                        member && (
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={!member}
                                onClick={() => {
                                    sendOtp();
                                }}
                                className="text-white font-weight-bold mr-20"
                            >
                                Commencer l'assistance
                            </Button>
                        )
                    }
                </FormGroup>
            </Form>

            { showOTPModal && action &&(
                <VerifyUserOTPModal 
                    show={showOTPModal}
                    type={action.value}
                    targetReference={member.referralCode}
                    title={'Entrer le code de validation'}
                    callback={(otp) => {
                        setShowOTPModal(false);
                        setOtp(otp);
                    }}
                    onClose={() => setShowOTPModal(false)}
                />
            )}

            { showAlert && (
                <SweetAlert
                    success
                    btnSize="sm"
                    show={showAlert}
                    title={"L'opération a été initiée avec succès"}
                    onConfirm={() => {
                        window.location.reload();
                    }}
                />
            )}
        </RctCollapsibleCard>
    );
};

const mapStateToProps = ({ authUser }) => {
    return { authUser: authUser.data, }
};


export default connect(mapStateToProps, { setRequestGlobalAction, onAddItemToCart, onClearCart })(withRouter(regularisationAssistance));