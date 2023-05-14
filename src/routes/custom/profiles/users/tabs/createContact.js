import { connect } from 'react-redux';
import React, { useState } from 'react';
import UserService from 'Services/users';
import Input from "@material-ui/core/Input";
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import MenuItem from "@material-ui/core/MenuItem";
import { contactTypes } from '../../../../../data';
import { RctCardContent } from 'Components/RctCard';
import Select from "@material-ui/core/Select/Select";
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const CreateContact = (props) => {

    const {show, onClose} = props;
    const [type, setType] = useState(null);
    const [value, setValue] = useState(null);

    const onSubmit = () => {

        props.setRequestGlobalAction(true);

        let data = {
            value, type
        };

        UserService.createContact(data).then(() => {
            NotificationManager.success('Le contact a été enregistré');
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
        })
        .finally(() => {
            setType(null);
            setValue(null);
            props.setRequestGlobalAction(false);
            onClose(true);
        });
    }
    
    return (
        <DialogComponent
            show={show}
            onClose={onClose}
            size="md"
            title={(
                <h3 className="fw-bold">
                    Créer un nouveau contact
                </h3>
            )}
        >
            <RctCardContent>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left pl-2" htmlFor="type-helper">
                        Type de contact
                    </InputLabel>
                    <Select
                        value={type}
                        style={{ width: '100%' }}
                        onChange={(e) => setType(e.target.value)}
                        input={<Input name="type" id="type-helper" style={{ width: '100%' }} />}
                    >
                        {contactTypes.map(item => (
                            <MenuItem key={item.value} value={item.value} style={{ width: '100%' }}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="value">
                        Valeur
                    </InputLabel>
                    <InputStrap
                        required
                        id="value"
                        type="text"
                        name='value'
                        value={value}
                        className="input-lg"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    disabled={!value || !type}
                    className="ml-0 text-white float-right"
                    onClick={() => onSubmit()}
                >
                    Enregistrer
                </Button>
            </RctCardContent>
        </DialogComponent>
    )
}

export default connect(() => {}, { setRequestGlobalAction })(withRouter(CreateContact));