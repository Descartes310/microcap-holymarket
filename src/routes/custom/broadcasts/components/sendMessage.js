import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import MessageService from 'Services/messages';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import {FormGroup, Input as InputStrap} from 'reactstrap';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const SendBroadcastMessage = (props) => {

    const {show, onClose, broadcast} = props;
    const [description, setDescription] = useState(null);

    const onSubmit = () => {

        if(!description || !broadcast) {
            return;
        }

        let data = {
            content: description
        };
        
        props.setRequestGlobalAction(true);
        MessageService.sendBroadcastMessage(broadcast.reference, data).then(() => {
            NotificationManager.success('Le message a été envoyé');
            onClose(true);
        })
        .catch((err) => {
            NotificationManager.error("Une erreur s'est produite");
            onClose(false);
        })
        .finally(() => {
            setDescription(null);
            props.setRequestGlobalAction(false);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={() => onClose(false)}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Envoyer une diffusion
                </h3>
            )}
        >
            <RctCardContent>
                <p>Notes importantes: utilisez les variables ci-dessous pour personnaliser le message</p>
                <ul className='ml-20'>
                    <li><b>$name$</b>: nom de l'utilisateur</li>
                    <li><b>$contact$</b>: adresse de contact</li>
                    <li><b>$number$</b>: numéro de l'utilisateur</li>
                    <li><b>$email$</b>: email de l'utilisateur</li>
                </ul>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="content">
                        Contenu
                    </InputLabel>
                    <InputStrap
                        required
                        id="content"
                        type="textarea"
                        name='content'
                        className="input-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    disabled={!description || !broadcast}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(SendBroadcastMessage));