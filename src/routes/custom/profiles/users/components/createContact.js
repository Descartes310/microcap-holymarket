import { connect } from 'react-redux';
import React, { useState } from 'react';
import UserService from 'Services/users';
import { withRouter } from "react-router-dom";
import { setRequestGlobalAction } from 'Actions';
import { contactTypes } from '../../../../../data';
import TextField from '@material-ui/core/TextField';
import { RctCardContent } from 'Components/RctCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import DialogComponent from "Components/dialog/DialogComponent";
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import { FormGroup, Input as InputStrap, Button } from 'reactstrap';

const CreateContact = (props) => {

    const {show, onClose} = props;
    const [type, setType] = useState(null);
    const [value, setValue] = useState(null);

    const onSubmit = () => {

        if(!value || !type) {
            return;
        }

        if(type.value == 'PHONE') {
            if(!(value+"").startsWith("+")) {
                NotificationManager.error('Le téléphone est invalide');
                return;
            }
        }

        props.setRequestGlobalAction(true);

        let data = {
            value, type: type.value
        };

        if(props.setAsNotificatioAddress) {
            data.notification_address = true
        }

        if(props.member) {
            data.referral_code = props.member.referralCode;
        }

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
                <div className="col-md-12 col-sm-12 has-wrapper mb-30 p-0">
                    <InputLabel className="text-left">
                        Type de contact
                    </InputLabel>
                    <Autocomplete
                        value={type}
                        options={contactTypes}
                        id="combo-box-demo"
                        classes={{ paper: 'custom-input' }}
                        getOptionLabel={(option) => option.name}
                        onChange={(__, item) => { setType(item) }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <FormGroup className="has-wrapper">
                    <InputLabel className="text-left" htmlFor="value">
                        Valeur {type?.value == 'PHONE' && "(Veuillez préfixer le numéro par le code téléphonique. Exp: +237)" }
                    </InputLabel>
                    { (type?.value == 'PHONE' && value != null && (value+"").length > 0  && !(value+"").startsWith("+")) && (
                        <InputLabel className="text-left" style={{ color: 'red' }}>
                            Le préfixe du numéro de téléphone est obligatoire
                        </InputLabel>
                    )}
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