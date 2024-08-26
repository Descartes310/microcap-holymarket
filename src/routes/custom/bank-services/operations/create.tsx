import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import React, { useEffect, useState } from 'react';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import VerifyUserOTPModal from './components/verifyUserOTPModal';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import AccountVentilation from 'Components/Product/Ventilation/AccountVentilation';
import PaymentRequestSupport from 'Routes/custom/marketplace/_components/paymentRequestSupport';

const Create = (props) => {

    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [order, setOrder] = useState(null);
    const [details, setDetails] = useState([]);
    const [authCode, setAuthCode] = useState(null);
    const [operation, setOperation] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [prestation, setPrestation] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [ventilations, setVentilations] = useState([]);
    const [serviceOrder, setServiceOrder] = useState(null);
    const [serviceOrderChecked, setServiceOrderChecked] = useState([]);
    const [showPaymentRequest, setShowPaymentRequest] = useState(false);

    useEffect(() => {
        getPrestations();
    }, []);

    const findOperation = () => {
        props.setRequestGlobalAction(true);
        BankService.findOperationByBankAuth({auth_code: authCode, prestation_id: prestation?.id})
        .then(response => {
            console.log("Je suis la reponse => ", response)
            setUser(response.user);
            setOperation(response.operation);
            setServiceOrder(response);
            if(response.operation.type == "SELLER_PAYMENT") {
                setOrder(response.order);
                setShowPaymentRequest(true);
            } else {
                setDetails(response.details);
                setVentilations(response.ventilations.map(i => { return { percentage: i.value, label: i.label }}));
                setServiceOrderChecked(response.coverages.map(i => { return { id: i.value, label: i.label, checked: false }}));
            }
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce code est invalide");
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

    const onSubmit = (otp) => {
        if(!otp) {
            NotificationManager.error("Formulaire mal renseigné");
            return;
        }
        props.setRequestGlobalAction(true);
        BankService.confirmOperation(operation.reference, operation.type == "SELLER_PAYMENT" ? {...data, otp}: {otp: otp, so_item_ids: serviceOrderChecked.map(so => so.id), so_checked: serviceOrderChecked.map(so => so.checked)}).then(() => {
            NotificationManager.success("L'opération a été validée avec sucès");
            setShowModal(false);
            props.history.push(BANK.OPERATION.ASSISTANCE);
        }).catch(err => {
            console.log(err);
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const sendOTPCode = () => {
        if(!operation || !user) {
            NotificationManager.error("Formulaire mal renseigné");
            return;
        }
        props.setRequestGlobalAction(true);
        BankService.setConfirmOperationOtp(operation.reference, {referral_code: user.referralCode}).then(() => {
            setShowModal(true);
        }).catch(err => {
            NotificationManager.error("Une erreur est survenue");
        }).finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onChecked = (index, checked) => {
        let item = serviceOrderChecked[index];
        item.checked = checked;
        let items = serviceOrderChecked;
        items[index] = item;
        setServiceOrderChecked([...items]);
    }

    return (
        <>
            <PageTitleBar
                title={"Créer une opération"}
            />
            <RctCollapsibleCard>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="authCode">
                            Code autorisation de la banque
                        </InputLabel>
                        <InputStrap
                            required
                            type="text"
                            id="authCode"
                            name='authCode'
                            value={authCode}
                            className="input-lg"
                            onChange={(e) => setAuthCode(e.target.value)}
                        />
                    </FormGroup>
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

                    {operation && operation.type != "SELLER_PAYMENT" && (
                        <>
                            <div className="row">
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left">
                                        Nom complet
                                    </InputLabel>
                                    <InputStrap
                                        disabled
                                        className="input-lg"
                                        value={user.userName}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left">
                                        Adresse e-mail
                                    </InputLabel>
                                    <InputStrap
                                        disabled
                                        className="input-lg"
                                        value={user.email}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left">
                                        Montant
                                    </InputLabel>
                                    <InputStrap
                                        disabled
                                        className="input-lg"
                                        value={operation.amount+" "+operation.currency}
                                    />
                                </FormGroup>
                                <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                    <InputLabel className="text-left">
                                        Prestation
                                    </InputLabel>
                                    <InputStrap
                                        disabled
                                        className="input-lg"
                                        value={operation.prestationName}
                                    />
                                </FormGroup>
                                {
                                    details.map(d => (
                                        <FormGroup className="col-md-6 col-sm-12 has-wrapper">
                                            <InputLabel className="text-left">
                                                {d.label}
                                            </InputLabel>
                                            <InputStrap
                                                disabled
                                                value={d.value}
                                                className="input-lg"
                                            />
                                        </FormGroup>
                                    ))
                                }
                            </div>
                            { ventilations?.length > 0 && (
                                <div className="col-md-12 col-sm-12 has-wrapper mb-30">
                                    <InputLabel className="text-left">
                                        Ventilations de l'opération
                                    </InputLabel>
                                    <AccountVentilation 
                                        editable={false}
                                        accounts={ventilations}
                                    />
                                </div>
                            )}
                            { serviceOrder && (
                                <div className='row'>
                                    <h2 style={{ marginBottom: 30 }}>Ordre de service</h2>
                                    {
                                        serviceOrder.coverages.map((item, index) => (
                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        color="primary"
                                                        checked={serviceOrderChecked.find(so => so.id === item.id)?.checked}
                                                        onChange={(e) => onChecked(index, e.target.checked)}
                                                    />
                                                } label={item.label}
                                                />
                                            </FormGroup>
                                        ))
                                    }
                                </div>
                            )}
                        </>
                    )}

                    <>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!authCode}
                            onClick={() => {
                                findOperation();
                            }}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Chercher l'opération
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!operation || operation?.type == "SELLER_PAYMENT"}
                            onClick={() => sendOTPCode()}
                            className="text-white font-weight-bold"
                        >
                            Enregister l'opération
                        </Button>
                    </>
                </Form>
                <VerifyUserOTPModal 
                    show={showModal}
                    type="CONFIRM_OPERATION"
                    title={'Entrer le code OTP'}
                    onClose={() => setShowModal(false)}
                    callback={(otp) => onSubmit(otp)}
                />
                { showPaymentRequest && order && (
                    <PaymentRequestSupport
                        order={order}
                        show={showPaymentRequest}
                        onValidate={(data) => {
                            setData(data);
                            setShowPaymentRequest(false);
                            sendOTPCode();
                        }}
                        onClose={() => setShowPaymentRequest(false)}
                    />
                )}
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));