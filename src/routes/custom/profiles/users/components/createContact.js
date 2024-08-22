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
            onClose(true);
        })
        .catch((err) => {
            console.log(err);
            NotificationManager.error("Une erreur s'est produite");
            onClose(false);
        })
        .finally(() => {
            setType(null);
            setValue(null);
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
                { props.setAsNotificatioAddress && <p>Le service MicroCap est 100% Digital, toutes vos notifications laissant des traces vous seront transmises à cette adresse. L'utilisation du code de vérification de chaque communication vaut signature et accusé de reception.</p>}
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
                { type && (
                    <FormGroup className="has-wrapper">
                        <InputLabel className="text-left" htmlFor="value">
                            {
                                type?.value === 'EMAIL' ? "Veuillez saisir votre adresse e-mail" : 
                                type?.value === 'ADDRESS' ? "Veuillez saisir votre adresse" :
                                "Veuillez saisir votre numéro de télephone" 
                            }
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
                )}
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