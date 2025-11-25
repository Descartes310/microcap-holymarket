import { connect } from 'react-redux';
import React, { useState } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { FormGroup, Button } from 'reactstrap';
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DialogComponent from "Components/dialog/DialogComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const AuthenticateUser = (props) => {

    const {show, onClose} = props;
    const [pieceReceived, setPieceReceived] = useState(false);
    const [signatureReceived, setSignatureReceived] = useState(false);

    const onSubmit = () => {
        if(props.onSubmit) {
            props.onSubmit({type: 'AUTHENTICATE_PROFILE', referral_code: props.user?.referralId || props.user?.referralCode});
        } else {
            props.setRequestGlobalAction(true);
            UserService.authenticate(props.user?.referralId || props.user?.referralCode).then(() => {
                NotificationManager.success('Authentification réussie');
                props.onClose(true);
            }).catch((err) => {
                NotificationManager.error('Veuillez réessayer plus tard');
                props.onClose(false);
            }).finally(() => {
                setPieceReceived(false);
                setSignatureReceived(false);
                props.setRequestGlobalAction(false);
            });
        }
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Authentifier {props.user?.userName}
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={pieceReceived}
                            onChange={() => setPieceReceived(!pieceReceived)}
                        />
                    } label={'Toutes les pièces ont été reçues'}
                    />
                </FormGroup>
                <FormGroup className="col-sm-12 has-wrapper">
                    <FormControlLabel control={
                        <Checkbox
                            color="primary"
                            checked={signatureReceived}
                            onChange={() => setSignatureReceived(!signatureReceived)}
                        />
                    } label={'La signature a été déposée'}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    disabled={!pieceReceived || !signatureReceived}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Authentifier
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(AuthenticateUser));