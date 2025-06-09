import { connect } from 'react-redux';
import React, { useState } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import MainUserSelect from 'Components/MainUserSelect';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Button, Input as InputStrap  } from 'reactstrap';

const ResiliationModal = (props) => {

    const {show, onClose} = props;
    const [user, setUser] = useState(null);
    const [reason, setReason] = useState(null);

    const onSubmit = () => {

        if(!user || !reason) {
            return;
        }

        props.setRequestGlobalAction(true);

        UserService.resiliateUser(user.reference, {reason}).then(() => {
            NotificationManager.success('L\' utilisateur a été résilié avec succès');
            setUser(null);
            setReason(null);
            onClose(true);
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
            onClose={() => onClose(false)}
            size="md"
            title={(
                <h3 className="fw-bold">
                    {props.title ? props.title : 'Résilier un utilisateur'}
                </h3>
            )}
        >
            <RctCardContent>
                <MainUserSelect onChange={(_, user) => {
                    setUser(user);
                }}/>
                <FormGroup className="col-md-12 col-sm-12 has-wrapper">
                    <InputLabel className="text-left" htmlFor="reason">
                        Raison de résiliation
                    </InputLabel>
                    <InputStrap
                        required
                        id="reason"
                        name='reason'
                        type="text"
                        value={reason}
                        className="input-lg"
                        onChange={(e) => setReason(e.target.value)}
                    />
                </FormGroup>
                
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

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ResiliationModal));