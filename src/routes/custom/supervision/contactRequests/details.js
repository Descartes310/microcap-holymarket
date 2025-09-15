import { connect } from 'react-redux';
import SystemService from 'Services/systems';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TimeFromMoment from "Components/TimeFromMoment";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const MessageList = (props) => {

    const {show, onClose, request} = props;
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = () => {
        props.setRequestGlobalAction(true);
        SystemService.getMessages(request.reference)
            .then(response => {
                setMessages(response);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                props.setRequestGlobalAction(false);
            })
    }

    const onSubmit = () => {

        if(!message || message.trim().length <= 0) {
            return;
        }

        let data = {
            message
        };

        props.setRequestGlobalAction(true);

        SystemService.sendMessage(props.request.reference, data).then(() => {
            NotificationManager.success('Le message a été envoyé');
            getMessages();
            setMessage('');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            className='mb-10'
            title={(
                <h3 className="fw-bold">
                    Détails de la requête
                </h3>
            )}
        >
            <RctCardContent>
                <div>
                    <p>
                        <span className='fw-bold mr-20'>Traitant: </span>
                        <span>{request.agentReferralCode ? (request.agentName ? request.agentName + " ("+request.agentReferralCode+")" :  request.agentReferralCode) : ''}</span>
                    </p>
                    <p>
                        <span className='fw-bold mr-20'>Date de traitement: </span>
                        <span>{request.treatedAt && <TimeFromMoment time={request.treatedAt} showFullDate format='LLL' />}</span>
                    </p>
                    <p>
                        <span className='fw-bold mr-20'>Commentaire: </span>
                        <span>{request.comment}</span>
                    </p>
                </div>
                <div className="d-flex flex-column p-3 bg-light mb-30" style={{ height: "100%", overflowY: "auto" }}>
                    {messages.map((msg, index) => {
                        const isSent = msg.senderReferralCode != null;
                        const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const date = new Date(msg.createdAt).toLocaleDateString();
                        return (
                            <div
                                key={index}
                                className={`d-flex flex-column mb-2 ${isSent ? "align-items-end" : "align-items-start"}`}
                            >
                                <span
                                    className={`p-2 rounded shadow-sm ${isSent ? "bg-primary text-white" : "bg-white border"}`}
                                    style={{ maxWidth: "70%" }}
                                >
                                    {msg.content}
                                </span>
                                <small className="text-muted mt-1" style={{ fontSize: "0.75rem" }}>
                                    {date}, {time}
                                </small>
                            </div>
                        );
                    })}
                </div>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="message">
                        Message
                    </InputLabel>
                    <InputStrap
                        required
                        type="text"
                        id="message"
                        name='message'
                        value={message}
                        className="input-lg"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </FormGroup>

                <Button
                    color="primary"
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Envoyer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(MessageList));