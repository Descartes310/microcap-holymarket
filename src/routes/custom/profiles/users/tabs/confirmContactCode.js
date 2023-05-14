import { connect } from 'react-redux';
import React, { useState } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const ConfirmContactCode = (props) => {

    const {show, onClose} = props;
    const [code, setCode] = useState(null);

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data = {
            code
        };

        UserService.confirmContactCode(data).then(() => {
            NotificationManager.success('Le contact a été confirmé');
            setCode(null);
            onClose(true);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Le code n'est pas correct");
        })
        .finally(() => {
            setCode(null);
            props.setRequestGlobalAction(false);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Confirmation du contact
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="code">
                        Code de confirmation
                    </InputLabel>
                    <InputStrap
                        required
                        id="code"
                        type="text"
                        name='code'
                        value={code}
                        className="input-lg"
                        onChange={(e) => setCode(e.target.value)}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    disabled={!code}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Confirmer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(ConfirmContactCode));