import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import UserService from 'Services/users';
import MessageService from 'Services/messages';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import React, { useState, useEffect } from 'react';
import { RctCardContent } from 'Components/RctCard';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const ConfirmBroadcastMember = (props) => {

    const {show, onClose} = props;
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(null);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        UserService.getContacts().then((response) => {
            setContacts(response.filter(c => c.oldType === 'EMAIL' || c.oldType === 'PHONE' || c.oldType === 'WHATSAPP'))
        });
    }

    const onSubmit = () => {

        if(!contact) {
            return;
        }

        props.setRequestGlobalAction(true);
        MessageService.confirmBroadcastMember(props.member.id, {status: true, contact_id: contact.id})
        .then(() => {
            onClose();
        })
        .catch(() => {
            NotificationManager.error("Une erreur s'est produite, veuillez réessayer plus tard");
        })
        .finally(() => props.setRequestGlobalAction(false))
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={() => onClose(false)}
            size="md"
            title={(
                <h3 className="fw-bold">
                    {props.title ? props.title : 'Accepter l\'ajout'}
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
                        getOptionLabel={(option) => `${option.oldType}: ${option.value}`}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <Button
                    color="primary"
                    disabled={!contact}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ConfirmBroadcastMember));