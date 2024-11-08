import { useEffect } from 'react';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import OrderService from 'Services/orders';
import { withRouter } from "react-router-dom";
import PaymentRequest from "./paymentRequest";
// import Button from '@material-ui/core/Button';
import UserSelect from 'Components/UserSelect';
import { setRequestGlobalAction } from 'Actions';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import { getPriceWithCurrency } from 'Helpers/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { FormGroup, Button, Input as InputStrap, InputGroup, InputGroupAddon  } from 'reactstrap';

const AgentPaymentRequestModal = (props) => {

    const {show, onClose, defaultType, disabled} = props;

    const [order, setOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [member, setMember] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [orderReference, setOrderReference] = useState(null);
    const [hasOrderReference, setHasOrderReference] = useState(true);

    useEffect(() => {
        if(paymentData) {
            sendPaymentRequest(paymentData)
        }
     }, [paymentData])

    useEffect(() => {
        if(member) {
            getOrders()
        }
     }, [member])

    const findOrder = () => {
        props.setRequestGlobalAction(true);
        OrderService.findOrderByReference(orderReference).then((response) => {
           setOrder(response);
        }).catch(() => {
           NotificationManager.error("La commande n'a pas été trouvée");
        }).finally(() => {
           props.setRequestGlobalAction(false);
        });
    }

    const getOrders = () => {
        props.setRequestGlobalAction(true);
        OrderService.getOrders({referral_code: member.referralCode})
            .then(response => setOrders(response.filter(o => ['PENDING', 'CONFIRMED', 'PAYING'].includes(o.status))))
            .finally(() => props.setRequestGlobalAction(false))
    }

    const sendPaymentRequest = () => {
        props.setRequestGlobalAction(true)
        OrderService.initiatePayment(order.reference, {})
         .then(() => {
            NotificationManager.success("La demande de paiement a été envoyée");
            onClose();
         })
         .catch((err) => {
            NotificationManager.error("Une erreur est survenue");
         })
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Demande d'encaissement
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={hasOrderReference}
                            onChange={() => setHasOrderReference(!hasOrderReference)}
                        />
                    } label={'J\'ai la reference de la commande'}
                    />
                </FormGroup>
                { hasOrderReference ? (
                    <div className="d-flex">
                        <FormGroup className="col-sm-12 has-wrapper">
                            <InputLabel className="text-left" htmlFor="reference">
                                Réference de la commande
                            </InputLabel>
                            <InputGroup>
                                <InputStrap
                                    type="text"
                                    id="reference"
                                    value={orderReference}
                                    name={'reference'}
                                    className="has-input input-lg custom-input"
                                    onChange={(e) => setOrderReference(e.target.value)}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary" variant="contained" onClick={() => {
                                        findOrder();
                                    }} >
                                        <span className='text-white'>Rechercher</span>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </div>
                ) : 
                    <div>
                        <UserSelect label={'Numéro utilisateur'} onChange={(_, member) => {
                            setMember(member)
                        }}/>
                        { member && (
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
                    </div>
                }
                <div className="row mt-20">
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={!order}
                        onClick={() => sendPaymentRequest()}
                        className="col-md-12 col-sm-12 text-white font-weight-bold mb-20"
                    >
                        Demande de paiement
                    </Button>
                </div>
                {/* { order && (
                    <PaymentRequest
                        defaultReference={order.reference}
                        defaultType={defaultType}
                        hideReference={true}
                        onError={() => {
                            onClose();
                        }}
                        disabled={disabled}
                        onSendData={(data) => {
                            setPaymentData(data);
                        }}
                    />
                )} */}
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AgentPaymentRequestModal));