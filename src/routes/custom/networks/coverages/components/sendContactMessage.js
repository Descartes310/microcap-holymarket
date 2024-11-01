import { connect } from 'react-redux';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import SettingService from 'Services/settings';
import MessageService from 'Services/messages';
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const SendContactMessage = (props) => {

    const {show, onClose} = props;
    const [title, setTitle] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(null);
    const [message, setMessage] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState(null);

    useEffect(() => {
        getContacts();
        getMessages();
    }, []);

    useEffect(() => {
        if(template) {
            setTitle(template.title);
            setMessage(template.content);
        }
    }, [template]);

    const getMessages = () => {
        props.setRequestGlobalAction(true);
        SettingService.getMessageTemplates()
        .then((response) => setTemplates(response))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.setRequestGlobalAction(false);
        })
    }

    const getContacts = () => {
        UserService.getContacts({referral_code: props.user?.referralId}).then((response) => {
            setContacts(response.filter(c => c.type !== 'ADDRESS' && c.type !== 'ALIAS' ))
        });
    }

    const onSubmit = () => {

        let data = {
            contactId: contact.id,
            subject: title,
            content: message
        };
        
        props.setRequestGlobalAction(true);

        MessageService.sendMessage(data).then(() => {
            NotificationManager.success('Le message a été envoyé');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            setContact(null);
            setMessage(null);
            setTitle(null);
            props.setRequestGlobalAction(false);
            onClose();
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Contacter {props.user?.userName}
                </h3>
            )}
        >
            <RctCardContent>
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Contacts disponibles
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={contact}
                        options={contacts}
                        onChange={(__, item) => {
                            setContact(item);
                        }}
                        getOptionLabel={(option) => option.oldType+": "+option.value}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <div className="has-wrapper col-md-12 col-sm-12 mb-30 ">
                    <InputLabel className="text-left">
                        Modèle de message
                    </InputLabel>
                    <Autocomplete
                        id="combo-box-demo"
                        value={template}
                        options={templates}
                        onChange={(__, item) => {
                            setTemplate(item);
                        }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="subject">
                        Sujet
                    </InputLabel>
                    <InputStrap
                        required
                        id="subject"
                        type="text"
                        name='subject'
                        value={title}
                        className="input-lg"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="message">
                        Message
                    </InputLabel>
                    <InputStrap
                        required
                        id="value"
                        type="textarea"
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
                    Envoyer le message
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(SendContactMessage));