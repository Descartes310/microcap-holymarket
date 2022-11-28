import { connect } from 'react-redux';
import { BANK } from 'Url/frontendUrl';
import React, { useState } from 'react';
import BankService from 'Services/banks';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import VerifyUserOTPModal from './components/verifyUserOTPModal';
import { Form, FormGroup, Input as InputStrap } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const Create = (props) => {

    const [user, setUser] = useState(null);
    const [details, setDetails] = useState([]);
    const [authCode, setAuthCode] = useState(null);
    const [operation, setOperation] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [serviceOrder, setServiceOrder] = useState(null);
    const [serviceOrderChecked, setServiceOrderChecked] = useState([]);

    const findOperation = () => {
        props.setRequestGlobalAction(true);
        BankService.findOperationByBankAuth({auth_code: authCode})
        .then(response => {
            setUser(response.user);
            setDetails(response.details);
            setOperation(response.operation);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Ce code est invalide");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const findServiceOrder = () => {
        props.setRequestGlobalAction(true);
        BankService.findServiceOrderByBankAuth(authCode)
        .then(response => {
            setServiceOrder(response);
            setServiceOrderChecked(response.items.map(i => { return { id: i.id, checked: false }}))
        })
        .catch((err) => {
            NotificationManager.error("Aucun ordre de service trouvé");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const onSubmit = (otp) => {
        if(!otp) {
            NotificationManager.error("Formulaire mal renseigné");
            return;
        }
        props.setRequestGlobalAction(true);
        BankService.confirmOperation(operation.reference, {otp: otp, so_item_ids: serviceOrderChecked.map(so => so.id), so_checked: serviceOrderChecked.map(so => so.checked)}).then(() => {
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

                    {operation && (
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
                                        value={operation.amount}
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
                            { serviceOrder && (
                                <div className='row'>
                                    <h2 style={{ marginBottom: 30 }}>Ordre de service</h2>
                                    {
                                        serviceOrder.items.map((item, index) => (
                                            <FormGroup className="col-sm-12 has-wrapper">
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        color="primary"
                                                        checked={serviceOrderChecked.find(so => so.id === item.id)?.checked}
                                                        onChange={(e) => onChecked(index, e.target.checked)}
                                                    />
                                                } label={item.serviceOrderItem.label}
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
                                findServiceOrder();
                            }}
                            className="text-white font-weight-bold mr-20 bg-blue"
                        >
                            Chercher l'opération
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!operation}
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
            </RctCollapsibleCard>
        </>
    );
};

export default connect(() => { }, { setRequestGlobalAction })(withRouter(Create));