import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import MessageService from 'Services/messages';
import UserSelect from 'Components/UserSelect';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";

const AddBroadcastMember = (props) => {

    const {show, onClose} = props;
    const [user, setUser] = useState(null);

    const onSubmit = () => {

        if(!user) {
            return;
        }

        let data = {
            referral_code: user.referralCode
        };
        
        props.setRequestGlobalAction(true);
        MessageService.addBroadcastMember(props.match.params.id, data).then(() => {
            NotificationManager.success('Le membre a été enregistré');
            onClose(true);
        })
        .catch((err) => {
            NotificationManager.error("Une erreur s'est produite");
            onClose(false);
        })
        .finally(() => {
            setUser(null);
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
                    {props.title ? props.title : 'Créer un nouveau contact'}
                </h3>
            )}
        >
            <RctCardContent>
                <UserSelect label={'Numéro utilisateur'} onChange={(_, user) => {
                    setUser(user);
                }}/>
                <Button
                    color="primary"
                    disabled={!user}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AddBroadcastMember));