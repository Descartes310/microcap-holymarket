import { connect } from 'react-redux';
import React, { useState } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { RctCardContent } from 'Components/RctCard';
import { FormGroup, Input, Button } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const CreateAlias = (props) => {

    const {show, onClose} = props;

    const [name, setName] = useState(null);

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data = {
            value: name, type: 'ALIAS'
        };

        UserService.createContact(data).then(() => {
            NotificationManager.success('Le contact a été enregistré');
            setName(null);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.success("Une erreur s'est produite");
        })
        .finally(() => {
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
                    Créer un nouvel Alias
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="name">
                        Nom
                    </InputLabel>
                    <Input
                        required
                        id="name"
                        type="text"
                        name='name'
                        value={name}
                        className="input-lg"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    disabled={!name}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateAlias));