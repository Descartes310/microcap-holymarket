import { connect } from 'react-redux';
import UserService from 'Services/users';
import BankService from 'Services/banks';
import UnitService from 'Services/units';
import OrderService from 'Services/orders';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import ProductService from 'Services/products';
import AccountService from 'Services/accounts';
import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import TextField from '@material-ui/core/TextField';
import { getSpecificOperations, getUserAssistanceTypes } from 'Helpers/datas';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DepositTickets from 'Components/DepositTickets';
import { NotificationManager } from 'react-notifications';
import ActivationBox from '../../notifications/ActivationBox';
import VerifyUserOTPModal from 'Components/verifyUserOTPModal';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import { getPriceWithCurrency, getReferralTypeLabel } from 'Helpers/helpers';
import { setRequestGlobalAction, onAddItemToCart, onClearCart } from 'Actions';
import OrderFormModal from 'Routes/custom/marketplace/checkout/orderFormModal';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import AccountVentilation from 'Components/Product/Ventilation/AccountVentilation';
import AuthenticateUser from 'Routes/custom/networks/coverages/components/authenticateUser';
import UserDocumentsModal from 'Routes/custom/networks/coverages/components/userFilesModal';
import MemberDocumentsModal from 'Routes/custom/networks/coverages/components/memberFilesModal';
import CodevSubscriptionModal from 'Routes/custom/marketplace/_components/codevSubscriptionModal';

const Assist = (props) => {

    const [otp, setOtp] = useState(null);
    const [order, setOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [member, setMember] = useState(null);
    const [action, setAction] = useState(null);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [codevData, setCodevData] = useState(null);
    const [membership, setMembership] = useState(null);
    const [productModel, setProductModel] = useState(null);
    const [productModels, setProductModels] = useState([]);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showUserFileBox, setShowUserFileBox] = useState(false);
    const [showActivationBox, setShowActivationBox] = useState(false);
    const [showMemberFileBox, setShowMemberFileBox] = useState(false);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [showAuthentificationBox, setShowAuthentificationBox] = useState(false);

    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(null);
    const [details, setDetails] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [minAmount, setMinAmount] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
                case 'PLACE_ORDER':
                case 'BOOK_ORDER':
                    getProductModels();
                    break;
                case 'PAY_ORDER':
                    getOrders();
                    break;
                case 'INITIATE_OPERATION':
                    getAccounts(member.referralCode);
                    break;
                default:
                    break;
            }
        }
    }, [action])

    useEffect(() => {
        if(productModel) {
            getProducts();
        }
    }, [productModel])

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

    const getProducts = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProducts({ model_reference: productModel.reference, referral_code: member.referralCode })
			.then(response => setProducts(response))
			.finally(() => props.setRequestGlobalAction(false))
	}

    const getProductModels = () => {
		props.setRequestGlobalAction(true);
		ProductService.getShopProductModels({})
			.then(response => setProductModels(response))
			.finally(() => props.setRequestGlobalAction(false))
    }

    const getOrders = () => {
        props.setRequestGlobalAction(true);
        OrderService.getOrders({referral_code: member.referralCode})
            .then(response => setOrders(response.filter(o => ['PENDING', 'CONFIRMED', 'PAYING'].includes(o.status))))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const initiatePayment = () => {
        props.setRequestGlobalAction(true);

        OrderService.initiatePayment(order.reference, {})
           .then(() => {
              NotificationManager.success("La demande de paiement a été envoyée");
              window.location.reload();
           })
           .catch((err) => {
              NotificationManager.error("Une erreur est survenue");
           })
           .finally(() => props.setRequestGlobalAction(false))
     }

    const addToCart = (cartItem) => {
		if(!cartItem.profileBuyable) {
			alert("Votre profile ne vous donne pas accès à ce produit");
			return;
		}
		props.onAddItemToCart({...cartItem});
	}

    useEffect(() => {
        if(account) {
            getAggregations();
            getPrestations(account.reference);
        } else {
            setPrestation(null);
            setPrestations([]);
            setAggregations([]);
        }
    }, [account]);

    const getAggregations = () => {
        props.setRequestGlobalAction(true);
        AccountService.getAccountActivationDetails(account.accountReference).then((response) => {
            setAggregations(response?.accounts ? response.accounts : []);
        }).finally(() => {
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

    const askForBankAuthorization = () => {
        if(!member || !account || !prestation || !currency) {
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
            amount,
            reference: membership,
            accountId: account.id,
            currency: currency.code,
            prestationId: prestation.id,
            detailsValues: details.map(d => d.value),
            detailsIds: details.map(d => d.id.split('-')[1]),
        };

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

        if(!member || !action) {
            NotificationManager.error("Le formulaire n'est pas correctement renseigné");
            return;
        }

        switch (action.value) {
            case 'ACTIVATE_PROFILE':
                activateProfile();
                break;

            case 'AUTHENTICATE_PROFILE':
                console.log("authentifier");
                setShowUserFileBox(true);
                break;

            case 'PLACE_ORDER':
                addToCart(product);
                if(product.specialProduct == 'CODEV_DEAL_PLAN' || product.specialProduct == 'CODEV') {
                    setShowSubscriptionModal(true);
                } else {
                    setShowOrderModal(true);
                }
                break;

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

    const activateProfile = () => {
        console.log("activate");
        setShowActivationBox(true);
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
                                    .filter(a => (!member.active && a.value == 'ACTIVATE_PROFILE') || a.value !== 'ACTIVATE_PROFILE')
                                    .filter(a => (!member.authenticated && a.value == 'AUTHENTICATE_PROFILE') || a.value !== 'AUTHENTICATE_PROFILE')
                                    .filter(a => (member.active && a.value == 'BOOK_ORDER') || a)
                                    .filter(a => (member.active && a.value == 'PLACE_ORDER') || a)
                                    .filter(a => (member.active && a.value == 'PAY_ORDER') || a)
                                }
                                onChange={(__, item) => {
                                    setAction(item);
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </>
                )}
                { (action?.value == 'PLACE_ORDER' || action?.value == 'BOOK_ORDER') && (
                        <>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Produits MicroCap
                            </InputLabel>
                            <Autocomplete
                                value={productModel}
                                options={productModels}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setProductModel(item);
                                }}
                                getOptionLabel={(option) => `${option.label}`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                            <InputLabel className="text-left">
                                Prestataire
                            </InputLabel>
                            <Autocomplete
                                value={product}
                                options={products}
                                id="combo-box-demo"
                                onChange={(__, item) => {
                                    setProduct(item);
                                }}
                                getOptionLabel={(option) => `${option.seller} (${getPriceWithCurrency(option.price, option.currency)})`}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </FormGroup>
                    </>
                )}
                { action?.value == 'PAY_ORDER' && (
                    <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                        <InputLabel className="text-left">
                            Mes commandes
                        </InputLabel>
                        <Autocomplete
                            value={order}
                            options={orders}
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

                        { (prestation && prestation?.prestation?.direction == 'CASH_IN') && (
                            <div>
                                { prestation?.prestation?.type  == 'DEPOSIT_SCHEDULED' && (
                                    <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                        <InputLabel className="text-left">
                                            Bonds de versement
                                        </InputLabel>
                                        <DepositTickets 
                                            referralCode={membership}
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

                        { prestation && prestation.details.map(prestationDetails => (
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
                                    // onSubmit();
                                }}
                                className="text-white font-weight-bold mr-20"
                            >
                                Commencer l'assistance
                            </Button>
                        )
                    }
                </FormGroup>
            </Form>
            { member && action?.value == 'ACTIVATE_PROFILE' && (
                <ActivationBox
                    member={member}
                    show={showActivationBox}
                    pdfURL={'http://www.africau.edu/images/default/sample.pdf'}
                    onClose={() => {
                        setShowActivationBox(false);
                        setMember(null);
                        setAction(null);
                        setMembership(null);
                    }}
                />
            )}

            { member && showUserFileBox && (
                <UserDocumentsModal
                    user={member}
                    show={showUserFileBox}
                    reference={member.referralCode}
                    onClose={() => {
                        setShowUserFileBox(false);
                    }}
                    onValidate={() => {
                        setShowUserFileBox(false);
                        setShowMemberFileBox(true);
                    }}
                />
            )}
            { member && showMemberFileBox && (
                <MemberDocumentsModal
                    user={member}
                    show={showMemberFileBox}
                    reference={member.referralCode}
                    onClose={() => {
                        setShowMemberFileBox(false);
                    }}
                    onValidate={() => {
                        setShowMemberFileBox(false);
                        setShowAuthentificationBox(true);
                    }}
                />
            )}
            { member && showAuthentificationBox && (
                <AuthenticateUser
                    user={member}
                    show={showAuthentificationBox}
                    onClose={(reload = false) => {
                        setShowAuthentificationBox(false);
                        if(reload) {
                            window.location.reload();
                        };
                    }}
                />
            )}

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

            { showOrderModal && product && (
                <OrderFormModal
                    show={showOrderModal}
                    onClose={() => {
                        setShowOrderModal(false);
                        setProduct(null);
                    }}
                    codevData={codevData}
                    product={product}
                    onSuccess={(response) => {
                        getProducts();
                        setShowOrderModal(false);
                        setProduct(null);
                        props.onClearCart();
                    }}
                    customData={{referralCode: member.referralCode}}
                    isPreOrder={true}
                />
            )}

            { showSubscriptionModal && product && (
                <CodevSubscriptionModal
                    show={showSubscriptionModal}
                    onClose={() => {
                        setShowSubscriptionModal(false);
                        setProduct(null);
                        props.onClearCart();
                    }}
                    onSendData={(data) => {
                        setShowSubscriptionModal(false);
                        setCodevData(data);
                        setShowOrderModal(true);
                    }}
                    product={product}
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

export default connect(() => { }, { setRequestGlobalAction, onAddItemToCart, onClearCart })(withRouter(Assist));