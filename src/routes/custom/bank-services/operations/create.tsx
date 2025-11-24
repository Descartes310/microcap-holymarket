import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import Tab from '@material-ui/core/Tab';
import BankService from 'Services/banks';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useEffect, useState } from 'react';
import SwipeableViews from "react-swipeable-views";
import TabContainer from "Components/TabContainer";
import SweetAlert from 'react-bootstrap-sweetalert';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import RegularisationAssist from './regularisationAssistance';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import VerifyUserOTPModal from 'Components/verifyUserOTPModal';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import AccountVentilation from 'Components/Product/Ventilation/AccountVentilation';
import PaymentRequestSupport from 'Routes/custom/marketplace/_components/paymentRequestSupport';
import UserService from 'Services/users';

const Create = (props) => {

    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [banks, setBanks] = useState([]);
    const [bank, setBank] = useState(null);
    const [order, setOrder] = useState(null);
    const [details, setDetails] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [authCode, setAuthCode] = useState(null);
    const [operation, setOperation] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [prestation, setPrestation] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [ventilations, setVentilations] = useState([]);
    const [serviceOrder, setServiceOrder] = useState(null);
    const [serviceOrderChecked, setServiceOrderChecked] = useState([]);
    const [showPaymentRequest, setShowPaymentRequest] = useState(false);

    useEffect(() => {
        getBanks();
    }, []);

    useEffect(() => {
        if(bank) {
            getPrestations();
        }
    }, [bank]);

    const findOperation = () => {
        props.setRequestGlobalAction(true);
        BankService.findOperationByBankAuth({auth_code: authCode, prestation_id: prestation?.prestation ? prestation?.prestation.id : 0})
        .then(response => {
            setUser(response.user);
            setOperation(response.operation);
            setServiceOrder(response);
            if(response.operation.type == "SELLER_PAYMENT") {
                setOrder(response.order);
                setShowPaymentRequest(true);
            } else {
                if(response.details)
                    setDetails(response.details);
                if(response.ventilations)
                    setVentilations(response.ventilations.map(i => { return { percentage: i.value, label: i.label }}));
                if(response.coverages)
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
        BankService.getPrestations({bank_reference: bank.reference})
        .then(response => setPrestations(response))
        .finally(() => props.setRequestGlobalAction(false))
    }

    const getBanks = () => {
        props.setRequestGlobalAction(true),
        BankService.getIntermediateBanks()
        .then(response => setBanks(response))
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
            setShowAlert(true);
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
        let data: any = {targetReference: operation.referralCode, type: 'CONFIRM_OPERATION'}
        UserService.sendAuthOTP(data, {wantSuccessCode: true})
        .then(() => {
            setShowModal(true);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("L'envoi du code de vérification a échoué");
        })
        .finally(() => {
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

    const handleChange = (__, value) => {
        setActiveTab(value)
    };

    return (
        <>
            <PageTitleBar
                title={"Créer une opération"}
            />
            <RctCollapsibleCard>
                <AppBar position="static" color="default">
                    <div className="d-flex align-items-center">
                        <Tabs
                            value={activeTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            variant="scrollable"
                            textColor="primary"
                        >
                            <Tab label="Opération" />
                            <Tab label="Régularisation" />
                        </Tabs>
                    </div>
                </AppBar>
                <SwipeableViews
                    index={activeTab}
                >
                    <div className="card mb-0 transaction-box">
                        <TabContainer>
                            <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
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
                                            Mandats
                                        </InputLabel>
                                        <Autocomplete
                                            value={bank}
                                            id="combo-box-demo"
                                            options={banks}
                                            onChange={(__, item) => {
                                                setBank(item);
                                            }}
                                            getOptionLabel={(option) => option.label}
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
                                                        value={operation.prestationName ?? 'Autres prestations'}
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
                                            {/* { serviceOrder && serviceOrder.coverages && (
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
                                            )} */}
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
                            </div>
                        </TabContainer>
                    </div>
                    <div className="card mb-0 transaction-box">
                        <TabContainer>
                            <div className="p-sm-20 pt-sm-30 p-10 pt-15 border-top">
                                <RegularisationAssist />
                            </div>
                        </TabContainer>
                    </div>
                </SwipeableViews>
                { showModal &&(
                    <VerifyUserOTPModal 
                        show={showModal}
                        type={'CONFIRM_OPERATION'}
                        targetReference={operation.reference}
                        title={'Entrer le code de validation'}
                        callback={(otp) => {
                            onSubmit(otp);
                        }}
                        onClose={() => setShowModal(false)}
                    />
                )}
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
                <SweetAlert
                    success
                    btnSize="sm"
                    show={showAlert}
                    title={"L'opération a été éffectuée avec succès"}
                    onConfirm={() => {
                        window.location.reload();
                    }}
                />
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));